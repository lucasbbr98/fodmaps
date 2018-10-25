using System;

namespace Foodmaps.Models
{
    public class Answer : IEntity
    {
        public int Id { get; set; }
        public int QuestionnaireId { get; set; }
        public int Value { get; set; }
        public string Frequency { get; set; }
        public int FoodId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public Answer() { }
        public override string ToString()
        {
            return "answers";
        }
    }
}
