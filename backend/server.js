const app = require('./app');
const db = require('./models');
const ensureDatabaseExists = require('./models/db-init');

require('dotenv').config();
const PORT = process.env.PORT || 3000;



(async () => {
    try {
      await ensureDatabaseExists();
      await db.sequelize.sync(); 
  
      app.listen(PORT, () => {
        console.log(`서버 ${PORT}에서 실행 중`);
      });
    } catch (err) {
      console.error('서버 시작 실패:', err);
      process.exit(1);
    }
  })();