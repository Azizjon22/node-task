const { describe } = require("node:test");

// absolute funksiyasini tekshirish uchun klassik unit testlar
const myLib = require("../mylib");
describe("absolute", () => {
  it(" should return a positive number if input is positive", () => {
    const result = myLib.absolute(1);
    expect(result).toBe(1);
  });

  it(" should return a positive number if input is negative", () => {
    const result = myLib.absolute(-1);
    expect(result).toBe(1);
  });

  it(" should return 0 if input is 0", () => {
    const result = myLib.absolute(0);
    expect(result).toBe(0);
  });
});
 
//  matin uchun aniq test oddy space ham tasir qladi !!!
describe('salam', ()=> {
    it('should return the greeting message', ()=>{
    const result = myLib.salam('Aziz');
    // expect(result).toContain('Aziz')  //	Oddiy substring bo‘lsa
    expect(result).toMatch(/Aziz/) //	RegExp bilan murakkab moslik kerak bo‘lsa
    })
});


describe('getCurrencies', () => {
    it('should return default currencies', ()=> {
     const result = myLib.getCurrencies();

    //  o'rta umumiy test
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // o'rta aniq test
    expect(result[0]).toBe('UZS')
    expect(result[1]).toBe('MYR')
    expect(result[2]).toBe('TRY')
    expect(result.length).toBe(3)

    // to'g'ri usulda yozilgan test 
    expect(result).toContain('UZS')
    expect(result).toContain('MYR')
    expect(result).toContain('TRY')
    expect(result).toEqual(expect.arrayContaining(['MYR', 'UZS', 'TRY']))
    })
})

describe('getProduct', () =>{
    it('should return the product with the given id', () =>{
        const result = myLib.getProduct(11);
        expect(result).toEqual({id: 11,  title: 'banana', price: 2});
        expect(result).toMatchObject({id: 11, price: 2})
        expect(result).toHaveProperty( 'price', 2)

    })
})