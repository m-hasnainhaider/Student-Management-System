import { Sequelize } from "sequelize";
import {CreateStudentModel} from "../model/student.model.js"
const sequelize = new Sequelize('test', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
});
let StudentModel=null;
const Connection = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database Connected");
        ///this is used to automatically create table in the db
        StudentModel=await CreateStudentModel(sequelize)
        await sequelize.sync();
        ///
    } 
    catch (error) {
        console.log(error);
    }

}

export {
    Connection,
    StudentModel //i can use this model any where
}