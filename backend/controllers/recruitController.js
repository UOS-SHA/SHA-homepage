const { Join, PersonalSite } = require('../models');

exports.application = async (req, res) => {


    try {

        console.log('📌 프론트에서 받은 데이터:', req.body);
        const {name, major, studentId, interests, interestEtc, team, selfIntro, seminarAvailable, phone, expect, comment, sites} = req.body;
    
        const application = await Join.create({
            name,
            major, 
            studentId,
            interests,
            interestEtc,
            team,
            selfIntro,
            seminarAvailable,
            phone,
            expect,
            comment,
        }, {logging: console.log});

        console.log('✅ 생성된 ID:', application.id);

        if (sites && Array.isArray(sites)) {
            const siteData = sites.map(url => ({
                url,
                joinId: application.id
            }));
            await PersonalSite.bulkCreate(siteData);
        }


        res.status(201).json({message: '지원서 제출 완료'});
    } catch (err) {
        console.error('에러: ', err);
        res.status(500).json({ message: '서버 에러 발생'})
    }
    
};