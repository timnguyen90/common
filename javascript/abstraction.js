// How to make private properties and methods
function Circle(radius){
    this.radius = radius;
    // Private member
    let defaultLocation = {x:0, y:0};
    // Private member
    let computeOptimumLocation = function(factor){
    //...
    };
    this.draw = function(){
        computeOptimumLocation(0.1);
        console.log('draw');
    };

}
