using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Location;
using MediatR;

namespace Carpool.RestAPI.Commands.Location
{
	public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand, Core.Models.Location>
	{
		private readonly ILocationRepository _repository;

		public DeleteLocationCommandHandler(ILocationRepository repository)
			=> _repository = repository;

		public async Task<Core.Models.Location> Handle(DeleteLocationCommand request,
		                                               CancellationToken cancellationToken)
		{
			var location = await _repository.GetByIdAsync(request.Id, cancellationToken).ConfigureAwait(false);
			_repository.Delete(location);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);

			return location;
		}
	}
}