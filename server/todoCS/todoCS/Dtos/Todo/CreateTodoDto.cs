using System.ComponentModel.DataAnnotations;

namespace todoCS.Dtos;

public class CreateTodoDto
{
    [Required]
    [MinLength(3, ErrorMessage = "Title must be at least 3 characters")]
    [MaxLength(77, ErrorMessage = "Title cannot be over 77 characters")]
    
    public string Title { get; set; } = string.Empty;

    [Required]
    [MinLength(3, ErrorMessage = "Description must be at least 3 characters")]
    [MaxLength(700, ErrorMessage = "Description cannot be over 700 characters")]

    public string Description { get; set; } = string.Empty;

    [Required] 
    public bool IsCompleted { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
