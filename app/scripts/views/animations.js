define(function () {
  return function (options) {
    var buffer = [];

    function next () {
      buffer.shift();
      if ( buffer.length ) buffer[0](next)
    };

    return {
      add: function (fn) {
        buffer.push(fn);
        if ( buffer.length === 1 ) fn(next);
      },
    }
  };
});

