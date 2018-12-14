using System;

namespace Foodmaps.Models
{
    public class Research : IEntity
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int Age { get; set; }
        public string Gender { get; set; }
        public double Weight { get; set; }
        public double Height { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public Research() { }
        public Research(int QuestionnaireId, string Name, string Surname, int Age, string Gender, double Weight, double Height, string createdBy)
        {
            this.QuestionnaireId = QuestionnaireId;
            this.Name = Name;
            this.Surname = Surname;
            this.Age = Age;
            this.Gender = Gender;
            this.Weight = Weight;
            this.Height = Height;
            this.CreatedBy = createdBy;
        }
        public override string ToString()
        {
            return "researches";
        }
    }
}
