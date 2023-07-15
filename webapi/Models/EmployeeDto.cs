using System;
using System.ComponentModel.DataAnnotations;

namespace webapi.Models
{
	public class EmployeeDto
	{
		public int EmployeeID { get; set; }

		[Required]
		public int UserID { get; set; }

		[Required]
		public string FirstName { get; set; }

		[Required]
		public string LastName { get; set; }

		[Required]
		public string Email { get; set; }

		public DateTime DateOfBirth { get; set; }

		public string Position { get; set; }

		public string Phone { get; set; }

		public string Address { get; set; }
	}
}
