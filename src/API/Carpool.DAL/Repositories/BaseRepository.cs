using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Abstract;
using Carpool.DAL.DatabaseContexts;
using Microsoft.EntityFrameworkCore;

namespace Carpool.DAL.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        internal readonly CarpoolDbContext _context;

        public BaseRepository(CarpoolDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(_context));
        }

        public void Dispose()
        {
        }

        //public async Task<T> GetByIdAsync(Guid id, CancellationToken cancellationToken)
        //{
        //    return await _context.Set<T>().FindAsync(id, cancellationToken);
        //}

        //public T GetById(Guid id)
        //{
        //    return _context.Set<T>().Find(id);
        //}


        public async Task AddAsync(T entity, CancellationToken cancellationToken)
        {
            await _context.Set<T>().AddAsync(entity, cancellationToken);
        }

        public void Add(T entity)
        {
            _context.Set<T>().Add(entity);
        }


        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Delete(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public async Task SaveAsync(CancellationToken cancellationToken)
        {
            await _context.SaveChangesAsync(cancellationToken);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}
