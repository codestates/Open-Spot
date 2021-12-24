const marker = require('../models/marker');
const models = require('./../models');
const { verifyToken } = require('./HashFunctions');

module.exports = {
  getAllMarkers: async (req, res) => {
    const result = await models.Marker.findAll({
      raw: true
    }).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    res.status(200).json({ code: 200, markers: result });
  },
  addMarker: async (req, res) => {
    // 토큰이 없는 경우
    if (!req.cookies || !req.cookies.accessToken) {
      return res.status(401).json({ code: 401, error: 'unauthorized' });
    }

    const token = req.cookies.accessToken;
    // 토큰의 유효성 검사
    const decoded = await verifyToken(token, process.env.ACCESS_SECRET)
      .catch(err => {
        console.log(err);
        return res.status(401).json({ code: 401, message: 'unauthorized' });
      });

    const { companyNumber, storeName, address, callNum, tagName, description, latitude, longitude, parking, booking, fileName } = req.body;

    const [newElement, created] = await models.Marker.findOrCreate({
      where: { id: companyNumber },
      defaults: {
        id: companyNumber,
        userId: decoded.id,
        storeName: storeName,
        address: address,
        callNum: callNum,
        tagName: tagName,
        description: description,
        latitude: latitude,
        longitude: longitude,
        parking: parking,
        booking: booking,
        fileName: fileName
      },
      raw: true
    })
      .catch(err => {
        return res.status(500).json({ code: 500, error: err });
      });

    if (created) {
      res.status(201).json({ code: 201, message: 'created' });
    } else {
      res.status(409).json({ code: 409, error: 'marker already exists' });
    }
  }
};
