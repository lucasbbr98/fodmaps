using System;

namespace Foodmaps.Models
{
    public class Authentication : IEntity
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public string Password { get; set; }
		public string Salt { get; set; }
		public string PasswordToken { get; set; }
		public int Failures { get; set; }
		public DateTime? LastFailure { get; set; }
		public DateTime CreatedOn { get; set; }
		public string CreatedBy { get; set; }
		public DateTime ModifiedOn { get; set; }
		public string ModifiedBy { get; set; }
		public DateTime? ObsoletedOn { get; set; }
		public string ObsoletedBy { get; set; }

        public Authentication() { }
        public Authentication(User u, string salt, string passwordHash)
        {
            this.UserId = u.Id;
            this.Password = passwordHash;
            this.Salt = salt;
            this.CreatedBy = "SYSTEM";
            this.CreatedOn = DateTime.Now;
            this.ModifiedBy = "SYSTEM";
            this.ModifiedOn = DateTime.Now;

            this.PasswordToken = null;
            this.Failures = 0;
            this.LastFailure = null;
        }

		public override string ToString() => "authentication";
	}
}