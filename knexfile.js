module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: 'remotemysql.com',
            user: 'GYFOLxDmMa',
            password: 'Qb3m0DjMMp',
            database: 'GYFOLxDmMa'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds'
        },
        useNullAsDefault: true
    }
};