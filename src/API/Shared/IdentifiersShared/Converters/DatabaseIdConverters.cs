using System;
using System.ComponentModel;
using IdentifiersShared.Identifiers;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IdentifiersShared.Converters
{
	public class RideIdValueConverter : ValueConverter<RideId, long>
	{
		public RideIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new RideId(value),
				mappingHints) { }
	}

	public class StopIdValueConverter : ValueConverter<StopId, long>
	{
		public StopIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new StopId(value),
				mappingHints) { }
	}

	public class UserIdValueConverter : ValueConverter<UserId, long>
	{
		public UserIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new UserId(value),
				mappingHints) { }
	}

	public class UserIdTypeConverter : TypeConverter
	{
		
	}
	
	public class GroupIdValueConverter : ValueConverter<GroupId, long>
	{
		public GroupIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new GroupId(value),
				mappingHints) { }
	}

	public class VehicleIdValueConverter : ValueConverter<VehicleId, long>
	{
		public VehicleIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new VehicleId(value),
				mappingHints) { }
	}

	public class GroupInviteIdValueConverter : ValueConverter<GroupInviteId, long>
	{
		public GroupInviteIdValueConverter(ConverterMappingHints mappingHints = null)
			: base(id => id.Value,
				value => new GroupInviteId(value),
				mappingHints) { }
	}
}