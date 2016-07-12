var util = require('./util');
var User = null;
module.exports = function (config) {

  User = function (creds) {
    for (var key in creds) {
      if (creds.hasOwnProperty(key)) this[key] = creds[key];
    }
  };

  /**
   * Authenticate a new user.
   * @returns {Request}
   */
  User.prototype.authenticate = function (form) {
    form = form || '/user/login';
    return util.request('post', config.formio + form + '/submission', {
      data: this
    }).then(function (res) {
      this.token = res.headers['x-jwt-token'];
    }.bind(this));
  };

  return User;
};