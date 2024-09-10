
using Microsoft.AspNetCore.Identity;

namespace todoCS.Entities;

public class UserEntity : IdentityUser<int>
{

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    
    public byte[]? UserAvatar { get; set; }

    public ICollection<TodoEntityItem> Todos { get; set; } = new List<TodoEntityItem>();

}