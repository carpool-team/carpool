using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using IdentifiersShared.Identifiers;
using MediatR;
using Microsoft.EntityFrameworkCore;

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
		private readonly IRecurringRidesRepository _recurringRidesRepository;
		private readonly IUnitOfWork _unitOfWork;

		public DeleteRecurringRideCommandHandler(IRecurringRidesRepository recurringRidesRepository,
		                                         IUnitOfWork unitOfWork)
		{
			_recurringRidesRepository = recurringRidesRepository;
			_unitOfWork = unitOfWork;
		}

		protected override async Task Handle(DeleteRecurringRideCommand request, CancellationToken cancellationToken)
		{
			var recurringRides = await _recurringRidesRepository
				                     .GetByIdAsync(request.RecurringRideId, cancellationToken);

			_recurringRidesRepository.Delete(recurringRides);

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}
		}
	}
}