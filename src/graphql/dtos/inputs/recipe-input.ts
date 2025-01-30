import { MaxLength, Length, ArrayMaxSize } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class NewRecipeInput {
  @Field(() => String)
  @MaxLength(30)
  title: string;

  @Field(() => String, { nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(type => [String])
  @ArrayMaxSize(30)
  ingredients: string[];
}