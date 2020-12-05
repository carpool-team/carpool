using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AuthDomain.Entities
{
	[Owned]
	public class RefreshToken
	{
		public string Token { get; set; }
		public DateTime Expires { get; set; }

		[NotMapped] public bool IsExpired => DateTime.UtcNow >= Expires;

		public DateTime Created { get; set; }
		public DateTime? Revoked { get; set; }

		[NotMapped] public bool IsActive => Revoked == null && !IsExpired;
	}
}