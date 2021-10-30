// object methods
// Các phương thức của object.

var myDog = {
    weight: 5,
    name: "Pull",
    age: 1,
    bark: function(){ // anonymous function
        console.log('Gau Gau');
        // trong một function nếu nó không return gì cả
        // thì nó sẽ return về undefined.
    }
};
myDog.bark();