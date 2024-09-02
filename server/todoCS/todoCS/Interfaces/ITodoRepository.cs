﻿using todoCS.Entities;

namespace todoCS.Interfaces;

public interface ITodoRepository
{
    Task<List<TodoEntityItem>> GetTodoAsync();

    Task<TodoEntityItem?> GetByIdAsync(long id);

    Task<TodoEntityItem?> CreateTodoAsync(TodoEntityItem todoModel);

    Task<TodoEntityItem?> UpdateTodoAsync(long id, TodoEntityItem todoModel);

    Task<TodoEntityItem> DeleteTodoAsync(long id);
}