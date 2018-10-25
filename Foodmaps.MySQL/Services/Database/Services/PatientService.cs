using Microsoft.Extensions.Configuration;
using System.Linq;
using Dapper;

namespace Foodmaps.MySQL.Services.Database
{
    using Base;
    using Models;


    public interface IPatientService : IQueriable<Patient>
    {
        int GetPatientsCountByUserId(int userId);
        Patient[] GetPatientsByUserId(int userId);
    }

    public class PatientService : Queriable<Patient>, IPatientService
    {
        public PatientService(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
            : base(configuration, connectionOptions) { }

        public Patient[] GetPatientsByUserId(int userId)
        {
            using (var con = Connection)
            {
                var patients = con.Query<Patient>(QueryFromConfig("GetPatientsByUserId"),
                    new
                    {
                        UserId = userId
                    }).ToArray();
                return patients;
            }
        }

        public int GetPatientsCountByUserId(int userId)
        {
            using (var con = Connection)
            {
                var count = con.Query<int>(QueryFromConfig("GetPatientsCountByUserId"),
                    new
                    {
                        UserId = userId
                    }).FirstOrDefault();
                return count;
            }
        }
    }
}