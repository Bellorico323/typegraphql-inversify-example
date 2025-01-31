import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Recipe } from '../graphql/dtos/models/Recipe'
import { Ingredient } from '../graphql/dtos/models/Ingredient'

interface DbProps {
  recipes: Recipe[],
  ingredients: Ingredient[]
}

const defaultData: DbProps = { recipes: [], ingredients: [] }

class Database {
  private db: Low<DbProps>

  constructor() {
    const adapter = new JSONFile<DbProps>('db.json')
    this.db = new Low(adapter, defaultData)
  }

  async init() {
    await this.db.read() // Ler os dados atuais do JSON
  
    // Se o banco ainda não foi inicializado, definir como os dados padrão
    if (!this.db.data) {
      this.db.data = defaultData
    } else {
      // Adicionar apenas chaves novas, sem apagar as antigas
      for (const key in defaultData) {
        if (!(key in this.db.data)) {
          (this.db.data as any)[key] = (defaultData as any)[key]
        }
      }
    }
  
    // Escrever os dados apenas se houve alteração
    await this.db.write()
  }

  get instance() {
    return this.db
  }
}

const _db = new Database()

_db.init().catch(console.error)

const db = _db.instance

export { db }
