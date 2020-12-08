using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataTransferObjects
{
    public record LocationDto([property: JsonProperty("longitude")]double longitude,
        [property: JsonProperty("latitude")]double latitude);
}
