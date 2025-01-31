import type { Recipe } from "../graphql/dtos/models/Recipe";

export interface RecipeRepository {
  findById(id: string): Promise<Recipe | null>
  findAll({skip, take}: {skip: number, take: number}): Promise<Recipe[]>
  addNew(data: Recipe): Promise<Recipe>
  removeById(id: string): Promise<void>
}