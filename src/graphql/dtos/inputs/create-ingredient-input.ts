import { MaxLength, Min } from "class-validator";
import { InputType, Field } from "type-graphql";

@InputType()
export class NewIngredientInput {
    @Field(() => String)
    @MaxLength(30)
    name: string
  
    @Field(() => Number)
    @Min(1)
    quantity: number
  
    @Field(() => String)
    unity: string
  
    @Field(() => String, { nullable: true })
    recipeId?: string
}