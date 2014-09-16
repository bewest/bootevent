
# bootevent

Quickly describe async tasks needed to complete bootup.
Fluent js interface to `acquire` resources in lockstep before
considering a process to be `booted`.

## install

`npm install git://github.com/bewest/bootevent.git`

### `bootevent (ctx, booted)` -> `{fluent api}`
```javascript
  var bootevent = require('bootevent');
```

`bootevent` is a function which returns an api:

It takes a `context` which is passed around, and optionally takes a
`booted` function to be called when everything is ready.

#### `bootevent.acquire`

Takes an async function to run, use this to obtain a resource and
assign it to your context.


### examples

```javascript
  var bootevent = require('bootevent');
  return bootevent( ).acquire(function db (ctx, next) {
    console.log('context during acquiring db', ctx, arguments);
    var now = new Date( );
    console.log('starting acquire', arguments);
    setTimeout(function done ( ) {
      ctx.timeout = (new Date( )) - now;
      console.log('simulated later', arguments);
      next( );
    }, 2000)
    ;

  })
  .boot(function booted ( ) {
    console.log('START PROCESS', arguments);
  });
  ;
```

It's a "fluent" API so you can stack as many `acquire` calls calss as
needed.

