// 'use strict';
// Should 'use strict' globally if can because will turn many silent errors
// into throwing errors
// Can't use here because demonstrating weird behavours


// Implicit global since no var used, but will work
myVar = "hello";
console.log(myVar);

// Declaration will be hoisted but not initialization, thus undefined
console.log(newVar);
var newVar = "second";

// let and const are scope constrained, so would get a referenceError
// HOWEVER: within scope, they are still technically hoisted
// Not really of practical use because they are not automatically initialized
// so any use will result in an error (there are some edge cases that demonstrate hoisting)
// {
//     let willCauseError = "hello";
//     // const willCauseError = "hello";
// }
// console.log(willCauseError);

// Works in spite of being in separate scope
{
    var myMessage = "hello";
}
console.log(myMessage);


// For loop index (when defined with let) is block scoped to insude the loop
// despite declaration notionally outside of the {}
for (let i=0; i < 3; i++) {
    console.log(i);
}
// This print would be an error
// console.log(i);
let j;
for (j=0; j < 3; j++) {
    console.log(j);
}
// This print is allowed
console.log(j);


// Function declarations (and class declarations) are hoisted, but expressions (which can store a function)
// are not
myHoistedFunction(5)
function myHoistedFunction(myNum) {
    console.log(myNum)
}

// This would be an error, even if declared with var
//  Note: different error though, TypeError not a function vs. ReferenceError
// myUnhoistedFunct(5)
let myUnhoistedFunct = (myNum) => { console.log(myNum)}
myUnhoistedFunct(5)

// Below is not a reference error because var isn't scope constrained
// except for "global" and "function", so these {} alone don't do it?
// but still undefined
console.log(myMessage2);
{
    var myMessage2 = "myMessage2";
}

// Not undefined because non-var are implicitly globals despite
// being set in an interior scope
console.log(myMessage2);
{
    myMessage2 = "myMessage2";
}

const myOctal = 0o10;
console.log(myOctal);
// Implicitly converted back to decimal when added to a decimal
console.log(myOctal + 10);
console.log(myOctal + 0o10);

// with is bad and mostly deprecated, so shouldn't use
// Will use any property of the with variable BEFORE a global one
with ([1, 2, 3]) {
    console.log(toString());
}
console.log(toString());
console.log(globalThis.toString());
var myObj = {'x': -1};
var x = 100;
console.log(x);
with (myObj) {
    console.log(x);
}

// Array destructuring assignment
//      syntax is different for object destructuring assignment
let a;
let b;
let rest;
[a, b] = [10, 20];
console.log(a);
console.log(b);
[a, b, ...rest] = [-1, -2, 30, 40, 50];
console.log(a);
console.log(b);
console.log(rest);
[a, b] = [5, 6, 7]
console.log(a);
console.log(b);
[a, , b] = [5, 6, 7]
console.log(a);
console.log(b);
[a, , , b] = [5, 6, 7]
console.log(a);
console.log(b);
[a, , , b = "default"] = [5, 6, 7]
console.log(a);
console.log(b);
[a, , , b = "default"] = [5, 6, 7, 8]
console.log(a);
console.log(b);

// Objects
// Both valid intializations
// var destructObject = {a:'world', b:'hello'};
var destructObject = {'prop1':'world', 'prop2':'hello'};
console.log(destructObject.prop1);
console.log(destructObject["prop2"]);
// UNDEFINED
// console.log(destructObject[b]);

// Object destructuring
// let required, since otherwise {} is treated like it is a scope
let {prop1, prop2} = destructObject;
console.log(prop1);
console.log(prop2);
let {prop3, prop4} = destructObject;
console.log(prop3);
console.log(prop4);

// Destructuring object assignment with different names
// Note structure objectName: newVariableName
let {prop1: diffName1, prop2: diffName2} = destructObject;
console.log(diffName1)
console.log(diffName2)
let {prop1: xx, prop3: yy = "missing"} = destructObject;
console.log(xx)
console.log(yy)

// Use of rest gives you named properties, not just a collection
//      e.g. see restWithObject.prop1
let {...restWithObject} = destructObject;
console.log(restWithObject)
console.log(restWithObject.prop1)
console.log(restWithObject['prop2'])

let newDestructObj = {size: {width: 5, height: 10}, name: "John"}
let {size, name: myName} = newDestructObj;
console.log(size)
console.log(size.height)
console.log(myName)
let desObj1 = {flapjack: {width: 5, height: 10}, name: "John"}
let {flapjack: {width: item1, height: item2}} = desObj1
console.log(item1)
console.log(item2)
// Note, flapjack is not created here, only its contents
//         Just used for organization
// console.log(flapjack)

// Destructuring and defaults to simplify function arguments
// Note the {} wrapping the arguments
// Note you can use the : to redirect to a new variable name, same as for destructuring
var myFunc1 = function({date:newVarName = "December", dogName = "Spot", dogOwner = "Ping"} = {}) {
    console.log(newVarName);
    console.log(dogName);
    console.log(dogOwner);
};
// Will use all default values
myFunc1({})
// Will only work with empty argument if = {} default is included for whole object
myFunc1()
console.log()
// Will use default dogOwner but specify others
let options = {date: "January", dogName: "Rex"};
myFunc1(options)




// number type is float
// like double in most other languages (double precision 64 bit)
console.assert(123 == 123.0)
console.log(Number("2"))
console.log(Number("hi"))

// Properties of a const object can be updated
const constObject = {age: 7, hat: "beret"}
console.log(constObject.age)
// This works suprisingly:
constObject.age = 10
console.log(constObject.age)

// Default values and undefined
// Even if explicitly pass undefined to a parameter that has a default value
// it will use the default value
// BUT explicit null will work
function myDefaultFunc(num = 1) { console.log(num)}
myDefaultFunc()
myDefaultFunc(undefined)
myDefaultFunc(null)

// Default parameters are in own namespace, separate from parent and body of function
// which means they can access other (earlier defined) parameters
function selfRefDefaultFunc(a = 1, b = a)  { console.log(`${a} ${b}`)};
selfRefDefaultFunc()
selfRefDefaultFunc(5)

// Passing nothing and still having prefilled variables
// but keeping the option to pass in an array
// (object better since will have names not just ordering)
function preFilledArray([x = 1, y = 2] = []) {
    return x + y;
  }
console.log(preFilledArray());
console.log(preFilledArray([3]));
console.log(preFilledArray([3, 10]));

// Falsy (i.e. evaluates to false) values
console.assert(!false)
console.assert(!(null))
console.assert(!(undefined))
console.assert(!(NaN))
console.assert(!(0))
console.assert(!(-0))
console.assert(!(""))
console.assert((" "))
// Apparently this is true in some situations, but not defined in node?
// console.assert(!(document.all))

// Truthy values are everything else
// Some mildly suprising ones
console.assert([])
console.assert({})
console.assert("false")
console.assert("0")
console.assert("0")

// Big int literals
let bigIntLiteral = 10n;
console.log(bigIntLiteral)
bigIntLiteral = BigInt(10);
console.log(bigIntLiteral)
console.log(typeof 1n)

// BigInt is loosely but not strictly equal to an equivalent number
// Comparions (and thus sorting) work normally
// Coercion from Number to BigInt can lead to loss of precision
console.assert(1n == 1)
console.assert(!(1n === 1))

class Animal {
    // Public field
    static soundCount = 0;
    noise = "original";
    static declaredOnly;
    
    // This doesn't seem to be supported in my JS version
    // static {
    //     Animal.declaredOnly = "now initialized";
    // }

    // Private field
    #privateNoise = "secret";


    constructor(noise) {
        this.noise = noise;
    }

    makeNoise() {
        console.log(this.noise);
        console.log(this.#privateNoise);
        Animal.soundCount += 1;
    }

    // Appears this isn't supported in the version I'm using
    // #makePrivateNoise() {
    //     console.log(this.#privateNoise);
    // }

    // consentPrivateNoise() {
    //     this.#makePrivateNoise();
    // }
}
let myAnimal = new Animal("meow");
for (let i = 0; i < 4; i++) {
    myAnimal.makeNoise();
    console.log(Animal.soundCount);
}
// console.log(Animal.declaredOnly);
// This would be illegal since it's accessing a private field
// console.log(myAnimal.#privateNoise);

// Map and arrow (anonymous) functions
let chemicalArray = ["Hydrogen", "Helium", "N"];
let chemLengthArray = chemicalArray.map((chemical) => { return chemical.length;} )
console.log(chemLengthArray);

// Arrow functions
// Traditional anonymous function, only missing it's name
var firstArrowFunction = function (param) { return param.length - 1; }
chemLengthArray = chemicalArray.map(firstArrowFunction);
console.log(chemLengthArray);
// Can leave out the () around a single parameter and the 'return' if the body is one line long
var secondArrowFunction = param => param.length % 2 ? "odd" : "even";
chemLengthArray = chemicalArray.map(secondArrowFunction);
console.log(chemLengthArray);

// Rest parameters function
function sumWithoutArray(...myArgs) {
    let total = 0;
    for (const arg of myArgs) { total += arg; }
    return total;
}
console.log(sumWithoutArray(1,2,3,4,5,6));

// Apply
let myNumsToMax = [1, 2, 3, 4, 913];
let maxValue = Math.max.apply(null, myNumsToMax);
console.log(maxValue);

// Map
// NOTE: do not set with [], because that will set properties
// Must set with .set(key, value) and get values with .get(key)
let myMap = new Map()
myMap.set(5, "non string key");
console.log(myMap.get(5));
myMap.set(false, "non num key")
console.log(myMap.get(false))
console.log(myMap.size);
console.assert(myMap.has(5))
console.assert(!myMap.has(7))
myMap.delete(5)
console.assert(!myMap.has(5))

// async function and promises
// async function myFunction() { return "hello"; }
// myFunction().then(
//     function(value) { console.log(value); },
//     function(error) { console.log(error); }
// )
// async function wait() {
//     let myPromise = new Promise((resolve, reject) => { resolve("await"); });
//     let message = "shouldn't see this"
//     message = await myPromise;
//     console.log(message);
// }
// wait()
// async function shouldTimeout() {
//     let myPromise = new Promise((resolve) => {
//         setTimeout(function() {resolve("No timeout");}, 500)
//     })
//     let message = "shouldn't see this"
//     message = await myPromise
//     console.log(message)
// }
// shouldTimeout()

// Sets
let mySet = new Set();
mySet.add(5);
console.log(mySet.size)
console.assert(mySet.has(5));
console.assert(!mySet.has(7));
mySet.delete(5)
console.assert(!mySet.has(5));
// Okay to delete non-existent
mySet.delete(5)
mySet.add(7)
mySet.add(10)
for (const item of mySet) { console.log(item); }

// Class
class Living {
    sayLiving() {
        console.log("living");
    }
}

class AnAnimal extends Living {
    uniqueName;

    constructor(value) {
        super();
        this.uniqueName = value;
    }
    sayType() {
        console.log("Animal")
    }

    sayName() {
        console.log(this.uniqueName);
    }
}

let anotherAnimal = new AnAnimal("Blah Blah");
anotherAnimal.sayType();
anotherAnimal.sayLiving();
anotherAnimal.sayName();

let arrayToMap = [1,3,5]
console.log(arrayToMap.map(x => x + 2))
arrayToMap.forEach((item) => console.log(item))
console.log(arrayToMap.slice(arrayToMap.length - 1))
console.log(arrayToMap.slice(0, 1))