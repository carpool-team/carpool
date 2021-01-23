namespace AuthShared.Options
{
	public class JwtOptions
	{
		public string Issuer { get; set; } = "https://carpool-auth.azurewebsites.net";
		public string Audience { get; set; } = "https://carpool.com.pl";
		public string Key { get; set; } = "tesa22r3f34rc345s4v6in78im9oyn8wo9m4oxdmh892e3omo8usf538mo98oemf4ht5m89,ttest";
	}
}