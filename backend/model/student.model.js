import { DataTypes } from "sequelize";

export const CreateStudentModel= async (sequelize)=>{
    const Student=sequelize.define(
        'Student'
        ,
        {
            name:{type:DataTypes.STRING}
            ,
            age:{type:DataTypes.INTEGER}
        }

    )

    return Student
}