using System;
using System.Security.Cryptography.X509Certificates;
using Carpool.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Configuration;

namespace Carpool.DAL.Builders
{
	public class GroupInviteBuilder : IEntityTypeConfiguration<GroupInvite>
	{
		public void Configure(EntityTypeBuilder<GroupInvite> builder)
		{
			_ = builder ?? throw new NullReferenceException(nameof(builder));

			builder.HasKey(x => x.Id);

			builder.Property(x => x.IsAccepted).IsRequired();
			builder.Property(x => x.IsPending).IsRequired();
			builder.Property(x => x.DateAdded).IsRequired();

            builder.HasOne(x => x.InvitedApplicationUser)
                .WithMany()
                .HasForeignKey(x => x.InvitedUserId)
                .OnDelete(DeleteBehavior.NoAction).IsRequired();

            builder.HasOne(x => x.InvitingApplicationUser)
                .WithMany()
                .HasForeignKey(x => x.InvitingUserId)
                .OnDelete(DeleteBehavior.NoAction).IsRequired();

            // builder.HasOne(x => x.Group)
            //        .WithMany()
            //        .HasForeignKey(x => x.GroupId);
        }
    }
}