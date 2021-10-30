var myFunc = function(callbackFun){
    console.log("Hello World!");
    callbackFun();
}

// To call the main function
myFunc(function(){
    console.log("Nice to meet you!");
});