var chainsaw = require('chainsaw');

function builtins (saw) {
  this.tap = function (cb) {
    saw.nest(cb, this.ctx( ));
  };

  this.acquire = function (cb) {
    var ctx = this.ctx( );
    saw.nest(false, function ( ) {
      var next = saw.next;
      cb(ctx, next);
    });
  };

  this.fail = function (msg) {
    console.error(msg);
    process.exit(1);
  };

}

function create (input, booted) {
  var _input = input || { };
  var api = chainsaw(function init (saw) {
    function orig ( ) {
      return _input;
    };
    this.ctx = function (_) {
      if (_) {
        _input = _;
      }
      return orig( );
    };
    builtins.call(this, saw);

    if (input && input.init && input.init.call) {
      input.init.call(this, saw);
    }

    this.boot = function (cb) {
      if (booted && booted.call) {
        booted(this.ctx( ));
      }
      if (cb && cb.call) {
        cb(this.ctx( ));
      }
    };
  });
  return api;

}

module.exports = create;

