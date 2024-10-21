// backend/src/models/profile.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class Profile extends Model {
  public id!: number;
  public userId!: number;
  public name!: string;
  public what_to_look_for!: string[];
  public stacks!: string[];
  public work_preference!: string[];
}

Profile.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  what_to_look_for: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  stacks: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  work_preference: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Profile',
});

export default Profile;
