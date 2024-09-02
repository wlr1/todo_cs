using Microsoft.AspNetCore.Http.HttpResults;
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

    public Task<TodoEntityItem?> UpdateTodoAsync(long id, TodoEntityItem todoModel)
    {
        throw new NotImplementedException();
    }

    public Task<TodoEntityItem> DeleteTodoAsync(long id)
    {
        throw new NotImplementedException();
    }
}