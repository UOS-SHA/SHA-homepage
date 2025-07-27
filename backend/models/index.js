const Sequelize = require('sequelize');
const process = require('process');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Join = require('./join')(sequelize, Sequelize);
db.PersonalSite = require('./personal_sites')(sequelize, Sequelize);
db.StudySemester = require('./studySemester')(sequelize, Sequelize);
db.StudyCategory = require('./studyCategory')(sequelize, Sequelize);
db.StudyWeek = require('./studyWeek')(sequelize, Sequelize);


db.Join.hasMany(db.PersonalSite, { foreignKey: 'joinId', sourceKey: 'id'});
db.PersonalSite.belongsTo(db.Join, { foreignKey: 'joinId', targetKey: 'id'});

db.StudySemester.hasMany(db.StudyCategory, { foreignKey: 'semesterId', sourceKey: 'id'});
db.StudyCategory.belongsTo(db.StudySemester, { foreignKey: 'semesterId', targetKey: 'id'});

db.StudyCategory.hasMany(db.StudyWeek, { foreignKey: 'categoryId', sourceKey: 'id'});
db.StudyWeek.belongsTo(db.StudyCategory, { foreignKey: 'categoryId', targetKey: 'id'});



module.exports = db;
