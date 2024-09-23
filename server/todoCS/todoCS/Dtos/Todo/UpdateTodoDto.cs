using System.ComponentModel.DataAnnotations;

namespace todoCS.Dtos;

public class UpdateTodoDto
{
    [Required]
    [MinLength(3, ErrorMessage = "Title must be atleast 3 characters")]
    [MaxLength(77, ErrorMessage = "Title cannot be over 77 characters")]
    
    public string Title { get; set; } = string.Empty;

    [Required]
    [MinLength(3, ErrorMessage = "Title must be atleast 3 characters")]
    [MaxLength(700, ErrorMessage = "Title cannot be over 700 characters")]

    public string Description { get; set; } = string.Empty;

    
}