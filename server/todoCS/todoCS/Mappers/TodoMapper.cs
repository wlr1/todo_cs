using todoCS.Dtos;
using todoCS.Entities;

namespace todoCS.Mappers;

public static class TodoMapper
{
    public static TodoDto ToTodoDto(this TodoEntityItem todoModel)
    {
        return new TodoDto
        {
            Id = todoModel.Id,
            Title = todoModel.Title,
            Description = todoModel.Description,
            CreatedAt = todoModel.CreatedAt,
            IsCompleted = todoModel.IsCompleted
        };
    }
}