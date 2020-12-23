using System.ComponentModel.DataAnnotations;
using Domain.Contracts;

namespace Domain.Abstract
{
	public abstract class BaseEntity<T> : IBaseEntity<T>
	{
		[Key] public T Id { get; set; }
	}
}