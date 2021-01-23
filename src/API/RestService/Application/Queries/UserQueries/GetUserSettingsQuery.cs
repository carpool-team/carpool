using DataTransferObjects.User;
using IdentifiersShared.Identifiers;
using MediatR;

namespace Application.Queries.UserQueries
{
	public class GetUserSettingsQuery : IRequest<UserSettingsDto>
	{
		public GetUserSettingsQuery(AppUserId appUserId)
			=> AppUserId = appUserId;
		public AppUserId AppUserId { get; }
	}
}