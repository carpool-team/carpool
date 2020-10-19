using System;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Carpool.DAL.Builders
{
	public class CompanyBuilder : IEntityTypeConfiguration<Company>
	{
		public void Configure(EntityTypeBuilder<Company> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.Name);

			builder.HasMany(x => x.Users)
			       .WithOne()
			       .HasForeignKey(u => u.CompanyId)			       
			       .OnDelete(DeleteBehavior.ClientNoAction);

		}
	}
}