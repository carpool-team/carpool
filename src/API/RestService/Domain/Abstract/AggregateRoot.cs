using System.ComponentModel.DataAnnotations;

namespace Domain.Abstract
{
	public class AggregateRoot<T>
	{
		[Key] public T Id { get; set; }
	}
}