using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using OfficePortal_CRUD_API.Models;

namespace OfficePortal_CRUD_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeDbContext _context;

        public EmployeesController(EmployeeDbContext context)
        {
            _context = context;
        }

        // GET: Employees
        [HttpGet]
        public IActionResult GetAllEmployees()
        {
            return Ok(_context.Employees.ToList());
        }

        //Get employees by Id or name
        [HttpGet]
        [Route("api/employees/")]
        public async Task<IActionResult> GetSpecificEmployee(int? id, string? name)
        {
            if (id is null && string.IsNullOrWhiteSpace(name))
                return BadRequest("Provide either id or name.");

            if (id != null)
            {
                var employee = await _context.Employees
                    .FirstOrDefaultAsync(e => e.Id == id);

                if (employee == null)
                    return NotFound();

                return Ok(employee); // single result
            }

            var employees = await _context.Employees
                .Where(e => e.Name.ToLower() == name.ToLower())
                .ToListAsync();

            if (!employees.Any())
                return NotFound();

            return Ok(employees);

        }

        //Create new employee
        [HttpPost]
        public async Task<IActionResult> AddEmployee(AddEmployeeDto addEmployee)
        {
            var employeeEntity = new Employee
            {
                Name = addEmployee.Name,
                Position = addEmployee.Position,
                Email = addEmployee.Email,
                Phone = addEmployee.Phone,
                City = addEmployee.City
            };
            _context.Employees.Add(employeeEntity);
            await _context.SaveChangesAsync();
            return Ok(employeeEntity);
        }

        //Update Employee details
        [HttpPut]
        [Route("api/employees/{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, UpdateEmployeeDto updateEmployee)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            employee.Name = updateEmployee.Name;
            employee.Position = updateEmployee.Position;
            employee.Email = updateEmployee.Email;
            employee.Phone = updateEmployee.Phone;
            employee.City = updateEmployee.City;

            await _context.SaveChangesAsync();

            return Ok(employee);
        }

        //Delete employee
        [HttpDelete]
        [Route("api/employees/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
            return Ok("Person successfully deleted.");
        }

    }
}
