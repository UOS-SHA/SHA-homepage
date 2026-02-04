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

        const member = await Member.findByPk(id);
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
        attributes: [
          'name',
          'major',
          'studentId',
          'interests',
          'interestEtc',
          'team',
          'selfIntro',
          'seminarAvailable',
          'phone',
          'expect',
          'comment',
          'submitTime'
        ], 
        include: [
            {
                model: PersonalSite,
                attributes: ['url']
            }
        ],
        order: [['submitTime', 'DESC']]
      });
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Recruit List');
  
      worksheet.addRow([`총 지원자 수: ${joins.length}명`]);
      worksheet.addRow([]);

      worksheet.columns = [
        { header: '이름', key: 'name', width: 15 },
        { header: '학과', key: 'major', width: 15 },
        { header: '학번', key: 'studentId', width: 15 },
        { header: '관심분야', key: 'interests', width: 20 },
        { header: '기타 관심분야', key: 'interestEtc', width: 20 },
        { header: '팀 선택', key: 'team', width: 15 },
        { header: '한줄 소개', key: 'selfIntro', width: 30 },
        { header: '세미나 참여 가능', key: 'seminarAvailable', width: 15 },
        { header: '전화번호', key: 'phone', width: 15 },
        { header: '기대하는 바', key: 'expect', width: 30 },
        { header: '각오 한마디', key: 'comment', width: 20 },
        { header: '개인 사이트', key: 'personalSites', width: 40 },
        { header: '제출 시간', key: 'submitTime', width: 20 }
      ];
  
      worksheet.getRow(3).font = { bold: true };

      worksheet.getRow(3).eachCell(cell => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFEFEFEF' }
        };
      });

      joins.forEach(join => {

        const sites = join.PersonalSites
          ? join.PersonalSites.map(site => site.url).join('\n')
          : '';
  
        const row = worksheet.addRow({
          ...join.toJSON(),
          personalSites: sites,
          submitTime: new Date(join.submitTime).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })
        });

        row.getCell('personalSites').alignment = { wrapText: true };
        row.getCell('selfIntro').alignment = { wrapText: true };
        row.getCell('expect').alignment = { wrapText: true };
      });
  
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=recruit_list.xlsx'
      );
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      await workbook.xlsx.write(res);
      res.end();
  
    } catch (err) {
      console.error('엑셀 다운로드 에러:', err);
      res.status(500).json({ message: '엑셀 다운로드 실패' });
    }
  };
  
