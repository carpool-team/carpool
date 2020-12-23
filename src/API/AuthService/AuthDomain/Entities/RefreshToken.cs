using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace AuthDomain.Entities
{
	[Owned]
	public class RefreshToken : ValueObject
	{
		public string Token { get; set; }
		public DateTime Expires { get; set; }

		[NotMapped]
		[JsonIgnore]
		public bool IsExpired => DateTime.UtcNow >= Expires;

		public DateTime Created { get; set; }
		public DateTime? Revoked { get; set; }

		[NotMapped] 
		[JsonIgnore]
		public bool IsActive => Revoked is null && !IsExpired;

		protected override IEnumerable<object> GetEqualityComponents()
		{
			yield return Token;
			yield return Expires;
			yield return Created;
			yield return Revoked;
		}
	}
}