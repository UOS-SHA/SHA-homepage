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
        },

        interests: {
            type: DataTypes.JSON,
            allowNull: false
        },

        interestEtc: {
            type: DataTypes.STRING(100),
            allowNUll: true
        },

        team: {
            type: DataTypes.ENUM('A', 'B', 'C'),
            allowNUll: false
        },

        selfIntro: {
            type: DataTypes.STRING(100),
            allowNUll: false
        },

        seminarAvailable: {
            type: DataTypes.BOOLEAN,
            allowNUll: false
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
        },
        semester: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '2026-1'
        },
        
    }, {
        timestamps: true,
        createdAt: 'submitTime',
        updatedAt: false,
    });



    return Join;
};