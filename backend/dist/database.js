"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/database.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('vagas', 'postgres', '941298363Vi', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.default = sequelize;
