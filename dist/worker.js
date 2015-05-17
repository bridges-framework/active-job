'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _fivebeans = require('fivebeans');

var _fivebeans2 = _interopRequireDefault(_fivebeans);

var HOST = process.env.BEANSTALKD_HOST || '127.0.0.1';
var PORT = process.env.BEANSTALKD_PORT || 22122;

var Worker = (function () {
  function Worker(jobClass) {
    _classCallCheck(this, Worker);

    this.jobClass = jobClass;
  }

  _createClass(Worker, [{
    key: 'start',
    value: function start() {
      var job = new this.jobClass();
      var handlers = {};
      job.work = job.perform;
      handlers[job.type] = job;
      var worker = new _fivebeans2['default'].worker({
        host: HOST,
        port: PORT,
        id: _uuid2['default'].v4(),
        handlers: handlers
      });
      worker.on('started', function (message) {
        console.log('worker started');
      });
      worker.start([job.type]);
    }
  }]);

  return Worker;
})();

exports['default'] = Worker;
module.exports = exports['default'];