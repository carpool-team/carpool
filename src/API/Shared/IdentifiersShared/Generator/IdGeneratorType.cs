namespace IdentifiersShared.Generator
{
    public record IdGeneratorType
    {
        public static int User => 0;
        public static int Ride => 1;
        public static int Group => 2;
        public static int GroupInvite => 3;
        public static int RideRequest => 4;
        public static int RecurringRide => 5;
        public static int Stop => 6;
    }
}