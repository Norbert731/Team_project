using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models
{
	public class Employee
	{
		[Key]
		public int EmployeeID { get; set; }

		public int UserID { get; set; }

		[Required]
		[StringLength(50)]
		public string FirstName { get; set; }

		[Required]
		[StringLength(50)]
		public string LastName { get; set; }

		[Required]
		[StringLength(50)]
		public string Email { get; set; }

		public DateTime DateOfBirth { get; set; }

		[StringLength(50)]
		public string Position { get; set; }

		[StringLength(50)]
		public string Phone { get; set; }

		[StringLength(50)]
		public string Address { get; set; }

		[ForeignKey("UserID")]
		public virtual User User { get; set; }
	}
}
