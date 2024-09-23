using System.ComponentModel.DataAnnotations;

namespace todoCS.Dtos;

public class isCompletedTodoDto
{
    [Required] public bool isCompleted { get; set; }
}