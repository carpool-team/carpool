namespace Carpool.Core.ValueObjects
{
    public record Location
    {
        public Location()
        {
        }

        public Location(double longitude, double latitude) => (Longitude, Latitude) = (longitude, latitude);

        public double Longitude { get; set; }

        public double Latitude { get; set; }
    }
}