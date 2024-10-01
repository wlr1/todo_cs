using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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

    [HttpGet("validate-token")]
    public IActionResult ValidateToken()
    {
        var jwt = Request.Cookies["jwt"];
        if (string.IsNullOrEmpty(jwt))
        {
            return Unauthorized(new { message = "No JWT token found" });
        }

        var validateToken = _jwtService.ValidateToken(jwt);

        if (!validateToken)
        {
            return Unauthorized(new { message = "Invalid or expired token" });
        }

        return Ok(new { message = "Token is valid" });
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
        
        Response.Cookies.Append("jwt", token, new CookieOptions
        {
            HttpOnly = true,
            SameSite = SameSiteMode.Strict,
            Secure = true,
            Expires = DateTime.UtcNow.AddMinutes(60)
        });
        
        return Ok(new { Token = token });
    }
    
    //logout
    [Authorize]
    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        Response.Cookies.Delete("jwt");
        return Ok("You have been logged out successfully");
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
        
        Response.Cookies.Delete("jwt");
        
        return Ok("Your account has been deleted successfully.");
    }

    //get user info
    [HttpGet("user-info")]
    public async Task<IActionResult> GetUserInfo()
    {
        var jwt = Request.Cookies["jwt"];
        if (string.IsNullOrEmpty(jwt))
        {
            return Unauthorized(new { message = "No JWT token found" });
        }

        if (!_jwtService.ValidateToken(jwt))
        {
            return Unauthorized(new { message = "Invalid or expired token" });
        }
        
        //user id from jwt
        var jwtHandler = new JwtSecurityTokenHandler();
        var token = jwtHandler.ReadJwtToken(jwt);
        var userIdClaim = token.Claims.FirstOrDefault(c => c.Type == "nameid");
        
        if (userIdClaim == null)
        {
            return Unauthorized(new { message = "User ID not found in token" });
        }
        
        var userId = int.Parse(userIdClaim.Value);
        
        var user = await _userManager.FindByIdAsync(userId.ToString());
        
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }

        var userInfo = new
        {
            user.FirstName,
            user.LastName,
            user.Email,
            user.UserName,
            user.Id
        };
        return Ok(userInfo);
    }
    
    //change username
    [Authorize]
    [HttpPut("username/change")]
   public async Task<IActionResult> ChangeUsername([FromBody] ChangeUsernameDto changeUsernameDto)
   {
       if (!ModelState.IsValid)
       {
           return BadRequest(ModelState);
       }
       
       //find logged user
       var user = await _userManager.GetUserAsync(User);

       if (user == null)
       {
           return NotFound("User not found!");
       }
       
       //check if new username already taken
       var existingUser = await _userManager.FindByNameAsync(changeUsernameDto.NewUsername);
       if (existingUser != null)
       {
           return BadRequest("Username already taken");
       }

       // replace username
       user.UserName = changeUsernameDto.NewUsername;
       
       //refresh username in db
       var result = await _userManager.UpdateAsync(user);

       if (!result.Succeeded)
       {
           foreach (var error in result.Errors)
           {
               ModelState.AddModelError(string.Empty, error.Description);
           }
           return BadRequest(ModelState);
       }
       return Ok("Username changed successfully!");
   }
   
   //change fullname
   [Authorize]
   [HttpPut("fullname/change")]
   public async Task<IActionResult> ChangeFullname([FromBody] ChangeFullnameDto changeFullnameDto)
   {
       if (!ModelState.IsValid)
       {
           return BadRequest(ModelState);
       }

       var user = await _userManager.GetUserAsync(User);

       if (user == null)
       {
           return NotFound("User not found!");
       }

       user.FirstName = changeFullnameDto.NewFirstName;
       user.LastName = changeFullnameDto.NewLastName;

       var result = await _userManager.UpdateAsync(user);
       
       if (!result.Succeeded)
       {
           foreach (var error in result.Errors)
           {
               ModelState.AddModelError(string.Empty, error.Description);
           }
           return BadRequest(ModelState);
       }
       
       return Ok("Fullname changed successfully!");
   }

   //change email
   [Authorize]
   [HttpPut("email/change")]

   public async Task<IActionResult> ChangeEmail([FromBody] ChangeEmailDto changeEmailDto)
   {
       if (!ModelState.IsValid)
       {
           return BadRequest(ModelState);
       }

       var user = await _userManager.GetUserAsync(User);

       if (user == null)
       {
           return NotFound("User not found!");
       }

       user.Email = changeEmailDto.NewEmail;
       
       var result = await _userManager.UpdateAsync(user);
       
       if (!result.Succeeded)
       {
           foreach (var error in result.Errors)
           {
               ModelState.AddModelError(string.Empty, error.Description);
           }
           return BadRequest(ModelState);
       }
       
       return Ok("Email changed successfully!");
   }
   
   //change password
   [Authorize]
   [HttpPut("password/change")]
   public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto changePasswordDto)
   {
       if (!ModelState.IsValid)
       {
           return BadRequest(ModelState);
       }

       var user = await _userManager.GetUserAsync(User);
       if (user == null)
       {
           return NotFound("User not found!");
       }

       var result =
           await _userManager.ChangePasswordAsync(user, changePasswordDto.CurrentPassword,
               changePasswordDto.NewPassword);
       
       if (!result.Succeeded)
       {
           foreach (var error in result.Errors)
           {
               ModelState.AddModelError(string.Empty, error.Description);
           }
           return BadRequest(ModelState);
       }

       return Ok("Password changed successfully!");
       
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

    //upload main bg image
    [Authorize]
    [HttpPost("upload-image/main/background")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadBackgroundImage([FromForm] IFormFile backgroundFile)
    {
        if (backgroundFile == null || backgroundFile.Length == 0)
        {
            return BadRequest("No file uploaded");
        }

        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound("User not found!");
        }

        using (var memoryStream = new MemoryStream())
        {
            await backgroundFile.CopyToAsync(memoryStream);
            user.UserBgImage = memoryStream.ToArray();
        }

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest("Could not upload image");
        }
        return Ok("Bg image uploaded successfully!");
    }
    
    //get main bg image
    [Authorize]
    [HttpGet("download-image/main/background")]
    public async Task<IActionResult> DownloadBackgroundImage()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null || user.UserBgImage == null)
        {
            return NotFound("User or Main image not found!");
        }

        return File(user.UserBgImage, "image/jpeg");
    }
}