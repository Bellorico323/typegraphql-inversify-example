import { injectable } from "inversify";
import type { Recipe } from "../graphql/dtos/models/Recipe";
import type { RecipeRepository } from "../repositories/recipes-repository";
import { db } from "../utils/low-db";

@injectable()
export class RecipeService implements RecipeRepository {
  async findById(id: string): Promise<Recipe | null> {
    const recipe = db.data.recipes.find((item) => item.id === id)

    if(!recipe) {
      return null
    }

    return recipe
  }

  async findAll({ skip, take }: { skip: number; take: number; }): Promise<Recipe[]> {
    return db.data.recipes.slice((skip - 1), take  - 1)
  }

  async addNew(data: Recipe): Promise<Recipe> {
    db.data.recipes.push(data)
    await db.write()

   return data
  }

  async save(data: Recipe): Promise<Recipe> {
    const recipeIndex = db.data.recipes.findIndex((item) => item.id === data.id)

    db.data.recipes[recipeIndex] = data
    await db.write()

    return db.data.recipes[recipeIndex]
  }
  
  async removeById(id: string): Promise<void> {
   const itemsWithoutRecipe = db.data.recipes.filter((item) => item.id !== id)
   db.data.recipes = [...itemsWithoutRecipe]
   await db.write()

  }
}