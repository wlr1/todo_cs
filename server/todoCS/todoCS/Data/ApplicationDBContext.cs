using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using todoCS.Entities;

namespace todoCS.Data;

public class ApplicationDBContext : IdentityDbContext<UserEntity, IdentityRole<int>, int>
{
    public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
    {
        
    }

    public DbSet<TodoEntityItem> TodoItems { get; set; } = null!;
    public DbSet<RefreshTokenEntity> RefreshTokens { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<TodoEntityItem>().HasOne<UserEntity>(todo => todo.User).WithMany(user => user.Todos)
            .HasForeignKey(todo => todo.UserId);
    }
}