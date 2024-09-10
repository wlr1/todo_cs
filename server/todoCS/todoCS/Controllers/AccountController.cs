using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using todoCS.Dtos;
using todoCS.Entities;
using todoCS.Services;

namespace todoCS.Controllers;

[Route("[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private readonly UserManager<UserEntity> _userManager;
    private readonly SignInManager<UserEntity> _signInManager;
    private readonly JwtService _jwtService;

    public AccountController(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager,
        JwtService jwtService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        
    }
    
    //register new user
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = new UserEntity
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }

            return BadRequest(ModelState);
        }

        return Ok("User registered successfully!");
    }
    
    //login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null)
        {
            return Unauthorized("Invalid Email or Password!");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded)
        {
            return Unauthorized("Invalid Email or Password!");
        }

        var token = _jwtService.GenerateToken(user);
        return Ok(new { Token = token });
    }

    //delete user
    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> DeleteUser()
    {
        var user = await _userManager.GetUserAsync(User);

        if (user == null)
        {
            return NotFound("User not Found!");
        }

        var result = await _userManager.DeleteAsync(user);
        if (!result.Succeeded)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError(string.Empty, error.Description);
            }
            return BadRequest(ModelState);
        }
        return Ok("Your account has been deleted successfully.");
    }

    //upload avatar
    [Authorize]
    [HttpPost("upload-avatar")]
    [Consumes("multipart/form-data")] 
    public async Task<IActionResult> UploadAvatar([FromForm] IFormFile avatarFile)
    {
        
        if (avatarFile == null || avatarFile.Length == 0)
        {
            return BadRequest("No file uploaded.");
        }
        
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound("User not Found!");
        }

        using (var memoryStream = new MemoryStream())
        {
            await avatarFile.CopyToAsync(memoryStream);
            user.UserAvatar = memoryStream.ToArray();
        }

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest("Could not upload avatar!");
        }

        return Ok("Avatar uploaded successfully!");
    }
    
    //get avatar
    [Authorize]
    [HttpGet("download-avatar")]
    public async Task<IActionResult> DownloadAvatar()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null || user.UserAvatar == null)
        {
            return NotFound("User or Avatar not found!");
        }

        return File(user.UserAvatar, "image/jpeg");
    }
}