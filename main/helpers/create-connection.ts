import Knex from 'knex'
import path from "path";
import isDev from 'electron-is-dev'

export default () => {
  return Knex({
    client: 'sqlite3',
    connection: {
      filename: isDev ? path.join(__dirname, "../db/database.sqlite3") : path.join(process.resourcesPath, "db"),
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