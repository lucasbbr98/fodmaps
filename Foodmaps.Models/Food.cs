using System;

namespace Foodmaps.Models
{
    public class Food : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int GroupId { get; set; }
        public double Frutose { get; set; }
        public double Lactose { get; set; }
        public double Oligossacarideo { get; set; }
        public double Poliol { get; set; }
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
