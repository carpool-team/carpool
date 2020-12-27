using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Aggregates;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.Enums;
using Domain.ValueObjects;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.EntityFrameworkCore;
using RestApi.DTOs.Stop;

namespace RestApi.Commands.RideCommands.AddRecurringRide
{
	public class AddRecurringRideCommand : IRequest<RecurringRideId>
	{
		[JsonConstructor]
		public AddRecurringRideCommand(AppUserId ownerId,
		                               GroupId groupId,
		                               TimeSpan rideTime,
		                               double price,
		                               Location location,
		                               RideDirection rideDirection,
		                               byte weekDays,
		                               DateTime startDate,
		                               DateTime endDate,
		                               List<AddStopDto>? stops,
		                               byte seatsLimit)
		{
			OwnerId = ownerId;
			GroupId = groupId;
			RideTime = rideTime;
			Price = price;
			Location = location;
			RideDirection = rideDirection;
			WeekDays = weekDays;
			StartDate = startDate;
			EndDate = endDate;
			Stops = stops;
			SeatsLimit = seatsLimit;
		}

		public AppUserId OwnerId { get; }
		public GroupId GroupId { get; }
		public TimeSpan RideTime { get; }
		public DateTime StartDate { get; }
		public DateTime EndDate { get; }
		public double Price { get; }
		public Location Location { get; }
		public RideDirection RideDirection { get; }
		public byte WeekDays { get; }
		public List<AddStopDto>? Stops { get; }
		public byte SeatsLimit { get; }
	}

	public class AddRecurringRideCommandHandler : IRequestHandler<AddRecurringRideCommand, RecurringRideId>
	{
		private readonly IRideRepository _rideRepository;
		private readonly IRecurringRidesRepository _recurringRidesRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddRecurringRideCommandHandler(IRideRepository rideRepository,
		                                      IUnitOfWork unitOfWork, 
		                                      IRecurringRidesRepository recurringRidesRepository)
		{
			_rideRepository = rideRepository;
			_unitOfWork = unitOfWork;
			_recurringRidesRepository = recurringRidesRepository;
		}

		public async Task<RecurringRideId> Handle(AddRecurringRideCommand request,
		                                                      CancellationToken cancellationToken)
		{
			var weekDays = WeekDay.GetDays(request.WeekDays);
			var startDate = request.StartDate;

			var dates = Enumerable
			            .Range(0, int.MaxValue)
			            .Where(index => weekDays.Contains(startDate.AddDays(index).DayOfWeek))
			            .Select(index => startDate.AddDays(index))
			            .TakeWhile(date => date <= request.EndDate)
			            .ToList();

			IdGenerator rideIdGenerator = new(IdGeneratorType.Ride);

			IdGenerator recurringRideIdGenerator = new(IdGeneratorType.RecurringRide);
			var recurringRideId = new RecurringRideId(recurringRideIdGenerator.CreateId());

			var recurringRides = new RecurringRides(recurringRideId);
			
			var ids = rideIdGenerator.Take(dates.Count);
			var i = 0;
			foreach (var date in dates)
				try
				{
					var dateTime = new DateTime(date.Year, date.Month, date.Day, request.RideTime.Hours,
						request.RideTime.Minutes, 0);

					if (request.Location == null)
						throw new ApiException("Ride location cannot be empty", StatusCodes.Status400BadRequest);

					var ride = new Ride(new RideId(ids.ElementAt(i)),
						request.OwnerId,
						request.GroupId,
						dateTime,
						request.Price,
						new Location(request.Location.Longitude, request.Location.Latitude),
						request.RideDirection,
						request.Stops?.Select(x => new Stop(x.ParticipantId,
							       new Location(x.Location.Longitude, x.Location.Latitude),
							       new RideId(ids.ElementAt(i))))
						       .ToList() ?? new List<Stop>(),
						request.SeatsLimit,
						recurringRideId);

					recurringRides.AddRide(ride);
					
					i++;
				}
				catch (Exception ex)
				{
					throw new ApiException(ex.InnerException);
				}

			try
			{
				await _recurringRidesRepository.AddAsync(recurringRides, cancellationToken);
				await _unitOfWork.SaveAsync(cancellationToken);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex.InnerException);
			}

			return recurringRides.Id;
		}
	}

	//TODO: Terrible temporary helper for weekdays checking in AddRecurringRideCommandHandler
	public static class WeekDay
	{
		public static byte Monday => 1;
		public static byte Tuesday => 2;
		public static byte Wednesday => 4;
		public static byte Thursday => 8;
		public static byte Friday => 16;
		public static byte Saturday => 32;
		public static byte Sunday => 64;

		public static List<DayOfWeek> GetDays(byte weekDays)
		{
			List<DayOfWeek> dayOfWeeks = new();
			if (weekDays - Sunday >= 0)
			{
				weekDays -= Sunday;
				dayOfWeeks.Add(DayOfWeek.Sunday);
			}

			if (weekDays - Saturday >= 0)
			{
				weekDays -= Saturday;
				dayOfWeeks.Add(DayOfWeek.Saturday);
			}

			if (weekDays - Friday >= 0)
			{
				weekDays -= Friday;
				dayOfWeeks.Add(DayOfWeek.Friday);
			}

			if (weekDays - Thursday >= 0)
			{
				weekDays -= Thursday;
				dayOfWeeks.Add(DayOfWeek.Thursday);
			}

			if (weekDays - Wednesday >= 0)
			{
				weekDays -= Wednesday;
				dayOfWeeks.Add(DayOfWeek.Wednesday);
			}

			if (weekDays - Tuesday >= 0)
			{
				weekDays -= Tuesday;
				dayOfWeeks.Add(DayOfWeek.Tuesday);
			}

			if (weekDays - Monday >= 0)
			{
				weekDays -= Monday;
				dayOfWeeks.Add(DayOfWeek.Monday);
			}

			return dayOfWeeks;
		}
	}
}