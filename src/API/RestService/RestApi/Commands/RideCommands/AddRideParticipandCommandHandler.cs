using System;
using System.Threading;
using System.Threading.Tasks;
using DataAccessLayer.Repositories.Ride;
using DataAccessLayer.Repositories.RideParticipant;
using DataAccessLayer.Repositories.User;
using Domain.Entities.Intersections;
using MediatR;

namespace RestApi.Commands.RideCommands
{
	public class AddRideParticipandCommandHandler : AsyncRequestHandler<AddRideParticipandCommand>
	{
		private readonly IRideRepository _rideRepository;
		private readonly IRideParticipantRepository _participantRepository;
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
			var ride = await _rideRepository.GetByIdAsNoTrackingAsync((Guid) request.RideId, cancellationToken)
			                                .ConfigureAwait(false);

			_ = ride ?? throw new NullReferenceException(nameof(ride));
			var user = await _userRepository.GetByIdAsNoTrackingAsync(request.ParticipandId, cancellationToken)
			                                .ConfigureAwait(false);

			_ = user ?? throw new NullReferenceException(nameof(user));
			var rideParticipants =
				await _participantRepository.GetParticipantsByRideId((Guid) request.RideId, cancellationToken)
				                            .ConfigureAwait(false);

			rideParticipants.Add(new UserParticipatedRide
			{
				UserId = request.ParticipandId,
				RideId = (Guid) request.RideId
			});

			await _participantRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}