﻿using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts.Repositories;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace Application.Queries.UserQueries
{
	public class GetUserByIdQuery : IRequest<ApplicationUser>
	{
		[JsonConstructor]
		public GetUserByIdQuery(AppUserId appUserId)
			=> AppUserId = appUserId;

		public AppUserId AppUserId { get; }
	}
	
	public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, ApplicationUser>
	{
		private readonly IUserRepository _repository;

		public GetUserByIdQueryHandler(IUserRepository repository)
			=> _repository = repository;

		public async Task<ApplicationUser> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
			=> await _repository.GetByIdAsNoTrackingAsync(request.AppUserId, cancellationToken).ConfigureAwait(false);
	}
}