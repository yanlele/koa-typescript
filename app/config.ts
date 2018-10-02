interface Config {
    redis: RedisConfig,
    mysql: MysqlConfig
    port: number
}

interface MysqlConfig {
    DATABASE: string,
    USERNAME: string,
    PASSWORD: string,
    PORT: string,
    HOST: string
}

interface RedisConfig {
    PORT: number,
    HOST: string,
    DB: number,
    TTL: number
}

const config: Config = {
    redis: {
        PORT: 6379,
        HOST: '127.0.0.1',
        DB: 1,
        TTL: 12 * 60 * 60 * 1000
    },
    mysql: {
        DATABASE: '003_mmall_ts',
        USERNAME: 'yanle',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: '127.0.0.1'
    },
    port: 3000
};

export default config;