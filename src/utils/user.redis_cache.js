import redis from 'ioredis';
import dotenv from 'dotenv';
dotenv.config();

const redisClint = redis.createClient(process.env.REDIS_PORT);

export async function userRegisterCache(user) {
    await redisClint.setex(`${user.email}`, 300, JSON.stringify(user));
}

export async function getUserCredentials(email) {
    const user = await redisClint.get(`${email}`);
    return JSON.parse(user);
}