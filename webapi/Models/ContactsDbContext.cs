using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
	public partial class ContactsDbContext : DbContext
	{
		public ContactsDbContext(DbContextOptions<ContactsDbContext> options)
			: base(options)
		{
		}

		public virtual DbSet<User> Users { get; set; }
		public virtual DbSet<ContactsList> ContactsList { get; set; }
		public virtual DbSet<Employee> Employees { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			modelBuilder.Entity<User>(entity =>
			{
				entity.HasKey(e => e.Userid).HasName("PK__users__1797D02432D9A170");

				entity.ToTable("users");

				entity.Property(e => e.Userid).ValueGeneratedNever();
				entity.Property(e => e.Active).HasColumnName("active");
				entity.Property(e => e.Login)
					.HasMaxLength(50)
					.IsUnicode(false)
					.HasColumnName("login");
				entity.Property(e => e.Password)
					.HasMaxLength(50)
					.IsUnicode(false)
					.HasColumnName("password");
			});

			modelBuilder.Entity<ContactsList>(entity =>
			{
				entity.HasKey(e => e.ContactID).HasName("PK__ContactsList__ContactID");

				entity.ToTable("ContactsList");

				entity.Property(e => e.ContactID).ValueGeneratedOnAdd();
				entity.Property(e => e.FirstName)
					.HasMaxLength(50)
					.IsUnicode(false)
					.HasColumnName("FirstName");
				entity.Property(e => e.LastName)
					.HasMaxLength(50)
					.IsUnicode(false)
					.HasColumnName("LastName");
				entity.Property(e => e.Email)
					.HasMaxLength(100)
					.IsUnicode(false)
					.HasColumnName("Email");
				entity.Property(e => e.Gender)
					.HasMaxLength(10)
					.IsUnicode(false)
					.HasColumnName("Gender");
				entity.Property(e => e.City)
					.HasMaxLength(50)
					.IsUnicode(false)
					.HasColumnName("City");

				entity.HasOne(d => d.User)
					.WithMany()
					.HasForeignKey(d => d.UserID)
					.HasConstraintName("FK_ContactsList_Users_UserID");
			});

			modelBuilder.Entity<Employee>(entity =>
			{
				entity.HasKey(e => e.EmployeeID);

				entity.ToTable("Employees");

				entity.Property(e => e.EmployeeID).ValueGeneratedOnAdd();
				entity.Property(e => e.FirstName).IsRequired().HasMaxLength(50);
				entity.Property(e => e.LastName).IsRequired().HasMaxLength(50);
				entity.Property(e => e.Email).IsRequired().HasMaxLength(50);
				entity.Property(e => e.DateOfBirth).HasColumnType("DATE");
				entity.Property(e => e.Position).HasMaxLength(50);
				entity.Property(e => e.Phone).HasMaxLength(50);
				entity.Property(e => e.Address).HasMaxLength(50);

				entity.HasOne(e => e.User)
					.WithMany()
					.HasForeignKey(e => e.UserID)
					.HasConstraintName("FK_Employees_Users_UserID");
			});

			OnModelCreatingPartial(modelBuilder);
		}

		partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
	}
}