namespace Domain.Contracts
{
	public interface IBaseEntity<T>
	{
		T Id { get; set; }
	}

	public interface IBaseEntity
	{
		
	}
}