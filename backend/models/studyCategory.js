module.exports = (sequelize, DataTypes) => {
    const StudyCategory = sequelize.define('StudyCategory', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    });

    return StudyCategory;
};