const { Join, PersonalSite } = require('../models');

exports.application = async (req, res) => {

    const t = await sequelize.transaction();

    try {
        const {name, major, studentId, phone, expect, comment, sites} = req.body;
    
        const application = await Join.create({
            name,
            major, 
            studentId,
            phone,
            expect,
            comment,
        });


        if (sites && Array.isArray(sites)) {
            const siteData = sites.map(url => ({
                url,
                joinId: application.id
            }));
            await PersonalSite.bulkCreate(siteData);
        }

        await t.commit();

        res.status(201).json({message: '지원서 제출 완료'});
    } catch (err) {
        await t.rollback();
        res.status(500).json({ message: '서버 에러 발생'})
    }
    
};