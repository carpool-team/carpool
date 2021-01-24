using System.Collections.Generic;
using Domain.Entities;
using IdentifiersShared.Identifiers;
using MediatR;

namespace Application.Queries.RideQueries
{
    public class GetUserRidesQuery : IRequest<IReadOnlyCollection<Ride>>
    {
        public AppUserId AppUserId { get; }
        public bool Past { get; }

        public GetUserRidesQuery(AppUserId appUserId, bool past)
            => (AppUserId, Past)
                = (appUserId, past);
    }
}
