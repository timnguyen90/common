// scope
// 1. Global scope
    // không nằm trong hàm nào cả.
// 2. Local scope
    // nằm trong một hàm nào đó.

// Khi một function được thực thi => nó tạo mới một scope.
// biến mở mức global thì trong local scope thì vẫn truy xuất được, nhưng ngược lại thì không được.
// Có một quy tắc là làm sao để một biến nó có phạm vi nhỏ nhất.
// global scope
var a = 1;

function randon(){
    // local scope
    var b = Math.random();
}
random();


