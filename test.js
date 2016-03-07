const test = require('tape');
const electronInputMenu = require('./');

test('it work!', t => {
  const result = electronInputMenu();
  t.equal(result, 42);
  t.end();
});
