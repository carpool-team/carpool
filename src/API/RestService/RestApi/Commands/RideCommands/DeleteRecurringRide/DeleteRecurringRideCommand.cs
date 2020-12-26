using System.Threading;
using System.Threading.Tasks;
using IdentifiersShared.Identifiers;
using MediatR;

namespace RestApi.Commands.RideCommands.DeleteRecurringRide
{
	public class DeleteRecurringRideCommand : IRequest
	{
		public DeleteRecurringRideCommand(RecurringRideId recurringRideId)
			=> RecurringRideId = recurringRideId;
		public RecurringRideId RecurringRideId { get; }
	}
	
	public class DeleteRecurringRideCommandHandler : AsyncRequestHandler<DeleteRecurringRideCommand>
	{
		protected override async Task Handle(DeleteRecurringRideCommand request, CancellationToken cancellationToken)
			=> throw new System.NotImplementedException();
	}
}