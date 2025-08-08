module.exports = (sequelize, DataTypes) => {
    const StudyWeek = sequelize.define('StudyWeek', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      weekNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
        timestamps: true
    });
  

  
    return StudyWeek;
  };