import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';
import AllJobs from './Alljobs';

interface FavoriteJobAttributes {
  id: number;
  user_id: number;
  job_id: number;
  created_at?: Date;
}

interface FavoriteJobCreationAttributes extends Optional<FavoriteJobAttributes, 'id'> {}

class FavoriteJob extends Model<FavoriteJobAttributes, FavoriteJobCreationAttributes>
  implements FavoriteJobAttributes {
  public id!: number;
  public user_id!: number;
  public job_id!: number;
  public readonly created_at!: Date;

  // Adiciona as associações
  public readonly AllJob?: InstanceType<typeof AllJobs>;
}

FavoriteJob.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Nome da tabela relacionada
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Alljobs', // Nome da tabela relacionada
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'favorite_jobs',
    timestamps: false,
  }
);

// Define a associação entre FavoriteJob e AllJobs
FavoriteJob.belongsTo(AllJobs, { foreignKey: 'job_id', as: 'AllJob' });

export default FavoriteJob;
