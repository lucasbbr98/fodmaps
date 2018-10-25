using Dapper;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Foodmaps.MySQL.Services.Database.Base
{
    using Models;
    using MySQL;

    public interface IQueriable<TEntity>
        where TEntity: class, IEntity, new()
    {
        TEntity Get(int id);
        IEnumerable<TEntity> GetAll();
        bool Update(TEntity entity);
        bool Insert(TEntity entity);
        int InsertGetId(TEntity entity);
        bool Delete(int id);
    }

    public abstract class Queriable<TEntity> : IQueriable<TEntity>
        where TEntity: class, IEntity, new()
    {
        private string _getQuery => QueryFromConfig("Get");
        private string _getAllQuery => QueryFromConfig("GetAll");
        private string _deleteQuery => QueryFromConfig("Delete");
        private string _updateQuery => QueryFromConfig("Update");
        private string _insertQuery => QueryFromConfig("Insert");
        private string _insertGetIdQuery => QueryFromConfig("InsertGetId");

        private IConnectionOptions connectionOptions;
        private IConfigurationRoot configuration;
        private string TableName => new TEntity().ToString();
        
        public IDbConnection Connection => connectionOptions.Connection;

        public Queriable(IConfigurationRoot configuration, IConnectionOptions connectionOptions)
        {
            this.configuration = configuration;
            this.connectionOptions = connectionOptions;
        }

        public virtual TEntity Get(int id)
        {
            using (var con = Connection)
            {
                return con.Query<TEntity>(_getQuery, new
                {
                    Id = id
                }).FirstOrDefault();
            }
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            using (var con = Connection)
            {
                return con.Query<TEntity>(_getAllQuery);
            }
        }

        public virtual bool Update(TEntity entity)
        {
            using (var con = Connection)
            {
                return con.Execute(_updateQuery, entity) > 0;
            }
        }

        public virtual bool Insert(TEntity entity)
        {
            using (var con = Connection)
            {
                return con.Execute(_insertQuery, entity) > 0;
            }
        }

        public virtual int InsertGetId(TEntity entity)
        {
            using (var con = Connection)
            {
                return con.ExecuteScalar<int>(_insertGetIdQuery, entity);
            }
        }

        public virtual bool Delete(int id)
        {
            using (var con = Connection)
            {
                return con.Execute(_deleteQuery, new
                {
                    Id = id
                }) > 0;
            }
        }

        public string QueryFromConfig(string name)
        {
            return configuration[$"SQL:{TableName}:{name}"];
        }
    }
}
