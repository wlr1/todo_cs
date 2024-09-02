using System.ComponentModel.DataAnnotations;

namespace todoCS.Dtos;

public class CreateTodoDto
{
    [Required]
    [MinLength(5, ErrorMessage = "Title must be atleast 5 characters")]
    [MaxLength(100, ErrorMessage = "Title cannot be over 100 characters")]
    
    public string Title { get; set; } = string.Empty;

    [Required]
    [MinLength(5, ErrorMessage = "Title must be atleast 5 characters")]
    [MaxLength(280, ErrorMessage = "Title cannot be over 280 characters")]

    public string Description { get; set; } = string.Empty;

    [Required] 
    public bool IsCompleted { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
