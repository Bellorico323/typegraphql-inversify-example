import { Container } from "inversify";
import { RecipeRepository } from "../repositories/recipe-repository";
import { UserRepository } from "../repositories/users-repository";
import { RecipeResolver } from "../graphql/resolvers/recipe-resolver";
import { UserResolver } from "../graphql/resolvers/user-resolver";
import { CustomAuthChecker } from "../graphql/guards/authenticated-guard";
import { RecipeService } from "../services/recipe-service";
import { UserService } from "../services/user-service";
import { TYPES } from "./types";



const container: Container = new Container()

// Repositories
container.bind<RecipeRepository>(TYPES.RecipeServiceID).to(RecipeService)
container.bind<UserRepository>(TYPES.UserServiceID).to(UserService)

// Resolvers
container.bind<RecipeResolver>(RecipeResolver).toSelf().inSingletonScope()
container.bind<UserResolver>(UserResolver).toSelf().inSingletonScope()
container.bind<CustomAuthChecker>(CustomAuthChecker).toSelf().inSingletonScope()

export { container }