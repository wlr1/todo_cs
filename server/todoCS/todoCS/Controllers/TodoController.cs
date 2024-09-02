using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoCS.Data;

using todoCS.Entities;
using todoCS.Interfaces;
using todoCS.Mappers;

namespace todoCS.Controllers;


    [Route("/api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly ITodoRepository _todoRepo;

        public TodoController(ApplicationDBContext context, ITodoRepository todoRepo)
        {
            _context = context;
            _todoRepo = todoRepo;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoEntityItem>>> GetTodo()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todoItems = await _todoRepo.GetTodoAsync();

            var todoDto = todoItems.Select(x => x.ToTodoDto());

            return Ok(todoDto);

         
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<TodoEntityItem>> GetByIdTodo([FromRoute] long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        [HttpPost]
        [Route("create")]

        public async Task<ActionResult<TodoEntityItem>> CreateTodo(TodoEntityItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTodo), new { id = todoItem.Id }, todoItem);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] long id, TodoEntityItem todoItem)
        {
            if (id != todoItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(todoItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.TodoItems.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> DeleteTodo(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todoItem);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }

    }
