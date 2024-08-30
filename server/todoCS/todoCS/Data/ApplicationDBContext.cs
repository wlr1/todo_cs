using Microsoft.EntityFrameworkCore;
using todoCS.Entities;

namespace todoCS.Data;

public class ApplicationDBContext : DbContext
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        
    }

    public DbSet<TodoEntityItem> TodoItems { get; set; } = null!;
}