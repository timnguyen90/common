function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    };
}

const circle = new Circle(10);

for(let key in Circle){
    console.log(key);
    console.log(key, circle[key]);
}

// Nếu properties không phải là function thì hiển thị nó ra.
for(let key in circle){
    if(typeof circle[key]!== 'function')
        console.log(key, circle[key]);
}

// In tất cả các key của object circle.
const keys = Object.keys(circle);
console.log(keys);

// Kiểm tra xem property radius có trong thằng object circle hay không?
if('radius' in circle)
    console.log('Circle has a radius.');

    