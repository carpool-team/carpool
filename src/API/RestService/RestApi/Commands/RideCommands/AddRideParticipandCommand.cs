using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Ride;
using DataAccessLayer.Repositories.RideParticipant;
using DataAccessLayer.Repositories.User;
using Domain.Entities.Intersections;
using IdentifiersShared.Identifiers;
using MediatR;
using Newtonsoft.Json;

namespace RestApi.Commands.RideCommands
{
	public class AddRideParticipandCommand : IRequest
	{
		[JsonConstructor]
		public AddRideParticipandCommand(RideId? rideId, UserId participantId)
		{
			RideId = rideId;
			ParticipantId = participantId;
		}

		public RideId? RideId { get; set; }
		public UserId ParticipantId { get; set; }
	}
	
	public class AddRideParticipandCommandHandler : AsyncRequestHandler<AddRideParticipandCommand>
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

		protected override async Task Handle(AddRideParticipandCommand request, CancellationToken cancellationToken)
		{
			var ride = await _rideRepository.GetByIdAsNoTrackingAsync((RideId) request.RideId, cancellationToken)
				.ConfigureAwait(false);

			_ = ride ?? throw new NullReferenceException(nameof(ride));
			var user = await _userRepository.GetByIdAsNoTrackingAsync(request.ParticipantId, cancellationToken)
				.ConfigureAwait(false);

			_ = user ?? throw new NullReferenceException(nameof(user));
			var rideParticipants =
				await _participantRepository.GetParticipantsByRideId((RideId) request.RideId, cancellationToken)
					.ConfigureAwait(false);

			rideParticipants.Add(new UserParticipatedRide
			{
				UserId = request.ParticipantId, RideId = (RideId) request.RideId
			});

			await _participantRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}