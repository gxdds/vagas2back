// backend/src/database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('vagas', 'postgres', 'senha123', {
  host: 'localhost',
  dialect: 'postgres',
});

export default sequelize;
