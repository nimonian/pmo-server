import 'dotenv/config'

const name = process.env.POSTGRES_DB
const user = process.env.POSTGRES_USER
const password = process.env.POSTGRES_PASSWORD

const url = `postgres://${user}:${password}@postgres/${name}`

console.log(url)
