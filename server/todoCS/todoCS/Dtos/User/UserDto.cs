using System.ComponentModel.DataAnnotations;

namespace todoCS.Dtos;

public class UserDto
{
    public int Id { get; set; }
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string Username { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    
    public byte[]? UserAvatar { get; set; }
}