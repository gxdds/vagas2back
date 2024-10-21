// backend/src/models/userData.ts
import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import User from './User'; // Importando o modelo do usuário

interface UserDataAttributes {
  id: number;
  userId: number;
  data: string; // Ou JSON se você preferir armazenar os dados como objeto JSON
}

interface UserDataCreationAttributes extends Optional<UserDataAttributes, 'id'> {}

class UserData extends Model<UserDataAttributes, UserDataCreationAttributes> implements UserDataAttributes {
  public id!: number;
  public userId!: number;
  public data!: string;
}

UserData.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  data: {
    type: DataTypes.TEXT, // ou DataTypes.JSON, se preferir armazenar JSON
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'UserData',
});

// Definindo relacionamento
User.hasMany(UserData, { foreignKey: 'userId' });
UserData.belongsTo(User, { foreignKey: 'userId' });

export default UserData;
