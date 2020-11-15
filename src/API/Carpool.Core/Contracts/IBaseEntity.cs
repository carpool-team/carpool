namespace Carpool.Core.Contracts
{
	public interface IBaseEntity<T>
	{
		T Id { get; set; }
	}
}