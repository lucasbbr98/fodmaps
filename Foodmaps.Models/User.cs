using Foodmaps.Models.RequestModels;
using System;

namespace Foodmaps.Models
{
    /// <summary>
    /// 'User' é uma classe que corresponde a qualquer usuário que venha a ter um login ou senha no website.
    /// </summary>
    public class User : IEntity
	{
		public int Id { get; set; }
		public string Email { get; set; }
		public string Name { get; set; }
		public string Surname { get; set; }
		public DateTime Birthday { get; set; }
		public string Gender { get; set; }
		public string CPF { get; set; }
        public string University { get; set; }
		public int? JobId { get; set; }
		public int? AddressId { get; set; }
		public DateTime CreatedOn { get; set; }
		public string CreatedBy { get; set; }
		public DateTime ModifiedOn { get; set; }
		public string ModifiedBy { get; set; }
		public DateTime? ObsoletedOn { get; set; }
		public string ObsoletedBy { get; set; }

        public User() { }

        public User(RegistrationModel m, string createdBy)
        {
            this.Name = m.Name;
            this.Surname = m.Surname;
            this.Email = m.Email;
            this.Gender = m.Gender;
            this.Birthday = DateTime.Parse(m.DateString);
            this.CPF = m.CPF;
            this.CreatedBy = createdBy;
        }

        //This has to be fetched from a database before it can be used.
        public Role[] Roles;

		public override string ToString() => "users";
	}
}