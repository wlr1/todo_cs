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

    public static TodoEntityItem ToTodoCreate(this CreateTodoDto todoDto)
    {
        return new TodoEntityItem
        {
            Title = todoDto.Title,
            Description = todoDto.Description,
            CreatedAt = todoDto.CreatedAt,
            IsCompleted = todoDto.IsCompleted
        };
    }

    public static TodoEntityItem ToTodoUpdate(this UpdateTodoDto todoDto)
    {
        return new TodoEntityItem
        {
            Title = todoDto.Title,
            Description = todoDto.Description,
            IsCompleted = todoDto.IsCompleted
        };
    }
}