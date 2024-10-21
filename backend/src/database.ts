// backend/src/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('vagas', 'postgres', '941298363Vi', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
