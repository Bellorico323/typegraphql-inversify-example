import { Arg, Args, Authorized, ID, Mutation, Query, Resolver } from "type-graphql";
import { Recipe } from "../dtos/models/Recipe";
import { inject, injectable } from "inversify";
import { RecipeRepository } from "../../repositories/recipes-repository";
import { RecipesArgs } from "../dtos/arguments/recipes-args";
import { NewRecipeInput } from "../dtos/inputs/recipe-input";
import { randomUUID } from "node:crypto";
import { TYPES } from "../../container/types";

@injectable()
@Authorized()
@Resolver(Recipe)
export class RecipeResolver {
  constructor(@inject(TYPES.RecipeServiceID) private recipeService: RecipeRepository) {}

  @Query(returns => Recipe)
  async recipe(@Arg("id" ,() => ID) id: string) {
    const recipe = await this.recipeService.findById(id)
    if(!recipe) {
      throw new Error('Recipe not found')
    }
    return recipe
  }

  @Query(returns => [Recipe])
  recipes(@Args(() => RecipesArgs) { skip, take }: RecipesArgs) {
    return this.recipeService.findAll({skip, take})
  }

  @Mutation(returns => Recipe)
  addRecipe(@Arg('newRecipeData', () => NewRecipeInput) newRecipeData: NewRecipeInput) {
    return this.recipeService.addNew({
      id: randomUUID(),
      title: newRecipeData.title,
      description: newRecipeData.description,
      ingredients: newRecipeData.ingredients
    })
  }

  @Mutation(returns => String)
  async removeRecipe(@Arg('id', () => String) id: string) {
    await this.recipeService.removeById(id)

    return 'Resource removed!'
  }
}