import { Arg, Field, Mutation, ObjectType, Resolver } from "type-graphql";
import { User } from "../dtos/models/User";
import { CreateAccountInput } from "../dtos/inputs/create-account-input";
import { inject, injectable } from "inversify";
import { UserRepository } from "../../repositories/users-repository";
import { randomUUID } from "node:crypto";
import { TYPES } from "../../container/types";

@injectable()
@Resolver(User)
export class UserResolver {
  constructor(@inject(TYPES.UserServiceID) private userRepository: UserRepository) {}

  @Mutation(() => User)
  async createAccount(@Arg('data', () => CreateAccountInput) data: CreateAccountInput) {
    const user = await this.userRepository.createAccount({
      id: randomUUID(),
      name: data.name,
      email: data.email,
    })

    return user
  }

  @Mutation(() => SignInResponse)
  async singIn(@Arg('email', () => String) email: string) {
    const token = await this.userRepository.signIn(email)

    return { token }
  }
}

@ObjectType()
class SignInResponse {
  @Field(() => String, { nullable: true }) 
    token?: string
  
}