using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Abstract;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories
{
	public class BaseRepository<TEntity, T> : IBaseRepository<TEntity, T> where TEntity : BaseEntity<T>
	{
		internal readonly CarpoolDbContext _context;

		public BaseRepository(CarpoolDbContext context)
			=> _context = context ?? throw new ArgumentNullException(nameof(context));

		public void Dispose()
		{
		}

		// public async Task<TEntity> GetByIdAsync(T id, CancellationToken cancellationToken)
		// {
		//     return await _context.Set<TEntity>().FirstOrDefaultAsync(x => x.Id == id, cancellationToken: cancellationToken).ConfigureAwait(false);
		// }
		//
		// public TEntity GetById(T id)
		// {
		//     return _context.Set<TEntity>().Find(id);
		// }


		public async Task AddAsync(TEntity entity, CancellationToken cancellationToken = default)
		{
			await _context.Set<TEntity>().AddAsync(entity, cancellationToken).ConfigureAwait(false);
		}

		public void Add(TEntity entity)
		{
			_context.Set<TEntity>().Add(entity);
		}


		public void Update(TEntity entity)
		{
			_context.Set<TEntity>().Update(entity);
		}

		public void Delete(TEntity entity)
		{
			_context.Set<TEntity>().Remove(entity);
		}

		public async Task DeleteByIdAsync(T id)
		{
			var entity = await _context.Set<TEntity>().FirstOrDefaultAsync(x => id.Equals(x.Id)).ConfigureAwait(false);
			_context.Set<TEntity>().Remove(entity);
		}

		public async Task SaveAsync(CancellationToken cancellationToken = default)
		{
			await _context.SaveChangesAsync(cancellationToken).ConfigureAwait(false);
		}

		public void Save()
		{
			_context.SaveChanges();
		}
	}
}