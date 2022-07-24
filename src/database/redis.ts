import { createClient } from 'redis';
import { Config } from 'src/config';

const redisInstance = createClient({
    url: Config.REDIS_URL
});

export default redisInstance;