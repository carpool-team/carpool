using System;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts.Repositories;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class AddRideParticipantCommand : IRequest
	{
		[JsonConstructor]
		public AddRideParticipantCommand(RideId? rideId, AppUserId participantId)
		{
			RideId = rideId;
			ParticipantId = participantId;
		}

		public RideId? RideId { get; set; }
		public AppUserId ParticipantId { get; set; }
	}
	
	public class AddRideParticipandCommandHandler : AsyncRequestHandler<AddRideParticipantCommand>
	{
		private readonly IRideParticipantRepository _participantRepository;
		private readonly IRideRepository _rideRepository;
		private readonly IUserRepository _userRepository;

		public AddRideParticipandCommandHandler(IRideRepository rideRepository,
			IRideParticipantRepository participantRepository,
			IUserRepository userRepository)
		{
			_rideRepository = rideRepository;
			_participantRepository = participantRepository;
			_userRepository = userRepository;
		}

		protected override async Task Handle(AddRideParticipantCommand request, CancellationToken cancellationToken)
		{
			var ride = await _rideRepository.GetByIdAsNoTrackingAsync((RideId)request.RideId, cancellationToken); ;

			_ = ride ?? throw new NullReferenceException(nameof(ride));
			var user = await _userRepository.GetByIdAsNoTrackingAsync(request.ParticipantId, cancellationToken);

			_ = user ?? throw new NullReferenceException(nameof(user));
			var rideParticipants =
				await _participantRepository.GetParticipantsByRideId((RideId) request.RideId, cancellationToken);

			rideParticipants.Add(new UserParticipatedRide(request.ParticipantId, request.RideId));

            try { 
			await _participantRepository.SaveAsync(cancellationToken);
			}
			catch(DbUpdateException ex)
            {
				throw new ApiException(ex);
            }
		}
	}
}