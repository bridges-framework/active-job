'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _job = require('./job');

var _job2 = _interopRequireDefault(_job);

var _worker = require('./worker');

var _worker2 = _interopRequireDefault(_worker);

exports['default'] = {
  Base: _job2['default'],
  Worker: _worker2['default']
};
module.exports = exports['default'];