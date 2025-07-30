module.exports = (sequelize, DataTypes)=> {
    const Join = sequelize.define("Join", {
        id: {
            type: DataTypes.INTEGER(10),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        major: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        studentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expect: {
            type: DataTypes.TEXT
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        timestamps: true
    });



    return Join;
};