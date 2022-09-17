const emp = require('../employee');
 
describe('emp', () => {
  it('it should not be null value', () => {
    expect(emp("hello")).toBe('passed!');
  });

});
