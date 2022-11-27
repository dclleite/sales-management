// Update with your config settings.

module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './database.sqlite3',
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
  useNullAsDefault: true,
  pool: {
    afterCreate: (conn, cb) => conn.run('PRAGMA foreign_keys = ON', cb),
  },
}
