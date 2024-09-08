﻿using Microsoft.AspNetCore.Identity;
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
}