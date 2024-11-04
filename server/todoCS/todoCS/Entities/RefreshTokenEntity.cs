using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace todoCS.Entities;

public class RefreshTokenEntity
{
    [Key]
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Token { get; set; }
    public DateTime ExpiryDate { get; set; }

    [ForeignKey(nameof(UserId))] public UserEntity User { get; set; } = null!;
}