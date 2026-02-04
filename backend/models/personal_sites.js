module.exports = (sequelize, DataTypes) => {
    const PersonalSite = sequelize.define('PersonalSite', {
      id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
    });


   

    return PersonalSite;
};