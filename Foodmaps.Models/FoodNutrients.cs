using System;
using System.Collections.Generic;
using System.Text;

namespace Foodmaps.Models
{
    public class FoodNutrients : IEntity
    {
        public int Id { get; set; }
        public string Category { get; set; }
        public double Frutose { get; set; }
        public double Lactose { get; set; }
        public double FrutoGalacto { get; set; }
        public double SorbitolManitol { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public override string ToString()
        {
            return "foodnutrients";
        }
    }
}
