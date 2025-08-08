const { Join, PersonalSite } = require('../models');


exports.login = async (req, res) => {

    try {

        const { username, password } = req.body;
        const adminId = process.env.ADMIN_ID;
        const adminPw = process.env.ADMIN_PW;

        const isAdmin = (username===adminId && password === adminPw);

        if (isAdmin) {
            res.status(200).json({ message: '로그인 성공', isAdmin: isAdmin });
        } else {
            res.status(401).json({ message: '아이디 또는 비밀번호가 틀렸습니다' });
        }

    } catch(err) {
        res.status(500).json({ message: '서버 오류' });
    }
}

exports.joinList = async (req, res) => {

    try {

        const joins = await Join.findAll({
            attributes: ['name', 'major', 'studentId', 'phone', 'expect', 'comment', 'submitTime'],
            include: [
                {
                    model: PersonalSite,
                    attributes: ['url'],
                },
            ],
        });

        res.status(200).json(joins);

    } catch(err) {
        res.status(500).json({ message: '서버 오류' });
    }
}

