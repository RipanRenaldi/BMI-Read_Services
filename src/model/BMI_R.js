import dotenv from "dotenv";
import db from "../../config/db.js";
import { DataTypes } from 'sequelize';
dotenv.config();
const BMI_R = db.define('bmi_r', {
    id: {
        type: DataTypes.STRING,
        primaryKey:true,
        defaultValue: `BMI-${+new Date()}`
    },
    tinggi_badan: {
        type: DataTypes.INTEGER
    },
    berat_badan: {
        type: DataTypes.INTEGER
    },
    bmi: {
        type: DataTypes.FLOAT
    },
    userId: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true,
    timestamps: false
})

export default BMI_R;
