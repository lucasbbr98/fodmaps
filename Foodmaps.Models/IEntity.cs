using System;

namespace Foodmaps.Models
{
    public interface IEntity
    {
        int Id { get; set; }

        DateTime CreatedOn { get; set; }
        string CreatedBy { get; set; }
        DateTime ModifiedOn { get; set; }
        string ModifiedBy { get; set; }
        DateTime? ObsoletedOn { get; set; }
        string ObsoletedBy { get; set; }
    }
}
