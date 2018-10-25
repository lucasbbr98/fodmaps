using System;

namespace Foodmaps.Models
{
	public class UserRole : IEntity
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public int RoleId { get; set; }
		public DateTime CreatedOn { get; set; }
		public string CreatedBy { get; set; }
		public DateTime ModifiedOn { get; set; }
		public string ModifiedBy { get; set; }
		public DateTime? ObsoletedOn { get; set; }
		public string ObsoletedBy { get; set; }
        public UserRole() { }
        public UserRole(User u, RoleType r, string createdBy = "UserRole constructor")
        {
            this.UserId = u.Id;
            this.RoleId = (int)r;
            this.CreatedBy = createdBy;
        }
		public override string ToString() => "userroles";
	}
}