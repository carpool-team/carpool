using System.Threading;
using System.Threading.Tasks;
using Carpool.Core.Models.Intersections;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddUserToGroupCommandHandler : AsyncRequestHandler<AddUserToGroupCommand>
	{
		private readonly IGroupRepository _repository;

		public AddUserToGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository;

		protected override async Task Handle(AddUserToGroupCommand request, CancellationToken cancellationToken)
		{
			var group = await _repository.GetByIdAsync(request.GroupId, cancellationToken).ConfigureAwait(false);
			var userGroup = new UserGroup
			{
				GroupId = request.GroupId,
				UserId = request.UserId
			};

			//group.UserGroups.Add(userGroup);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}