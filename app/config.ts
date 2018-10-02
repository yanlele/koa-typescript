import {IConfig} from './src/interface'

const config: IConfig = {
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