using FluentValidation;

namespace RestApi.Commands.GroupCommands.AddGroup
{
	public class AddGroupCommandValidator : AbstractValidator<AddGroupCommand>
	{
		public AddGroupCommandValidator()
		{
			RuleFor(x => x.Location).NotEmpty().WithMessage("Group location cannot be empty");
		}
	}
}