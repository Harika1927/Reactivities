using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    
    public class ActivitiesController : BaseApiController
    {
        private readonly IMediator _mediator;
        public ActivitiesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]

        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());

        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
            
        }

        [HttpPost]
        public async Task<IActionResult> CreateActivity (Activity activity)
        {
            await Mediator.Send(new Create.Command{Activity = activity}); //SEnd an object to Mediator in create handler
            return Ok(); //returns Http response
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity (Guid id , Activity activity)
        {
            activity.Id = id;
            await Mediator.Send(new Edit.Command{Activity = activity});
            return Ok();

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity (Guid id)
        {
            await Mediator.Send(new Delete.Command{Id = id});
            return Ok();

        }
    }
}