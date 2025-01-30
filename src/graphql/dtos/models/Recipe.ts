import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Recipe {
  @Field(type => ID)
  id: string

  @Field(type => String)
  title: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(type => [String])
  ingredients: string[]
}
