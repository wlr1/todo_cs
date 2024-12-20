﻿using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;
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
    private readonly IEmailService _emailService;
  

    public AccountController(UserManager<UserEntity> userManager, SignInManager<UserEntity> signInManager,
        JwtService jwtService, IEmailService emailService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _emailService = emailService;
       

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

        var defaultBgImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "wallpaper3.jpg");
        var defaultContentBgImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "contentWallpaper.jpg");
        var defaultUserAvatarPath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "user.png");

        if (!System.IO.File.Exists(defaultBgImagePath) || !System.IO.File.Exists(defaultContentBgImagePath) || !System.IO.File.Exists(defaultUserAvatarPath))
        {
            return BadRequest("Default images not found");
        }

        var defaultBgImage = await System.IO.File.ReadAllBytesAsync(defaultBgImagePath);
        var defaultContentBgImage = await System.IO.File.ReadAllBytesAsync(defaultContentBgImagePath);
        var defaultUserAvatar = await System.IO.File.ReadAllBytesAsync(defaultUserAvatarPath);

        var user = new UserEntity
        {
            UserName = registerDto.Username,
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            UserBgImage = defaultBgImage,
            UserContentBgImage = defaultContentBgImage,
            UserAvatar = defaultUserAvatar
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

        //confirmation token
        var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var confirmationLink =
            Url.Action(nameof(ConfirmEmail), "Account", new { userId = user.Id, token }, Request.Scheme);
        
        //send confirmation email
        await _emailService.SendEmailAsync(user.Email, "Confirm your email",
            $"Please confirm your email by clicking this link: {confirmationLink}");
        
        return Ok("User registered successfully! Please check your email to confirm");
    }

    [HttpGet("confirm-email")]
    public async Task<IActionResult> ConfirmEmail(int userId, string token)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        if (user == null)
        {
            return NotFound("User not found!");
        }

        var result = await _userManager.ConfirmEmailAsync(user, token);
        if (!result.Succeeded)
        {
            return BadRequest("Email confirmation failed!");
        }

        return Ok("Email confirmed successfully");
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
        
        return Ok(new { Token = token});
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

       var passwordCheck = await _userManager.CheckPasswordAsync(user, changePasswordDto.CurrentPassword);
       if (!passwordCheck)
       {
           return BadRequest(new { message = "Current password is incorrect!" });
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

        using (var inputStream = avatarFile.OpenReadStream())
        using (var image = Image.Load<Rgba32>(inputStream))
        {

            //upload restrictions
            if (image.Width > 900 || image.Height > 900)
            {
                return BadRequest("Avatar image dimensions must not exceed 900x900 pixels");
            }
            
            //resize image to 80x80
            image.Mutate((x => x.Resize(80,80)));

            //save as webp format
            using (var outputStream = new MemoryStream())
            {
                await image.SaveAsync(outputStream, new WebpEncoder());
                user.UserAvatar = outputStream.ToArray();
            }
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
            //copy uploaded image to  memory
            await backgroundFile.CopyToAsync(memoryStream);
            //return a flow back to the start
            memoryStream.Position = 0;
    
            //open image with imagesharp and convert to webp
            using (var image = Image.Load<Rgba32>(memoryStream))
            {
                if (image.Width > 1920 || image.Height > 1080)
                {
                    return BadRequest("Main bg image dimensions must not exceed 1920x1080 pixels");
                }
                
                image.Mutate(x => x.Resize(1920, 1080));
                using (var outputMemoryStream = new MemoryStream())
                {   
                    //saving image to webp
                   await image.SaveAsync(outputMemoryStream, new WebpEncoder());
                    //saving to db converted image
                    user.UserBgImage = outputMemoryStream.ToArray();
                }
            }
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

        var fileResult = File(user.UserBgImage, "image/webp");

        return fileResult;
    }
    
    //set default main bg image
    [Authorize]
    [HttpPut("reset-image/main/background")]
    public async Task<IActionResult> ResetBackgroundImageToDefault()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound("User not found!");
        }

        var defaultImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "wallpaper3.jpg");

        if (!System.IO.File.Exists(defaultImagePath))
        {
            return NotFound("Default background image not found!");
        }

        using (var image = Image.Load<Rgba32>(defaultImagePath))
        {
            using (var outputMemoryStream = new MemoryStream())
            {
                await image.SaveAsync(outputMemoryStream, new WebpEncoder());

                user.UserBgImage = outputMemoryStream.ToArray();
            }
        }

        var result = await _userManager.UpdateAsync(user);
        
        if (!result.Succeeded)
        {
            return BadRequest("Could not reset to default background image.");
        }

        return Ok("Background image reset to default successfully!");
    }
    
    //upload content bg image
    [Authorize]
    [HttpPost("upload-image/content/background")]
    [Consumes("multipart/form-data")]
    public async Task<IActionResult> UploadContentBackgroundImage([FromForm] IFormFile contentFile)
    {
        if (contentFile == null || contentFile.Length == 0)
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
            //copy uploaded image to  memory
            await contentFile.CopyToAsync(memoryStream);
            //return a flow back to the start
            memoryStream.Position = 0;
    
            //open image with imagesharp and convert to webp
            using (var image = Image.Load<Rgba32>(memoryStream))
            {
                if (image.Width > 1920 || image.Height > 1080)
                {
                    return BadRequest("Content bg image dimensions must not exceed 1920x1080 pixels");
                }
                
                image.Mutate(x => x.Resize(1400, 800));
                using (var outputMemoryStream = new MemoryStream())
                {   
                    //saving image to webp
                   await image.SaveAsync(outputMemoryStream, new WebpEncoder());
                    //saving to db converted image
                    user.UserContentBgImage = outputMemoryStream.ToArray();
                }
            }
        }

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return BadRequest("Could not upload image");
        }
        
        return Ok("Content image uploaded successfully!");
    }
    
    //get content image
    [Authorize]
    [HttpGet("download-image/content/background")]
    public async Task<IActionResult> DownloadContentBackgroundImage()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null || user.UserContentBgImage == null)
        {
            return NotFound("User or Content image not found!");
        }

        var fileResult = File(user.UserContentBgImage, "image/webp");

        return fileResult;
    }
    
    //set default content bg image
    [Authorize]
    [HttpPut("reset-image/content/background")]
    public async Task<IActionResult> ResetContentBackgroundToDefault()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return NotFound("User not found!");
        }

        var defaultImagePath = Path.Combine(Directory.GetCurrentDirectory(), "Images", "contentWallpaper.jpg");

        if (!System.IO.File.Exists(defaultImagePath))
        {
            return NotFound("Default background image not found!");
        }

        using (var image = Image.Load<Rgba32>(defaultImagePath))
        {
            using (var outputMemoryStream = new MemoryStream())
            {
                await image.SaveAsync(outputMemoryStream, new WebpEncoder());

                user.UserContentBgImage = outputMemoryStream.ToArray();
            }
        }

        var result = await _userManager.UpdateAsync(user);
        
        if (!result.Succeeded)
        {
            return BadRequest("Could not reset to default background image.");
        }

        return Ok("Background image reset to default successfully!");
    }

}