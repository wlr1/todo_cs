using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using todoCS.Data;
using todoCS.Dtos;
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
        public async Task<IActionResult> GetTodo()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todoItems = await _todoRepo.GetTodoAsync();

            var todoDto = todoItems.Select(x => x.ToTodoDto());

            return Ok(todoDto);

         
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdTodo([FromRoute] long id)
        {
            var todoItem = await _todoRepo.GetByIdAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return Ok(todoItem.ToTodoDto());
        }

        [HttpPost]
        [Route("create")]

        public async Task<IActionResult> CreateTodo(CreateTodoDto todoDto)
        {
            
            var todoModel = todoDto.ToTodoCreate();
            await _todoRepo.CreateTodoAsync(todoModel);

            return CreatedAtAction(nameof(GetByIdTodo), new { id = todoModel.Id }, todoModel.ToTodoDto());
        }

        [HttpPut]
        [Route("update/{id:int}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] long id, [FromBody] UpdateTodoDto todoDto)
        {

            var todo = await _todoRepo.UpdateTodoAsync(id, todoDto.ToTodoUpdate());

            if (todo == null)
            {
                return NotFound("Todo not found");
            }

            return Ok(todo.ToTodoDto());

        }

        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] long id)
        {
            var todoModel = await _todoRepo.DeleteTodoAsync(id);

            if (todoModel == null)
            {
                return NotFound("Todo does not exist!");
            }

            return Ok(todoModel);
        }

    }
