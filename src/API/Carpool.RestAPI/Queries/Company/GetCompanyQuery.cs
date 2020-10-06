using MediatR;

namespace Carpool.RestAPI.Queries.Company
{
    public class GetCompanyQuery : IRequest<Core.Models.Company>
    {
        public GetCompanyQuery(int id)
        {
            Id = id;
        }
        public int Id { get; set; }
    }
}
