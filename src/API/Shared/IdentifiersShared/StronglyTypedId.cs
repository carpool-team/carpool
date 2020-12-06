using System.ComponentModel;
using IdentifiersShared.Converters;

namespace IdentifiersShared
{
	[TypeConverter(typeof(StronglyTypedIdConverter))]
	public abstract record StronglyTypedId<TValue>(TValue Value)
		where TValue : notnull
	{
		public override string ToString() => Value.ToString();
	}
}