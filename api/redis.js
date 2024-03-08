const redis = require("redis");
// const rejson = require('redis-rejson');
const { promisify } = require('util')

// rejson(redis)

async function getClient() {
  try {
    let host = 'localhost'
    let port = 6379

      const client = redis.createClient({
          host,
          port,
          max_attempts: 3,
          retry_strategy: false,
          connect_timeout: 10000,
          enable_offline_queue: true
      });

      client.on("error", function (err) {
          console.log("Redis Error ", JSON.stringify(err));
      })

      return client
  } catch (error) {
      return null
  }
}

async function create(value) {
  const client = await getClient()
  await client.connect()

  let response = await client.json.SET('usuario:' + value.id, '.', value)

  client.quit()

  return response
}

async function get(id) {
  const client = await getClient()
  await client.connect()
  let response = await client.json.GET('usuario:'+id)

  client.quit()
  return response
}

module.exports = {
  create,
  get
}