const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: '토큰 미발행' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: '관리자 권한이 없습니다' });
        }
    } catch (err) {
        return res.status(401).json({ message: '유효하지 않은 토큰입니다' });
    }
};