using Foodmaps.Models;
using Foodmaps.Models.RequestModels;
using System;

namespace Foodmaps.Models
{
    public class Patient : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Gender { get; set; }
        public DateTime Birthday { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public Patient() { }
        public Patient(CreatePatientModel model, int userId, string createdBy)
        {
            this.CreatedBy = createdBy;
            this.Gender = model.Gender;
            this.Height = model.Height;
            this.Name = model.Name;
            this.Surname = model.Surname;
            this.Weight = model.Weight;
            this.UserId = userId;
            this.Birthday = DateTime.Parse(model.stringBday);
        }
        public override string ToString()
        {
            return "patients";
        }
    }
}
