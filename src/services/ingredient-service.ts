import { injectable } from "inversify";
import { IngredientsRepository } from "../repositories/ingredients-repository";
import { NewIngredientInput } from "../graphql/dtos/inputs/create-ingredient-input";
import { Ingredient } from "../graphql/dtos/models/Ingredient";
import { db } from "../utils/low-db";

@injectable()
export class IngredientService implements IngredientsRepository {
  async findById(id: string): Promise<Ingredient | null> {
    const ingredient = db.data.ingredients.find((item) => item.id === id)

    if(!ingredient) {
      return null
    }

    return ingredient
  }

  async addNew(data: Ingredient): Promise<Ingredient> {
    db.data.ingredients.push(data)
    await db.write()

    return data
  }

  async removeById(id: string): Promise<void> {
    const itemsWithoutRecipe = db.data.ingredients.filter((item) => item.id !== id)
    db.data.ingredients = [...itemsWithoutRecipe]
    await db.write()
  }
}