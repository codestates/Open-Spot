const models = require('./../models');

module.exports = {
  getAllMarkers: async (req, res) => {
    const result = await models.Marker.findAll({
      raw: true
    }).catch(err => {
      return res.status(500).json({ code: 500, error: err });
    });

    res.status(200).json({ code: 200, markers: result });
  }
};
