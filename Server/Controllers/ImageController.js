const models = require('./../models');

module.exports = {
  uploadImage: async (req, res) => {
    // 마커 테이블에 imageName
    const createResult = await models.Images.create({
      fileName: req.file.filename,
      fileAddress: req.file.path
    });

    res.status(200).json({ fileName: createResult.dataValues.fileName });
  }
};

// const util = {
//   success: (status, message, data) => {
//     return {
//       status: status,
//       success: true,
//       message: message,
//       data: data
//     };
//   },
//   fail: (status, message) => {
//     return {
//       status: status,
//       success: false,
//       message: message
//     };
//   }
// };

// module.exports = {
//   uploadStoreImage: async (req, res) => {
//     const image = req.file.path;
//     console.log(req.file);
//     if (image === undefined) {
//       return res.status(400).send(util.fail(400, '이미지가 존재하지 않습니다.'));
//     }
//     // 요청 성공은 했으나, 이걸 이제 DB에 넣어줘야 한다.
//     // 업로드에 성공은 했으니

//     res.status(200).send(util.success(200, '요청 성공   ', image));
//   },
//   uploadStoresImage: async (req, res) => {
//     const image = req.files;
//     const path = image.map(img => img.path);
//     if (image === undefined) {
//       return res.status(400).send(util.fail(400), '이미지가 존재하지 않습니다.');
//     }
//     res.status(200).send(util.success(200, '요청 성공   ', path));
//   }
// };

// req.file 속성들

// fieldname  폼에 정의된 필드 명
// originalname  사용자가 업로드한 파일 명
// encoding   파일의 엔코딩 타입
// mimetype   파일의 Mime 타입
// size   파일의 바이트(byte) 사이즈
// destination  파일이 저장된 폴더
// filename   destination 에 저장된 파일 명
// path   업로드된 파일의 전체 경로
// buffer   전체 파일의 Buffer
