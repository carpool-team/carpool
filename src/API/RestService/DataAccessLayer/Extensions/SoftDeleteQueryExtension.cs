using System;
using System.Linq.Expressions;
using System.Reflection;
using Domain.Contracts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace DataAccessLayer.Extensions
{
	public static class SoftDeleteQueryExtension
	{
		public static void AddSoftDeleteQueryFilter(
			this IMutableEntityType entityData)
		{
			var methodToCall = typeof(SoftDeleteQueryExtension)
				.GetMethod(nameof(GetSoftDeleteFilter),
					BindingFlags.NonPublic | BindingFlags.Static)
				?.MakeGenericMethod(entityData.ClrType) ?? throw new NullReferenceException();
			var filter = methodToCall.Invoke(null, new object[] { });
			entityData.SetQueryFilter((LambdaExpression)filter);
		}
 
		private static LambdaExpression GetSoftDeleteFilter<TEntity>()
			where TEntity : class, ISoftDeletable
		{
			Expression<Func<TEntity, bool>> filter = x => !x.IsSoftDeleted;
			return filter;
		}
	}
}