import { Field, ID, ObjectType } from "type-graphql";
import { Ingredient } from "./Ingredient";

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id: string

  @Field(type => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string
  
  @Field(type => [Ingredient], { nullable: true })
  ingredients?: Ingredient[]

  ingredientsIds: string[]
}
