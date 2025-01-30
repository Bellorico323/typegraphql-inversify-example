import { injectable } from "inversify";
import type { Recipe } from "../graphql/dtos/models/Recipe";
import type { RecipeRepository } from "../repositories/recipe-repository";

@injectable()
export class RecipeService implements RecipeRepository {
  private recipes: Recipe[] = [
    {
      id: '1',
      title: 'Recipe 1',
      description: 'Recipe 1 description',
      ingredients: ['ing1', 'ing2', 'ing3']
    }
  ]

  async findById(id: string): Promise<Recipe | null> {
    const recipe = this.recipes.find((item) => item.id === id)

    if(!recipe) {
      return null
    }

    return recipe
  }

  async findAll({ skip, take }: { skip: number; take: number; }): Promise<Recipe[]> {
    return this.recipes.slice(skip, take)
  }

  async addNew(data: Recipe): Promise<Recipe> {
    this.recipes.push(data)

   return data
  }
  
  async removeById(id: string): Promise<void> {
   const itemsWithoutRecipe = this.recipes.filter((item) => item.id !== id)

   this.recipes = itemsWithoutRecipe
  }
}