using System;

namespace Foodmaps.Models
{
    public class FatalError : IEntity
    {
        public int Id { get; set; }
        public string Exception { get; set; }
        public DateTime CreatedOn { get; set; }
        public string CreatedBy { get; set; }
        public DateTime ModifiedOn { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? ObsoletedOn { get; set; }
        public string ObsoletedBy { get; set; }

        public FatalError() { }
        public FatalError(string exception, string createdBy)
        {
            this.Exception = exception;
            this.CreatedBy = createdBy;
        }
        public override string ToString()
        {
            return "fatalerrors";
        }
    }
}
