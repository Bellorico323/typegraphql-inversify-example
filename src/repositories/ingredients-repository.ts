import { Ingredient } from "../graphql/dtos/models/Ingredient";

export interface IngredientsRepository {
  findById(id: string): Promise<Ingredient | null>
  findManyByRecipeId(recipeId: string): Promise<Ingredient[]>
  addNew(data: Ingredient): Promise<Ingredient>
  removeById(id: string): Promise<void>
}