using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Carpool.Core.Abstract
{
	public abstract class BaseEntity<T> : IBaseEntity<T>
	{
		[Key]
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public T Id { get; set; }
	}
}