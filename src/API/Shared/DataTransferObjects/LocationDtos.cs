using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObjects
{
    public record LocationDto([property: JsonProperty("longitude")]double Longitude,
        [property: JsonProperty("latitude")]double Latitude);
}
