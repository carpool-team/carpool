using System.Collections.Generic;
using DataTransferObjects.Group;
using IdentifiersShared.Identifiers;
using Newtonsoft.Json;

namespace DataTransferObjects.GroupReport
{
	public record GroupReportDto(List<UserReportDto> Drivers,
		List<UserReportDto> Passengers,
		GroupDto Group,
		int RidesCount,
		int PassengerCount);

	public record UserReportDto(int RideCount,
		AppUserId Id,
		string FirstName,
		string LastName);
}

// Drivers - ReportUser
// Passengers - ReportUser
// Group
// RidesInGroupCount
//
// ReportUser
// rideCount
// id
// firstName
// lastName