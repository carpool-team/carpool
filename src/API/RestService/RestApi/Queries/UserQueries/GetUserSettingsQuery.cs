using IdentifiersShared.Identifiers;
using MediatR;
using RestApi.DTOs.User;

namespace RestApi.Queries.UserQueries
{
	public class GetUserSettingsQuery : IRequest<UserSettingsDto>
	{
		public GetUserSettingsQuery(AppUserId appUserId)
			=> AppUserId = appUserId;
		public AppUserId AppUserId { get; }
	}
}