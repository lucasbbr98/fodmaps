using Foodmaps.Models;
using Foodmaps.Models.RequestModels;
using System;

namespace Foodmaps.Models
{
    public class Address : IEntity
    {
        public int Id { get; set; }
        public string CEP { get; set; }
        public string State { get; set; }
        public string City { get; set; }
        public string Hood { get; set; }
        public string Street { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public Address() { }
        public Address(Address a, string createdBy)
        {
            this.CEP = a.CEP;
            this.City = a.City;
            this.Hood = a.Hood;
            this.State = a.State;
            this.Street = a.Street;
            this.CreatedBy = createdBy;
        }
        public override string ToString()
        {
            return "addresses";
        }
    }
}
