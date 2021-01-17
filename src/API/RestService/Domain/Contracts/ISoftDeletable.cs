namespace Domain.Contracts
{
	public interface ISoftDeletable
	{
		bool IsSoftDeleted { get; set; }
	}
}