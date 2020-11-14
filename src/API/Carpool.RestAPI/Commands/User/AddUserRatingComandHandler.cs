using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.User;
using Carpool.Core.ValueObjects;
using MediatR;

namespace Carpool.RestAPI.Commands.User
{
    public class AddUserRatingComandHandler : IRequestHandler<AddUserRatingCommand, Rating>
    {
        private readonly IUserRepository _userRepository;

        public AddUserRatingComandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }


        public async Task<Rating> Handle(AddUserRatingCommand request, CancellationToken cancellationToken)
        {
            var userId = (Guid)request.UserId;
            var user = await _userRepository.GetByIdAsNoTrackingAsync(userId, cancellationToken).ConfigureAwait(false);
            _ = user ?? throw new NullReferenceException(nameof(user));
            
            var rating = new Rating(request.Value);
            
            //user.Rating = new UserRating();

            await _userRepository.SaveAsync(cancellationToken).ConfigureAwait(false);

            return rating;
        }
    }
}