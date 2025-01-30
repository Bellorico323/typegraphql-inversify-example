import { User } from "../graphql/dtos/models/User";

export interface UserRepository {
  createAccount(user: User): Promise<User>
  signIn(email: string): Promise<string | null>
}