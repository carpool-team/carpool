using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using MediatR;

namespace Carpool.RestAPI.Commands.Location
{
	public class UpdateLocationCommandHandler : AsyncRequestHandler<UpdateLocationCommand>
	{
		private readonly ILocationRepository _locationRepository;

		public UpdateLocationCommandHandler(ILocationRepository locationRepository)
			=> _locationRepository = locationRepository;


		protected override async Task Handle(UpdateLocationCommand request, CancellationToken cancellationToken)
		{
			var location = await _locationRepository.GetByIdAsync((Guid) request.Id, cancellationToken)
			                                        .ConfigureAwait(false);

			location.Name = string.IsNullOrEmpty(request.Name) ? request.Name : location.Name;
			location.Longitude = request.Longitude ?? location.Longitude;
			location.Latitude = request.Latitude ?? location.Latitude;

			await _locationRepository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}