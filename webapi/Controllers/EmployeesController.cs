using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class EmployeesController : ControllerBase
	{
		private readonly ContactsDbContext _context;

		public EmployeesController(ContactsDbContext context)
		{
			_context = context;
		}

		// GET: api/Employees
		[HttpGet]
		public ActionResult<IEnumerable<EmployeeDto>> GetEmployees()
		{
			var employees = _context.Employees.Select(e => new EmployeeDto
			{
				EmployeeID = e.EmployeeID,
				UserID = e.UserID,
				FirstName = e.FirstName,
				LastName = e.LastName,
				Email = e.Email,
				DateOfBirth = e.DateOfBirth,
				Position = e.Position,
				Phone = e.Phone,
				Address = e.Address
			}).ToList();

			return employees;
		}

		// GET: api/Employees/5
		[HttpGet("{id}")]
		public ActionResult<EmployeeDto> GetEmployee(int id)
		{
			var employee = _context.Employees.Where(e => e.EmployeeID == id).Select(e => new EmployeeDto
			{
				EmployeeID = e.EmployeeID,
				UserID = e.UserID,
				FirstName = e.FirstName,
				LastName = e.LastName,
				Email = e.Email,
				DateOfBirth = e.DateOfBirth,
				Position = e.Position,
				Phone = e.Phone,
				Address = e.Address
			}).FirstOrDefault();

			if (employee == null)
			{
				return NotFound();
			}

			return employee;
		}

		// POST: api/Employees
		[HttpPost]
		public ActionResult<EmployeeDto> PostEmployee(EmployeeDto employeeDto)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var employee = new Employee
			{
				UserID = employeeDto.UserID,
				FirstName = employeeDto.FirstName,
				LastName = employeeDto.LastName,
				Email = employeeDto.Email,
				DateOfBirth = employeeDto.DateOfBirth,
				Position = employeeDto.Position,
				Phone = employeeDto.Phone,
				Address = employeeDto.Address
			};

			_context.Employees.Add(employee);
			_context.SaveChanges();

			employeeDto.EmployeeID = employee.EmployeeID;

			return CreatedAtAction("GetEmployee", new { id = employee.EmployeeID }, employeeDto);
		}

		// PUT: api/Employees/5
		[HttpPut("{id}")]
		public IActionResult PutEmployee(int id, EmployeeDto employeeDto)
		{
			if (id != employeeDto.EmployeeID)
			{
				return BadRequest();
			}

			var employee = _context.Employees.Find(id);
			if (employee == null)
			{
				return NotFound();
			}

			employee.UserID = employeeDto.UserID;
			employee.FirstName = employeeDto.FirstName;
			employee.LastName = employeeDto.LastName;
			employee.Email = employeeDto.Email;
			employee.DateOfBirth = employeeDto.DateOfBirth;
			employee.Position = employeeDto.Position;
			employee.Phone = employeeDto.Phone;
			employee.Address = employeeDto.Address;

			_context.Entry(employee).State = EntityState.Modified;
			_context.SaveChanges();

			return NoContent();
		}

		// DELETE: api/Employees/5
		[HttpDelete("{id}")]
		public IActionResult DeleteEmployee(int id)
		{
			var employee = _context.Employees.Find(id);
			if (employee == null)
			{
				return NotFound();
			}

			_context.Employees.Remove(employee);
			_context.SaveChanges();

			return NoContent();
		}
	}
}
