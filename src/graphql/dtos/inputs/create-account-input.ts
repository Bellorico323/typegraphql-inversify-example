import { Field, InputType } from "type-graphql";

@InputType()
export class CreateAccountInput {
  @Field(() => String)
  name: string

  @Field(() => String)
  email: string
}