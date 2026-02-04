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
        unique: false
        },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
        unique: false
      },
    }, {
      timestamps: true
  });

    return StudyCategory;
};