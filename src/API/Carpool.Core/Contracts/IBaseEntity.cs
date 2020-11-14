namespace Carpool.Core.Abstract
{
	public interface IBaseEntity<T>
	{
		T Id { get; set; }
	}
}