using System;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IdentifiersShared.Converters
{
	public class RideIdValueConverter : ValueConverter<RideId, Guid>
	{
		public RideIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new RideId(value),
				mappingHints) { }
	}
	
	public class StopIdValueConverter : ValueConverter<StopId, Guid>
	{
		public StopIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new StopId(value),
				mappingHints) { }
	}	
	
	public class UserIdValueConverter : ValueConverter<UserId, Guid>
	{
		public UserIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new UserId(value),
				mappingHints) { }
	}	
	
	public class GroupIdValueConverter : ValueConverter<GroupId, Guid>
	{
		public GroupIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new GroupId(value),
				mappingHints) { }
	}	
	
	public class VehicleIdValueConverter : ValueConverter<VehicleId, Guid>
	{
		public VehicleIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new VehicleId(value),
				mappingHints) { }
	}	
	
	public class GroupInviteIdValueConverter : ValueConverter<GroupInviteId, Guid>
	{
		public GroupInviteIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new GroupInviteId(value),
				mappingHints) { }
	}
	
	
}