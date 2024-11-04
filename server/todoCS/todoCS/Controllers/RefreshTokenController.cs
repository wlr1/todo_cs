using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using todoCS.Entities;
using todoCS.Interfaces;
using todoCS.Services;

namespace todoCS.Controllers;

  [Route("controller")]
  [ApiController]
  public class RefreshTokenController : ControllerBase
  {
    private readonly IRefreshTokenRepository _refreshTokenRepository;
    private readonly JwtService _jwtService;
    private readonly UserManager<UserEntity> _userManager;

    public RefreshTokenController(IRefreshTokenRepository refreshTokenRepository, JwtService jwtService,
      UserManager<UserEntity> userManager)
    {
      _refreshTokenRepository = refreshTokenRepository;
      _jwtService = jwtService;
      _userManager = userManager;
    }
  
    //refresh token generation
    [HttpPost("generate")]
    [Authorize]
    public async Task<IActionResult> GenerateRefreshToken()
    {
      var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if (userIdClaim == null)
      {
        return Unauthorized("user not authenticated!");
      }
      
     

      var token = _jwtService.GenerateRefreshToken();
      var expiryDate = DateTime.UtcNow.AddDays(7);

      await _refreshTokenRepository.AddOrUpdateRefreshTokenAsync(int.Parse(userIdClaim), token, expiryDate);

      return Ok(new { Token = token, ExpiryDate = expiryDate });
    }
    
    //Refresh token validation
    [HttpGet("validate")]
    [Authorize]
    public async Task<IActionResult> ValidateRefreshToken(string token)
    {
      var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if (userIdClaim == null)
      {
        return Unauthorized("User not authenticated.");
      }
      var refreshToken = await _refreshTokenRepository.GetRefreshTokenAsync(int.Parse(userIdClaim), token);
      if (refreshToken == null || refreshToken.ExpiryDate < DateTime.UtcNow)
      {
        return Unauthorized("Invalid or expired refresh token.");
      }

      return Ok(new { Message = "Refresh token is valid." });
    }
    
    // Delete refresh token
    [HttpDelete("delete")]
    [Authorize]
    public async Task<IActionResult> DeleteRefreshToken()
    {
      var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
      if (userIdClaim == null)
      {
        return Unauthorized("User not authenticated.");
      }

      await _refreshTokenRepository.DeleteRefreshTokenAsync(int.Parse(userIdClaim));

      return Ok("Refresh token deleted successfully.");
    }
  }
  