import { MaxLength, Length, ArrayMaxSize } from "class-validator";
import { InputType, Field } from "type-graphql";
import { NewIngredientInput } from "./create-ingredient-input";

@InputType()
export class NewRecipeInput {
  @Field(() => String)
  @MaxLength(30)
  title: string;

  @Field(() => String, { nullable: true })
  @Length(30, 255)
  description?: string;

  @Field(() => [NewIngredientInput]) // Adicionamos os ingredientes na entrada
  ingredients: NewIngredientInput[];
}