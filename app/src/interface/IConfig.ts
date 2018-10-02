/**
 * create by yanle
 * connect me 331393627@qq.com
 * create time 2018-10-02 22:01
 */


interface IConfig {
    redis: IRedisConfig,
    mysql: IMysqlConfig
    port: number
}

interface IMysqlConfig {
    DATABASE: string,
    USERNAME: string,
    PASSWORD: string,
    PORT: string,
    HOST: string
}

interface IRedisConfig {
    PORT: number,
    HOST: string,
    DB: number,
    TTL: number
}


export default IConfig;