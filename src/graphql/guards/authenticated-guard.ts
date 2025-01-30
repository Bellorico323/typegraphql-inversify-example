import { injectable } from "inversify";
import { AuthCheckerInterface, ResolverData } from "type-graphql";

interface ContextType {
  token: string
}

@injectable()
export class CustomAuthChecker implements AuthCheckerInterface<ContextType> {
  constructor() {}

  check({ root, args, context, info }: ResolverData<ContextType>, roles: string[]) {
   // Custom logic, e.g.:
    if(!context.token) {
      return false
    }

    return true;
  }
}