/**
 * @class JwtService
 */
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require('bcryptjs')

/**
 * @name JwtService
 */

class JwtService {
  /**
   * JwtService constructor
   * @param accessKey
   * @param refreshKey
   * @param accessTime
   * @param refreshTime
   */
  constructor(accessKey, refreshKey, accessTime, refreshTime) {
    this.accessKey = accessKey;
    this.refreshKey = refreshKey;
    this.accessTime = accessTime;
    this.refreshTime = refreshTime;
  }

  hashed(pass) {
    return bcrypt.hash(pass, 7)
  }

  compairHashed(pass, oldpass) {
    return bcrypt.compare(pass, oldpass)
  }

  async verifyAccess(token) {
    return jwt.verify(token, this.accessKey, {});
  }
  async verifyRefresh(token) {
    return jwt.verify(token, this.refreshKey, {});
  }

  generateTokens(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {
      expiresIn: this.accessTime,
    });
    const refreshToken = jwt.sign(payload, this.refreshKey, {
      expiresIn: this.refreshTime,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

module.exports = new JwtService(
  config.get("access_key"),
  config.get("refresh_key"),
  config.get("access_time"),
  config.get("refresh_time")
);