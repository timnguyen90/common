/*1. Declaration*/

var a = 1;
var b = 2;
const c = 3;
console.log(a, b, c);

var a = 2; 
console.log(a);
// Result: 2

let b = 3;
// Result: Báo sỗi, không được khai báo lại khi đã có một biến nào đó được khai báo let trên nó.
// Điều này cũng tương tự cho từ khóa const

// được phép khia báo mà không khởi tạo với từ khóa var.
// Không được phép khai báo mà không khởi tạo với từ khóa const.

/*2. Hoisting*/

// Đối với từ khóa let và const sẽ không có behavior là hoisting.
// Let và const  thì có scope
// còn var chỉ có function scope.
