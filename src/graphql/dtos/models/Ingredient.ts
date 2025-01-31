import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Ingredient {
  @Field(() => ID)
  id: string

  @Field(() => String)
  name: string

  @Field(() => Number)
  quantity: number

  @Field(() => String)
  unity: string

  @Field(() => ID)
  recipeId: string
}
