using System;

namespace Foodmaps.Models
{
    public enum RoleType
    {
        Doctor = 1,
        Admin,
        Banned
    }
	public class Role : IEntity
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public int ColorId { get; set; }
		public DateTime CreatedOn { get; set; }
		public string CreatedBy { get; set; }
		public DateTime ModifiedOn { get; set; }
		public string ModifiedBy { get; set; }
		public DateTime? ObsoletedOn { get; set; }
		public string ObsoletedBy { get; set; }
		public override string ToString() => "roles";
	}
}