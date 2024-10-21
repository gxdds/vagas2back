"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Alljobs_1 = __importDefault(require("./Alljobs"));
class FavoriteJob extends sequelize_1.Model {
}
FavoriteJob.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Nome da tabela relacionada
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    job_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Alljobs', // Nome da tabela relacionada
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'favorite_jobs',
    timestamps: false,
});
// Define a associação entre FavoriteJob e AllJobs
FavoriteJob.belongsTo(Alljobs_1.default, { foreignKey: 'job_id', as: 'AllJob' });
exports.default = FavoriteJob;
