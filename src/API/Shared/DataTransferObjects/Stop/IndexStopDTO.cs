using DataTransferObjects.User;

namespace DataTransferObjects.Stop
{
    public class IndexStopDTO
    {
        private IndexStopDTO() { }

        public IndexUserDto User { get; set; }
        public LocationDto Location { get; set; }
    }
}