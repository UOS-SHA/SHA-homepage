module.exports = (sequelize, DataTypes) => {
    const StudyWeek = sequelize.define('StudyWeek', {
      weekNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
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