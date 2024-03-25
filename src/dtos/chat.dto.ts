import { registerDecorator, ValidationArguments, ValidationOptions, IsString, IsOptional } from 'class-validator';

function IsConditionallyOptional(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isConditionallyOptional',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const relatedValue = (args.object as any)[args.constraints[0]];
          if (value === null || value === undefined) {
            return relatedValue !== null && relatedValue !== undefined; // Value can be optional if the related value is present
          }
          return true; // If the value is provided, it's always valid (further validations can be applied separately)
        },
      },
    });
  };
}

export class CreateChatDto {
  @IsConditionallyOptional('promptId', {
    message: 'Query can be optional only when promptId is provided.',
  })
  public query?: string;

  @IsConditionallyOptional('query', {
    message: 'PromptId can be optional only when question is provided.',
  })
  public promptId?: string;
  @IsOptional()
  public category?: string;
  @IsOptional()
  public prompt?: string;
}
