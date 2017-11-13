/*
 * Created by Zubin on 2017-11-03 12:00:10
 */

import * as Redis from 'ioredis';

import { appLog } from './logger';
import config from '../config';

/**
 * redis操作类
 */
class RedisHelper extends Redis {
  static db: RedisHelper;

  /**
   * 初始化redis
   */
  static init() {

    if (!RedisHelper.db) {
      let server;
      config.redis.retryStrategy = (times) => {
        if (times <= 5) {
          appLog.info(`重连次数${times}`);
          return times;
        }
        if (!server) return 0;
        server.disconnect();
        appLog.info('redis将在10分钟之后重新尝试建立连接');
        setTimeout(() => {
          appLog.info('redis正在尝试重新建立连接');
          server = new RedisHelper(config.redis);
        }, 1000 * 60 * 10);

        return 240;
      };

      server = new RedisHelper(config.redis);
      server.on('connect', () => {
        console.info('redis正在连接中...');
      });

      server.on('error', (err) => {
        console.error(`redis连接错误[error]:${err.toString()}`);
      });

      server.on('ready', () => {
        console.info('redis连接已就绪...');
      });

      server.on('close', () => {
        console.info('redis连接已关闭...');
      });

      server.on('reconnecting', () => {
        console.info('redis正在尝试重连...');
      });

      server.on('end', () => {
        console.info('redis连接已经释放');
      });

      RedisHelper.db = server;
    }
    return RedisHelper.db;
  }


  constructor(options) {
    super(options);
  }

  /**
   * 获取json数据
   * 
   * @param {any} key 
   * @returns 
   * @memberof RedisHelper
   */
  async getJsonData(key) {
    let data = null;
    try {
      data = await this.get(key);
      data = JSON.parse(data);
    } catch (error) {
      appLog.error(`获取缓存错误：${error}`);
      // 非必要信息，获取异常忽略就好
      data = null;
    }
    return data;
  }
}

export const redis = RedisHelper.init();

export default RedisHelper;
