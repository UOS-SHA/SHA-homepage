const { StudySemester, StudyCategory, StudyWeek } = require('../models');

exports.createSemester = async (req, res) => {

    try {
        const { name } = req.body;

        await StudySemester.create({ name });

        
        res.status(201).json({ message: '학기 생성 완료' });



    } catch(err) {
        res.status(500).json({ message: '학기 생성 실패', error: err.message });
    }
}

exports.createCategory = async (req, res) => {

    try {
        const { semester } = req.params;
        const { name, url } = req.body;

        const semesterEntry = await StudySemester.findOne({
            where: { name: semester }
        });

        if(!semesterEntry) {
            return res.status(404).json({
                message: `해당 학기 '${semester}'를 찾을 수 없습니다.`
            });
        }

        await StudyCategory.create({
            name,
            url,
            semesterId: semesterEntry.id
        });

        res.status(201).json({ message: '카테고리 생성 완료'});


    } catch(err) {
        res.status(500).json({ message: '카테고리 생성 실패', error: err.message});
        
    }
}

exports.createWeek = async (req, res) => {

    try {
        const { semester, category } = req.params;
        const { weekNum, title, description } = req.body;

        const semesterEntry = await StudySemester.findOne({
            where: { name: semester }
        });

        if (!semesterEntry) {
            return res.status(404).json({
                message: `해당 학기 '${semester}'를 찾을 수 없습니다.`
            });
        }

        const categoryEntry = await StudyCategory.findOne({
            where: {
                name: category,
                semesterId: semesterEntry.id
            }
        });

        if (!categoryEntry) {
            return res.status(404).json({
                message: `해당 카테고리 '${category}'를 찾을 수 없습니다.`
            });
        }

        await StudyWeek.create({
            weekNum,
            title,
            description,
            categoryId: categoryEntry.id
        });

        res.status(201).json({ message: '주차 생성 완료' })


    } catch(err) {
        res.status(500).json({ message: '주차 생성 실패', error: err.message});        
    }
}

exports.updateSemester = async (req, res) => {

    try {
        const { id, name } = req.body;

        const [updatedCount] = await StudySemester.update(
            { name },
            { where: { id } }
        );

        if (updatedCount === 0 ) {
            return res.status(404).json({ message: "수정된 항목이 없습니다" });
        }

        res.status(200).json({ message: "학기 이름이 수정되었습니다" });

    } catch(err) {
        res.status(500).json({ message: "서버 에러" });
    }
}

exports.updateCategory = async (req, res) => {

    try {
        const { id, name, url } = req.body;

        const updateFields = {};
        if (name !== undefined) updateFields.name = name;
        if (url !== undefined) updateFields.url = url;

        const [updatedCount] = await StudyCategory.update(updateFields, {
            where: { id }
        });

        if (updatedCount === 0) {
            return res.status(404).json({ message: "수정할 카테고리를 찾을 수 없습니다" });
        }

        res.status(200).json({ message: '수정 성공'});

    } catch(err) {
        res.status(500).json({ message: "서버 에러" });
    }
}

exports.updateWeek = async (req, res) => {

    try {

        const { id, weekNum, title, description } = req.body;

        const updateFields = {};

        if (weekNum !== undefined) updateFields.weekNum = weekNum;
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;


        const [updatedCount] = await StudyWeek.update(updateFields, {
            where: { id }
        });

        if (updatedCount === 0) {
            return res.status(404).json({ message: '수정할 주차를 찾을 수 없습니다'});
        }

        res.status(200).json({ message: '수정 성공' });

    } catch(err) {
        res.status(500).json({ message: "서버 에러" });
    }
}

exports.deleteSemester = async (req, res) => {

    try {
        const { id } = req.params;

        const deleted = await StudySemester.destroy({
            where: { id: id }
        });

        if (deleted) 
            res.status(200).json({ message: '삭제 완료' });
        else
            res.status(404).json({ message: '오류' });


    } catch(err) {
        res.status(500).json({ message: "서버 에러" });
    }
}

exports.deleteCategory = async (req, res) => {

    try {
        const { id } = req.params;

        const deleted = await StudyCategory.destroy({
            where: { id: id }
        });

        if (deleted) 
            res.status(200).json({ message: '삭제 완료' });
        else
            res.status(404).json({ message: '오류' });

    } catch(err) {
        res.status(500).json({ message: "서버 에러" });
    }
}

exports.deleteWeek = async (req, res) => {

    try {
        const { id } = req.params;

        const deleted = await StudyWeek.destroy({
            where: { id: id }
        });

        if (deleted) 
            res.status(200).json({ message: '삭제 완료' });
        else
            res.status(404).json({ message: '오류' });

    } catch(err) {
        res.status(500).json({ message: "서버 에러" });
    }
}
