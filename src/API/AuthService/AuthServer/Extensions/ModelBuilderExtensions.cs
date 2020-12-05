using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuthServer.Extensions
{
	public static class ModelBuilderExtensions
	{
		public static ModelBuilder UseValueConverter(this ModelBuilder modelBuilder, ValueConverter converter)
		{
			// The-strongly typed ID type
			var type = converter.ModelClrType;

			// For all entities in the data model
			foreach (var entityType in modelBuilder.Model.GetEntityTypes())
			{
				// Find the properties that are our strongly-typed ID
				var properties = entityType
					.ClrType
					.GetProperties()
					.Where(p => p.PropertyType == type);

				foreach (var property in properties)
					// Use the value converter for the property
					modelBuilder
						.Entity(entityType.Name)
						.Property(property.Name)
						.HasConversion(converter);
			}

			return modelBuilder;
		}
	}
}
