const sum= require('./sum.js');

describe("Test for sum func", () => {
    test("add 1+2 to equal 3", () => {
        expect(sum(1, 2)).toBe(3)
    });

    test("add -5 + -5 to equal -10", () => {
        expect(sum(-5, -5)).toBe(-10)
    });
})
