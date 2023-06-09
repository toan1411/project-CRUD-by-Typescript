import { Table, Model,Column, DataType } from "sequelize-typescript";

@Table({
    timestamps: false,
    tableName: "employee_info",
})

export class Todos extends Model{
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    fullName!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    jobType!: string;

    @Column({
        type: DataType.NUMBER,
        allowNull: false
    })
    age!: number; 

}