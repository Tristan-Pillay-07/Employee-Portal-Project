using System.ComponentModel.DataAnnotations.Schema;

namespace OfficePortal_CRUD_API.Models
{
    public class Employee
    {
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public required string Name { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public required string Position { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public required string Email { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public required string Phone { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public required string City { get; set; }
    }
}
