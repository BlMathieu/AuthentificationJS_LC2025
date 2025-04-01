import { Sequelize } from 'sequelize';
import 'dotenv/config';
const dbName = process.env.DATABASE_NAME || '';
const dbUser = process.env.DATABASE_USER || '';
const dbPassword = process.env.DATABASE_PASSWORD || '';
const dbUrl = process.env.DATABASE_URL || '';
const client = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbUrl,
  dialect: 'mariadb',
});
export default client;
