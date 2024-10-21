"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/models/userData.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const User_1 = __importDefault(require("./User")); // Importando o modelo do usuário
class UserData extends sequelize_1.Model {
}
UserData.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: User_1.default,
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
    data: {
        type: sequelize_1.DataTypes.TEXT, // ou DataTypes.JSON, se preferir armazenar JSON
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'UserData',
});
// Definindo relacionamento
User_1.default.hasMany(UserData, { foreignKey: 'userId' });
UserData.belongsTo(User_1.default, { foreignKey: 'userId' });
exports.default = UserData;
