﻿using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoWrapper.Wrappers;
using Domain.Contracts;
using Domain.Contracts.Repositories;
using Domain.Entities;
using Domain.ValueObjects;
using IdentifiersShared.Generator;
using IdentifiersShared.Identifiers;
using IdGen;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Application.Commands.GroupCommands.AddGroup
{
	public class AddGroupCommand : IRequest<GroupId>
	{
		[JsonConstructor]
		public AddGroupCommand(string name, string code, AppUserId ownerId, Location location)
			=> (Name, Code, OwnerId, Location)
				= (name, code, ownerId, location);
		
		[Required] public string Name { get; }

		public string Code { get; }

		public AppUserId OwnerId { get; }

		public Location Location { get; }
	}
	
	public class AddGroupCommandHandler : IRequestHandler<AddGroupCommand, GroupId>
	{
		private readonly IGroupRepository _groupRepository;
		private readonly IUserRepository _userRepository;
		private readonly IUnitOfWork _unitOfWork;

		public AddGroupCommandHandler(IGroupRepository groupRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
			=> (_groupRepository, _userRepository, _unitOfWork)
				= (groupRepository, userRepository, unitOfWork);

		public async Task<GroupId> Handle(AddGroupCommand request, CancellationToken cancellationToken)
		{
			if (!string.IsNullOrEmpty(request.Code)
				&& await _groupRepository.GroupCodeExists(request.Code).ConfigureAwait(false))
				throw new ApiProblemDetailsException($"Group code {request.Code} already exists",
					StatusCodes.Status409Conflict);

			if (!await _userRepository.ExistsWithId(request.OwnerId, cancellationToken).ConfigureAwait(false))
				throw new ApiProblemDetailsException($"ApplicationUser with id {request.OwnerId} does not exist.",
					StatusCodes.Status404NotFound);

			IdGenerator idGenerator = new(IdGeneratorType.Group);
			var groupId = new GroupId(idGenerator.CreateId());

			var group = Group.CreateGroupWithOwner(groupId,
				request.Name,
				request.Code,
				request.OwnerId,
				request.Location);
			
			await _groupRepository.AddAsync(group, cancellationToken).ConfigureAwait(false);

			try
			{
				await _unitOfWork.SaveAsync(cancellationToken).ConfigureAwait(false);
			}
			catch (DbUpdateException ex)
			{
				throw new ApiException(ex);
			}

			return group.Id;
		}
	}
}