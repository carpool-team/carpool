using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using MediatR;

namespace Carpool.RestAPI.Commands.Location
{
	public class AddLocationCommandHandler : IRequestHandler<AddLocationCommand, Core.Models.Location>
	{
		private readonly ILocationRepository _locationRepository;

		public AddLocationCommandHandler(ILocationRepository locationRepository)
			=> _locationRepository = locationRepository;

		public async Task<Core.Models.Location> Handle(AddLocationCommand request, CancellationToken cancellationToken)
		{
			var location = new Core.Models.Location
			{
				Name = request.Name,
				Longitude = request.Longitude,
				Latitude = request.Latitude
			};


			await _locationRepository.AddAsync(location, cancellationToken).ConfigureAwait(false);
			await _locationRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
			return location;
		}
	}
}