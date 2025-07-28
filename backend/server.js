const app = require('./app');

// const dotenv = require('dotenv');
// dotenv.config();

const PORT = process.env.PORT || 3000;





app.listen(PORT, () => {
    console.log(`서버 ${PORT} 에서 가동중...`);
});