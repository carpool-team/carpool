using System;
using System.Threading;
using System.Threading.Tasks;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.ValueObjects;
using IdentifiersShared.Identifiers;
using MediatR;

namespace Application.Commands.UserCommands
{
	public class AddUserRatingCommand : IRequest<Rating>
	{
		public AddUserRatingCommand(AppUserId? userId, byte value)
		{
			UserId = userId;
			Value = value;
		}

		public AppUserId? UserId { get; }
		public byte Value { get; }
	}
	
	public class AddUserRatingCommandHandler : IRequestHandler<AddUserRatingCommand, Rating>
	{
		private readonly IUserRepository _userRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddUserRatingCommandHandler(IUserRepository userRepository, IUnitOfWork unitOfWork)
			=> (_userRepository, _unitOfWork)
				= (userRepository, unitOfWork);


		public async Task<Rating> Handle(AddUserRatingCommand request, CancellationToken cancellationToken)
		{
			var userId = request.UserId;
			var user = await _userRepository.GetByIdAsNoTrackingAsync(userId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));

			var rating = new Rating(request.Value);

			user.Ratings.Add(rating);

			await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);

			return rating;
		}
	}
}