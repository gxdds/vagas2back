"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
class AllJobs extends sequelize_1.Model {
}
AllJobs.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    location: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    additional_info: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    link: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    tags: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        allowNull: false,
    },
    seniority: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    work_model: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.default,
    tableName: 'Alljobs',
    timestamps: false, // Se não há updatedAt, podemos desativar timestamps
});
exports.default = AllJobs;
