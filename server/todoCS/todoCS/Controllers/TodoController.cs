﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using todoCS.Dtos;
using todoCS.Entities;
using todoCS.Interfaces;
using todoCS.Mappers;

namespace todoCS.Controllers;


    [Route("/api/[controller]")]
    [ApiController]
    public class TodoController : ControllerBase
    {
       
        private readonly ITodoRepository _todoRepo;
        private readonly UserManager<UserEntity> _userManager;

        public TodoController(ITodoRepository todoRepo, UserManager<UserEntity> userManager)
        {
            _todoRepo = todoRepo;
            _userManager = userManager;
        }

        //FETCH ALL api/Todo
        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetTodo()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.GetUserAsync(User); //get current user
            if (user == null) return Unauthorized("User not found!");

            var todoItems = await _todoRepo.GetTodoByUserAsync(user.Id); //get only this users todo

            var sortedTodoItems = todoItems.OrderBy(x => x.Order).Select(x => x.ToTodoDto());

            return Ok(sortedTodoItems);

         
        }

        //GET BY ID api/Todo/id
        [Authorize]
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetByIdTodo([FromRoute] long id)
        {

            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found!");
            
            var todoItem = await _todoRepo.GetByIdAsync(id);

            if (todoItem == null || todoItem.UserId != user.Id)
            {
                return NotFound("Todo not found or you do not have access");
            }

            return Ok(todoItem.ToTodoDto());
        }

        //CREATE api/Todo/create
        [Authorize]
        [HttpPost]
        [Route("create")]

        public async Task<IActionResult> CreateTodo(CreateTodoDto todoDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found!");
            
            
            var todoModel = todoDto.ToTodoCreate();
            todoModel.UserId = user.Id;
            await _todoRepo.CreateTodoAsync(todoModel);

            return CreatedAtAction(nameof(GetByIdTodo), new { id = todoModel.Id }, todoModel.ToTodoDto());
        }

        //UPDATE api/Todo/update/id
        [Authorize]
        [HttpPut]
        [Route("update/{id:int}")]
        public async Task<IActionResult> UpdateTodo([FromRoute] long id, [FromBody] UpdateTodoDto todoDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found!");

            var todo = await _todoRepo.GetByIdAsync(id);

            if (todo == null || todo.UserId != user.Id)
            {
                return NotFound("Todo not found or you do not have access");
            }

            todo.Title = todoDto.Title;
            todo.Description = todoDto.Description;

            var updatedTodo = await _todoRepo.UpdateTodoAsync(id, todo);

            return Ok(updatedTodo.ToTodoDto());

        }

        //DELETE api/Todo/delete/id
        [Authorize]
        [HttpDelete]
        [Route("delete/{id:int}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] long id)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found!");

            var todoModel = await _todoRepo.GetByIdAsync(id);

            if (todoModel == null || todoModel.UserId != user.Id)
            {
                return NotFound("Todo not found or you do not have access");
            }

            await _todoRepo.DeleteTodoAsync(id);
            
            return Ok(todoModel);
        }
        
        //isCompleted /api/Todo/isCompleted/id
        [Authorize]
        [HttpPut]
        [Route("isCompleted/{id:int}")]
        public async Task<IActionResult> isCompletedTodo([FromRoute] long id, [FromBody] isCompletedTodoDto todoDto)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found!");

            var todoModel = await _todoRepo.GetByIdAsync(id);

            if (todoModel == null || todoModel.UserId != user.Id)
            {
                return NotFound("Todo not found or you do not have access");
            }

            todoModel.IsCompleted = todoDto.isCompleted;

            var updatedTodo = await _todoRepo.isCompletedTodo(id, todoModel);
            
            return Ok(updatedTodo.ToTodoDto());
        }

        [Authorize]
        [HttpPut]
        [Route("update-order")]
        public async Task<IActionResult> UpdateOrder([FromBody] List<TodoOrderUpdateDto> orderDtos)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null) return Unauthorized("User not found!");

            var userTodos = await _todoRepo.GetTodoByUserAsync(user.Id);
            var todosToUpdate = userTodos.ToDictionary(todo => todo.Id);

            foreach (var orderDto in orderDtos)
            {
                if (todosToUpdate.TryGetValue(orderDto.Id, out var todo))
                {
                    todo.Order = orderDto.Order;
                }
            }

            await _todoRepo.SaveChangesAsync();
            return Ok("Order updated successfully");
        }

    }
