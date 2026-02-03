const ExcelJS = require('exceljs');
const { Join, PersonalSite, Member } = require('../models');
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
            attributes: ['id', 'name', 'major', 'studentId', 'interests', 'interestEtc', 'team', 'selfIntro', 'seminarAvailable', 'phone', 'expect', 'comment', 'submitTime'],
            include: [
                {
                    model: PersonalSite,
                    as: 'personalSite',
                    attributes: ['url'],
                    required: false
                },
            ],
        });

        const formattedJoins = joins.map(join => {
            const data = join.toJSON();

            return {
                ...data,
                submitTime: new Date(data.submitTime).toLocaleString('ko-KR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };
        });

        res.status(200).json(formattedJoins);

    } catch(err) {
        console.error("에러: ", err);
        res.status(500).json({ message: '서버 오류' });
    }
}

exports.members = async (req, res) => {
    try {
        const { name, majorAndId, interests, selfIntro } = req.body;

        if (!name || !majorAndId || !interests || !selfIntro) {
            return res.status(400).json({ message: '필수 값 누락' });
        }

        const member = await Member.create({
            name, majorAndId, interests, selfIntro
        });

        res.status(201).json(member);

    } catch (err) {
        console.error('멤버 추가 에러: ', err);
        res.status(500).json({ message: '서버 오류' });
    }

}

exports.updateMember = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, majorAndId, interests, selfIntro } = req.body;

        const member = await Member.findByPk(id);
        if (!member) {
            return res.status(404).json({ message: '멤버를 찾을 수 없습니다' });
        }

        if (name !== undefined) member.name = name;
        if (majorAndId !== undefined) member.majorAndId = majorAndId;
        if (interests !== undefined) member.interests = interests;
        if (selfIntro !== undefined) member.selfIntro = selfIntro;

        await member.save();

        res.status(200).json(member);

    } catch (err) {
        console.error('멤버 수정 에러: ', err);
        res.status(500).json({ message: '서버 오류' });
    }
};

exports.deleteMember = async(req, res) => {
    try {
        const { id } = req.params;

        const memer = await Member.findByPk(id);
        if (!member) {
            return res.status(404).json({ message: '멤버를 찾을 수 없습니다' });
        }

        await member.destroy();

        res.status(200).json({ message: '멤버 삭제 완료' });

    } catch (err) {
        console.error('멤버 삭제 에러: ', err);
        res.status(500).json({ message: '멤버 삭제 오류' });
    }
};

exports.downloadJoin = async (req, res) => {
    try {
        const joins = await Join.findAll({
            order: [['submitTime', 'ASC']]
        });
    }
}
