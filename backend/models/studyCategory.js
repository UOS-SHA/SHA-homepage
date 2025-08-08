module.exports = (sequelize, DataTypes) => {
    const StudyCategory = sequelize.define('StudyCategory', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        unique: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
        },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    }, {
      timestamps: true
  });

    return StudyCategory;
};