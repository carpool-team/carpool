using Newtonsoft.Json;

namespace AuthServer.Models
{
	public class RefreshTokenModel
	{
		[JsonConstructor]
		public RefreshTokenModel(string value)
		{
			Value = value;
		}

		public string Value { get; }
	}
}