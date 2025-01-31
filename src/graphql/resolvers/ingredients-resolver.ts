import { Arg, Mutation, Resolver } from "type-graphql";
import { Ingredient } from "../dtos/models/Ingredient";
import { inject, injectable } from "inversify";
import { NewIngredientInput } from "../dtos/inputs/create-ingredient-input";
import { IngredientsRepository } from "../../repositories/ingredients-repository";
import { TYPES } from "../../container/types";
import { randomUUID } from "node:crypto";

@injectable()
@Resolver(Ingredient)
export class IngredientsResolver {
  constructor(@inject(TYPES.IngredientServiceID) private ingredientsRepository: IngredientsRepository) {}

  @Mutation(() => Ingredient)
  async addNewIngredient(@Arg('data', () => NewIngredientInput) data: NewIngredientInput) {
    const ingredient = await this.ingredientsRepository.addNew({
      id: randomUUID(),
      name: data.name,
      quantity: data.quantity,
      unity: data.unity,
      recipeId: data.recipeId
    })

    return ingredient
  }

  @Mutation(returns => String)
  async removeIngredient(@Arg('id', () => String) id: string) {
    await this.ingredientsRepository.removeById(id)

    return 'Resource removed!'
  }
}