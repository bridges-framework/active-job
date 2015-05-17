'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fivebeans = require('fivebeans');

var _fivebeans2 = _interopRequireDefault(_fivebeans);

var HOST = process.env.BEANSTALKD_HOST || '127.0.0.1';
var PORT = process.env.BEANSTALKD_PORT || 22122;

var Beanstalkd = (function () {
  function Beanstalkd() {
    _classCallCheck(this, Beanstalkd);
  }

  _createClass(Beanstalkd, [{
    key: 'enqueue',
    value: function enqueue(queue, params) {
      return new Promise(function (resolve, reject) {
        // send job to beanstalkd
        var client = new _fivebeans2['default'].client(HOST, PORT);

        client.on('connect', function () {
          var payload = JSON.stringify({
            type: queue, payload: params
          });
          client.put(1, 0, 600, payload, function (err, jobid) {
            if (err) {
              reject(err);
            } else {
              resolve(jobid);
            }
            client.quit();
          });
        });
        client.on('error', function (error) {
          reject(error);
          client.quit();
        });
        client.connect();
      });
    }
  }]);

  return Beanstalkd;
})();

var Job = (function () {
  function Job() {
    _classCallCheck(this, Job);
  }

  _createClass(Job, [{
    key: 'type',
    get: function () {
      return 'default';
    }
  }, {
    key: 'work',
    value: function work(params, callback) {
      this.perform(params, callback);
    }
  }], [{
    key: 'performNow',
    value: function performNow(params, callback) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var job = new _this();
        if (callback) {
          job.perform(params, callback);
        } else {
          job.perform(params, function (response) {
            if (response === 'success') {
              resolve();
            } else {
              reject(response);
            }
          });
        }
      });
    }
  }, {
    key: 'performLater',
    value: function performLater(params) {
      var job = new this();
      return new Beanstalkd().enqueue(job.type, params);
    }
  }]);

  return Job;
})();

exports['default'] = Job;
module.exports = exports['default'];