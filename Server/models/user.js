'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // static associate(db) {
    //   db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    // }
    // ---------------------------------------------------------------------------------
    // static associate(db) {
    //   db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
    // }
    // 2번째 인자는 별칭일 수 있다. 확실한 건 optional하다.
    static associate (models) {
      // define association here
      models.User.hasMany(models.Marker);
      models.User.hasMany(models.UsersMarkers);
    }
  };
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    role: DataTypes.STRING,
    oauthLogin: DataTypes.BOOLEAN,
    saltedPassword: DataTypes.STRING,
    salt: DataTypes.STRING,
    oauthCI: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User'
  });
  return User;
};
