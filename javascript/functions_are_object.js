function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    };
}

// Vì function cũng là một object nên ta có thể khai báo như vầy
const Circle1  = new Function('radius',`
this.radius = radius;
this.draw = function(){
    console.log('draw');
}
`);

const another = new Circle(1);
// Khi thực thi đoạn chương trinh bằng đoạn code sau, ta cũng được kết qua tương tự như thằng another.
const circle = new Circle1(1);

/***********************************************/
const another = new Circle(1); //(1)
// Ta khai báo đoạn code sau:
Circle.call({},1);// nếu ta có nhiêu đối số của một object ta có thể phân cách nhau bằng dấu ,
// Bằng việc sử dụng hàm call trên
// thì kết quả cũng tương tự khi ta khai báo bằng cách (1)
// {} chính là đối tượng mà con trỏ this sẽ trỏ vào.

// một method khác la apply, thì nó cũng hoan toàn tương tự như thằng call.
// Nhưng ở đâu đối số thứ 2 chính la một mảng các đối số.
Circle.apply({},[1,2,3,4]);

