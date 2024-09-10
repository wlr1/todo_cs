

namespace todoCS.Entities;

public class TodoEntityItem
{
    public long Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public bool IsCompleted { get; set; } 
    public DateTime CreatedAt { get; set; }
    
    public string? Secret { get; set; }
    
    public int UserId { get; set; }
    public UserEntity User { get; set; }
}