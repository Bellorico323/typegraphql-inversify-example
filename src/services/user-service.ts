import { injectable } from "inversify";
import { UserRepository } from "../repositories/users-repository";
import { User } from "../graphql/dtos/models/User";
import { createHash } from "node:crypto";

@injectable()
export class UserService implements UserRepository {
  public users: User[] = []

  async createAccount(user: User): Promise<User> {
    this.users.push(user)

    return user
  }
  async signIn(email: string): Promise<string | null> {
    const user = this.users.find((item) => item.email === email)

    if(!user) {
      return null
    }
    
    //JWT logic
    const fakeToken = createHash('sha256').update(user.id).digest('hex')

    return fakeToken
  }

}