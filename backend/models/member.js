module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        name: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        majorAndId: {
            type: DataTypes.STRING(20),
            allowNull: false
        },

        interests: {
            type: DataTypes.STRING(100),
            allowNull: false
        },

        selfIntro: {
            type: DataTypes.STRING(100),
            allowNUll: false
        },

    });

    return Member;
};