using Foodmaps.Models.RequestModels;
using System;

namespace Foodmaps.Models
{
    public class Job : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Identifier { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }
        public override string ToString()
        {
            return "jobs";
        }

        public Job() { }

        public Job(RegistrationAdditionalModel m, string createdBy)
        {
            this.Name = m.JobName;
            this.Identifier = m.Identifier;
            this.CreatedBy = createdBy;
        }
    }
}
