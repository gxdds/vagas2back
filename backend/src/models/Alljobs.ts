import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database';

interface AllJobsAttributes {
  id: number;
  title: string;
  location: string;
  additional_info: string;
  link: string;
  tags: string[];
  seniority: string;  // Nova coluna para senioridade
  work_model: string; // Nova coluna para modelo de trabalho
  createdAt?: Date;
}

interface AllJobsCreationAttributes extends Optional<AllJobsAttributes, 'id'> {}

class AllJobs extends Model<AllJobsAttributes, AllJobsCreationAttributes> implements AllJobsAttributes {
  public id!: number;
  public title!: string;
  public location!: string;
  public additional_info!: string;
  public link!: string;
  public tags!: string[];
  public seniority!: string;  // Nova coluna para senioridade
  public work_model!: string; // Nova coluna para modelo de trabalho
  public readonly createdAt!: Date;
}

AllJobs.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    additional_info: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    link: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    seniority: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    work_model: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'Alljobs',
    timestamps: false, // Se não há updatedAt, podemos desativar timestamps
  }
);

export default AllJobs;
