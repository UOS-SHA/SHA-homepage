const { StudySemester, StudyCategory, StudyWeek } = require('../models');

exports.getSemester = async (req, res) => {
    
    try {

        const semesterData = await StudySemester.findAll({
            attributes: ['id', 'name'],
        })

        return res.json(semesterData);


    } catch (err) {
        console.error("에러: ", err);
        res.status(500).json({ message: '서버 에러 발생'});
    }
};

exports.getCategory = async (req, res) => {

    const { semester } = req.params;


    try {
        const semesterInstance = await StudySemester.findOne({
            where: { name: semester },
        });

        if (!semesterInstance) {
            return res.status(404).json({message: '해당 학기를 찾을 수 없습니다.'});
        }

        const categoryData = await StudyCategory.findAll({
            where: { semesterId: semesterInstance.id},
            attributes: ['id', 'name'],
        });

        return res.json(categoryData);

        

    } catch (err) {
        console.error("에러: ", err);
        res.status(500).json({ message: '서버 에러 발생'});
    }
};

exports.getWeek = async (req, res) => {

    const { semester, category } = req.params;

    try {

        const semesterInstance = await StudySemester.findOne({
            where: { name: semester },
        });
        if (!semesterInstance)
            return res.status(404).json({ message: '해당 학기를 찾을 수 없습니다.'});

        const categoryInstance = await StudyCategory.findOne({
            where: { 
                semesterId: semesterInstance.id,
                name: category
             },
        });
        if (!categoryInstance) 
            return res.status(404).json({ message: '해당 카테고리를 찾을 수 없습니다.'});

        const weekData = await StudyWeek.findAll({
            where: {
                categoryId: categoryInstance.id
            },
            attributes: ['weekNum', 'title', 'description'],
            include: [
                {
                    model: StudyCategory,
                    attributes: ['name']
                }
            ]
        });

        return res.json(weekData);

    } catch (err) {
        console.error('에러: ', err);  // 나중에 지울거
        res.status(500).json({ message: '서버 에러 발생'});
    }
};

