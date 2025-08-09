const app = require('./app');
const db = require('./models');
const ensureDatabaseExists = require('./models/db-init');

require('dotenv').config();
const PORT = process.env.PORT || 8080;



(async () => {
    try {
      await ensureDatabaseExists();

      if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
        await db.sequelize.sync({ force: true }).then(() => {
          console.log('DB가 초기화되었습니다.');
        });
      } else {
        await db.sequelize.sync();
      }
  
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`서버 ${PORT}에서 실행 중`);
      });
    } catch (err) {
      console.error('서버 시작 실패:', err);
      process.exit(1);
    }
  })();