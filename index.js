var chainsaw = require('chainsaw');

function builtins (saw) {
  this.tap = function (cb) {
    saw.nest(cb, this.ctx( ));
  };

  this.acquire = function (cb) {
    saw.nest(false, function ( ) {
      var next = saw.next;
      cb(this.ctx( ), next);
    });
  };

  this.fail = function (msg) {
    console.error(msg);
    process.exit(1);
  };

}

function create (input, booted) {
  var _input = input;
  return chainsaw(function init (saw) {
    this.ctx = function (_) {
      return this._input;
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

}

module.exports = create;

