// array.sort(function(a,b){});
// => return a sorted array 

// Quy tắc cần nhớ.
// if sort function
    // return value <0
    //  a will come before B
    // return value >0
    //  a will come after b
    // return 0
    //  a and b will stay unchanged.

var numbers = [2, 9, 3, 4, 1];
// => [1,2,3,4,9]

var ascNumbers = numbers.sort(function(a, b){
    // assume: a = 1, b=4
    return a - b;
});
console.log(ascNumbers);

var dscNumbers = numbers.sort(function(a, b){
    // assume: a = 3, b= 4;
    // expected: a comes after b
    return b - a;
});
console.log(dscNumbers);