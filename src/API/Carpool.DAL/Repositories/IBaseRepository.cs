using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Abstract;
using Carpool.Core.Contracts;

namespace Carpool.DAL.Repositories
{
	public interface IBaseRepository<in TEntity, T> : IDisposable where TEntity : IBaseEntity<T>
	{
		//Task<T> GetByIdAsync(Guid id, CancellationToken cancellationToken);
		//T GetById(Guid id);

		Task AddAsync(TEntity entity, CancellationToken cancellationToken);
		void Add(TEntity entity);

		void Update(TEntity entity);

		void Delete(TEntity entity);
		Task DeleteByIdAsync(T id);
		Task SaveAsync(CancellationToken cancellationToken = default);
		void Save();

		Task<bool> AnyWithId(T id);
	}
}