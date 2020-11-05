using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Rating;
using Carpool.DAL.Repositories.User;
using MediatR;

namespace Carpool.RestAPI.Commands.Rating
{
	public class AddUserRatingComandHandler : IRequestHandler<AddUserRatingCommand, Core.Models.Rating>
	{
		private readonly IUserRepository _userRepository;
		private readonly IRatingRepository _ratingRepository;

		public AddUserRatingComandHandler(IUserRepository userRepository, IRatingRepository ratingRepository)
		{
			_userRepository = userRepository;
			_ratingRepository = ratingRepository;
		}


		public async Task<Core.Models.Rating> Handle(AddUserRatingCommand request, CancellationToken cancellationToken)
		{
			var userId = (Guid) request.UserId;
			var user = await _userRepository.GetByIdAsNoTrackingAsync(userId, cancellationToken).ConfigureAwait(false);
			_ = user ?? throw new NullReferenceException(nameof(user));
			var userRating = new Core.Models.Rating
			{
				UserId = userId,
				Value = request.Value
			};

			await _ratingRepository.AddAsync(userRating, cancellationToken).ConfigureAwait(false);
			await _ratingRepository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return userRating;
		}
	}
}