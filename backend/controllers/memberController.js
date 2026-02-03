const { Member } = require('../models');

exports.getMembers = async (req, res) => {
    try {
        const members = await Member.findAll({
            attributes: ['name', 'majorAndId', 'interests', 'selfIntro']
        });

        res.status(200).json(members);

    } catch (err) {
        console.error('멤버 조회 에러: ', err);
        res.status(500).json({ message: '서버 오류' });
    }
};