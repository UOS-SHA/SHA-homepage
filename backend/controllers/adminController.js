const { Join, PersonalSite } = require('../models');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;
        const adminId = process.env.ADMIN_ID;
        const adminPw = process.env.ADMIN_PW;

        const isAdmin = (username===adminId && password === adminPw);

        if (isAdmin) {
            const token = jwt.sign(
                { isAdmin: true },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ message: '로그인 성공', isAdmin: isAdmin, token: token }, token);
        } else {
            res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다' });
        }

    } catch(err) {
        console.error("에러: ", err);
        res.status(500).json({ message: '서버 오류' });
    }
}

exports.joinList = async (req, res) => {

    try {

        const joins = await Join.findAll({
            attributes: ['id', 'name', 'major', 'studentId', 'phone', 'expect', 'comment', 'submitTime'],
            include: [
                {
                    model: PersonalSite,
                    attributes: ['url'],
                },
            ],
        });

        res.status(200).json(joins);

    } catch(err) {
        console.error("에러: ", err);
        res.status(500).json({ message: '서버 오류' });
    }
}

