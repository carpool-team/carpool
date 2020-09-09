using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Abstract;

namespace Carpool.DAL.Repositories
{
    public interface IBaseRepository<in T> : IDisposable where T : IBaseEntity
    {
        //Task<T> GetByIdAsync(Guid id, CancellationToken cancellationToken);
        //T GetById(Guid id);

        Task AddAsync(T entity, CancellationToken cancellationToken);
        void Add(T entity);

        void Update(T entity);

        void Delete(T entity);

        Task SaveAsync(CancellationToken cancellationToken);
        void Save();
    }
}
