// constructor function
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    };
}
const another = new Circle(1);
/*
- Khi ta sử dụng không có từ khóa new thì các thành phần bên trong
thằng Circle nó sẽ là global context.
- Khi ta dung từ khóa new nó sẽ làm ba việc.
+ Tạo mới một object rỗng.
+ con trỏ this sẽ chỉ về object rỗng phía trên.
+ và cuối cùng nó sẽ trả về đối tượng được tạo ra đó.
Nó sẽ làm giúp ta một việc la bên trong một function mà implement theo constructors
nó sẽ tự động thêm lệnh return this như bên dưới.
function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    };
    return this;
}

*/

