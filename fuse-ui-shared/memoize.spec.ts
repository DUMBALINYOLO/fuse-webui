///<reference types='jasmine'/>
import { memoize } from './memoize';

function increment(from: number) : number {
    return from + 1;
}

function sum(x: number, y: number) : number {
    return x + y;
}

function sumAll(...args: number[]) : number {
    return args.reduce((sum, cur) => sum + cur, 0);
}

describe('memoize', () => {
  const foo = {
      inc: increment,
      add: sum,
      sum: sumAll
  };

  beforeEach(() => {
      spyOn(foo, 'inc').and.callThrough();
      spyOn(foo, 'add').and.callThrough();
      spyOn(foo, 'sum').and.callThrough();
  })

  it('memoize function calls', () => {
      const memo = {};
      const test = foo.inc.bind(foo);
      const testAdd = foo.add.bind(foo);
      const testSum = foo.sum.bind(foo);
      const memoInc = memoize(memo, test);
      const memoAdd = memoize(memo, testAdd);
      const memoSum = memoize(memo, testSum);

      console.log(`test.name = ${test.name}, testAdd.name = ${testAdd.name}`);
      for (let i = 0; i < 10; i++) {
          expect(memoInc(2)).toBe(3);
          expect(memoInc(3)).toBe(4);
          expect(memoAdd(2, 3)).toBe(5);
          expect(memoAdd(7, 8)).toBe(15);
          expect(memoSum(4, 5)).toBe(9);
          expect(memoSum(4, 5, 6)).toBe(15);
      }
      expect(foo.inc).toHaveBeenCalledTimes(2);
      expect(foo.add).toHaveBeenCalledTimes(2);
      expect(foo.sum).toHaveBeenCalledTimes(2);
  });
});
