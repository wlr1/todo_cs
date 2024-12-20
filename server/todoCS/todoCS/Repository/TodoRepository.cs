﻿
using Microsoft.EntityFrameworkCore;
using todoCS.Data;
using todoCS.Entities;
using todoCS.Interfaces;

namespace todoCS.Repository;

public class TodoRepository : ITodoRepository
{
    private readonly ApplicationDBContext _context;

    public TodoRepository(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<List<TodoEntityItem>> GetTodoAsync()
    {
        return await _context.TodoItems.ToListAsync();
    }

    public async Task<TodoEntityItem?> GetByIdAsync(long id)
    {
        var todoItems = await _context.TodoItems.FindAsync(id);

        return todoItems;
    }

    public async Task<TodoEntityItem?> CreateTodoAsync(TodoEntityItem todoModel)
    {
        await _context.TodoItems.AddAsync(todoModel);
        await _context.SaveChangesAsync();
        return todoModel;
    }

    public async Task<TodoEntityItem?> UpdateTodoAsync(long id, TodoEntityItem todoModel)
    {
        var existingTodo = await _context.TodoItems.FindAsync(id);

        if (existingTodo == null)
        {
            return null;
        }

        existingTodo.Title = todoModel.Title;
        existingTodo.Description = todoModel.Description;
     

        await _context.SaveChangesAsync();
        return existingTodo;

    }
    
    public async Task<TodoEntityItem?> isCompletedTodo(long id, TodoEntityItem todoModel)
    {

        var existingTodo = await _context.TodoItems.FindAsync(id);
        
        if (existingTodo == null)
        {
            return null;
        }

        existingTodo.IsCompleted = todoModel.IsCompleted;

        await _context.SaveChangesAsync();
        return existingTodo;
    }
    
    public async Task<TodoEntityItem?> DeleteTodoAsync(long id)
    {
        var todoModel = await _context.TodoItems.FirstOrDefaultAsync(x => x.Id == id);

        if (todoModel == null)
        {
            return null;
        }

        _context.TodoItems.Remove(todoModel);
        await _context.SaveChangesAsync();
        return todoModel;
    }
    
    public async Task<List<TodoEntityItem>> GetTodoByUserAsync(int userId)
    {
        return await _context.TodoItems
            .Where(todo => todo.UserId == userId)
            .OrderBy(todo => todo.Order) // order by order id
            .ToListAsync();
        
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}