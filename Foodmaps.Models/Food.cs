using System;

namespace Foodmaps.Models
{
    public class Food : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ImageId { get; set; }
        public int NutrientsId { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public Food() { }

        public override string ToString()
        {
            return "foods";
        }
    }
}
