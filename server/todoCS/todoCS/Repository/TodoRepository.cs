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

    public Task<TodoEntityItem?> GetByIdAsync(long id)
    {
        throw new NotImplementedException();
    }

    public Task<TodoEntityItem?> CreateTodoAsync(TodoEntityItem todoModel)
    {
        throw new NotImplementedException();
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