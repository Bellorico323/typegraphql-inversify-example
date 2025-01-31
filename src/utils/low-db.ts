import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import { Recipe } from '../graphql/dtos/models/Recipe'

interface DbProps {
  recipes: Recipe[],
  ingredients: string[]
}

const defaultData: DbProps = { recipes: [], ingredients: [] }

class Database {
  private db: Low<DbProps>

  constructor() {
    const adapter = new JSONFile<DbProps>('db.json')
    this.db = new Low(adapter, defaultData)
  }

  async init() {
    await this.db.read()
    this.db.data ||= defaultData
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
