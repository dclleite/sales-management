import Knex from 'knex'
import path from "path";

export default () => {
  return Knex({
    client: 'sqlite3',
    connection: {
      filename: path.join(__dirname, "../db/database.sqlite3"),
    },
    migrations: {
      directory: path.join(__dirname, "../db/migrations"),
      tableName: 'knex_migrations',
    },
    pool: {
      afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb)
    },
    useNullAsDefault: true,
   })
}