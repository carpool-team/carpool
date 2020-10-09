using System;
using System.Threading;
using System.Threading.Tasks;
using Carpool.DAL.Repositories.Group;
using MediatR;

namespace Carpool.RestAPI.Commands.Group
{
	public class AddGroupCommandHandler : AsyncRequestHandler<AddGroupCommand>
	{
		private readonly IGroupRepository _repository;

		public AddGroupCommandHandler(IGroupRepository repository)
			=> _repository = repository ?? throw new ArgumentNullException(nameof(repository));

		protected override async Task Handle(AddGroupCommand request, CancellationToken cancellationToken)
		{
			if (!string.IsNullOrEmpty(request.Code)
			    && await _repository.GroupCodeExists(request.Code).ConfigureAwait(false))
				throw new InvalidOperationException("Group code already exists");

			var group = new Core.Models.Group();
			group.Name = request.Name;
			group.Code = request.Code;
			group.OwnerId = request.OwnerId;

			await _repository.AddAsync(group, cancellationToken).ConfigureAwait(false);
			await _repository.SaveAsync(cancellationToken).ConfigureAwait(false);
		}
	}
}