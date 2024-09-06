using Microsoft.AspNetCore.Mvc;
using todoCS.Dtos;
using todoCS.Interfaces;
using todoCS.Mappers;

namespace todoCS.Controllers;


    [Route("/api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
       
        private readonly ITodoRepository _todoRepo;

        public TodoController(ITodoRepository todoRepo)
        {
            _todoRepo = todoRepo;
        }

        //FETCH ALL api/Todo
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

        //GET BY ID api/Todo/id
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

        //CREATE api/Todo/create
        [HttpPost]
        [Route("create")]

        public async Task<IActionResult> CreateTodo(CreateTodoDto todoDto)
        {
            
            var todoModel = todoDto.ToTodoCreate();
            await _todoRepo.CreateTodoAsync(todoModel);

            return CreatedAtAction(nameof(GetByIdTodo), new { id = todoModel.Id }, todoModel.ToTodoDto());
        }

        //UPDATE api/Todo/update/id
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

        //DELETE api/Todo/delete/id
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
