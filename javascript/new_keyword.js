// Cách khai báo theo kiểu thủ công object literal.
var mouse = {
    weight: 0.2,
    getWeight: function(){
        return this.weight;
    }
};
// Gọi ra
console.log(mouse.getWeight());

// constructor function 
function Mouse(color){
    this.type = 'mouse';
    this.color = color;
}
var mouse0 = {type: 'mouse'}
console.log(mouse0);
// Khi khai báo theo một cách thông thường
// thì khi ta xuất ra nó chi là một object mà không có kiểu.

var mouse1 = new Mouse();
console.log(mouse1);
// Khi ta khai báo với từ khóa new thì khi ta xuất ra
// nó sẽ cho ta biết kiểu của nó là gì luôn.


var tom = {
    name: 'Tom',
    stomach: [],
    eat: function(mouse){
        this.stomach.push(mouse);
        // return this ở đây để dùng cho việc method chaining.
        return this;
    }
};
var m1 = { name: 'm1'};
var m2 = {name: 'm2'};
var m3 = {name: 'm3'}

// Gọi method eat nhiều lần bằng cú pháp method chanining.
tom.eat(m1).eat(m2).eat(m3);
console.log(tom);
