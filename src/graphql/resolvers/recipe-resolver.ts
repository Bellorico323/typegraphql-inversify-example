import { Arg, Args, Authorized, FieldResolver, ID, Mutation, Query, Resolver, Root } from "type-graphql";
import { Recipe } from "../dtos/models/Recipe";
import { inject, injectable } from "inversify";
import { RecipeRepository } from "../../repositories/recipes-repository";
import { RecipesArgs } from "../dtos/arguments/recipes-args";
import { NewRecipeInput } from "../dtos/inputs/recipe-input";
import { randomUUID } from "node:crypto";
import { TYPES } from "../../container/types";
import { IngredientsRepository } from "../../repositories/ingredients-repository";
import { Ingredient } from "../dtos/models/Ingredient";

@injectable()
@Authorized()
@Resolver(Recipe)
export class RecipeResolver {
  constructor(
    @inject(TYPES.RecipeServiceID) private recipeService: RecipeRepository,
    @inject(TYPES.IngredientServiceID) private ingredientsService: IngredientsRepository
  ) {}

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
  async addRecipe(@Arg('newRecipeData', () => NewRecipeInput) newRecipeData: NewRecipeInput) {
    const recipe =  {
      id: randomUUID(),
      title: newRecipeData.title,
      description: newRecipeData.description,
    }

    const ingredients = await Promise.all(newRecipeData.ingredients.map(async (ingredientData) => {
      return this.ingredientsService.addNew({
        id: randomUUID(),
        name: ingredientData.name,
        quantity: ingredientData.quantity,
        unity: ingredientData.unity,
        recipeId: recipe.id,
      });
    }));

    const recipeInDatabase = await this.recipeService.addNew({
      ...recipe,
      ingredientsIds: ingredients.map((item) => item.id),
    })

    return recipeInDatabase
  }

  @Mutation(returns => String)
  async removeRecipe(@Arg('id', () => String) id: string) {
    await this.recipeService.removeById(id)

    return 'Resource removed!'
  }

  @FieldResolver(() => [Ingredient])
  async ingredients(@Root() recipe: Recipe) {
    const ingredients = await this.ingredientsService.findManyByRecipeId(recipe.id)

    return ingredients
  }
}