module.exports = (sequelize, DataTypes) => {
    const StudySemester = sequelize.define('StudySemester', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
      },
    });

    return StudySemester;
};