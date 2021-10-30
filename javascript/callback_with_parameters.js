// Call back trong javascript voi tham so dau vao cho ham callback

var test = function(test2, a, b){
    console.log('Begining');
    test2(arguments[1],arguments[2]);
};

test(function(a,b){
    console.log(a);
    console.log(b);
}, 'Testing', 'Testing 2');

// Kết quả là 
// Begining
// Testing
// Testing 2