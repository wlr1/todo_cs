using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoCS.Data;
using todoCS.Dtos;
using todoCS.Entities;

namespace todoCS.Controllers;


    [Route("/api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public TodoController(ApplicationDBContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoEntityItem>>> GetTodo()
        {
            return await _context.TodoItems.ToListAsync();
        }
    }
