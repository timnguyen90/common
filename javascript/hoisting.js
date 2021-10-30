// Các biến được khai báo với từ khóa var trong một file sẽ được đem lên 
// đầu đầu của scope mà nó đang được khai báo.
// và không gán giá trị cho nó.

var x = 5;
function testing(){
    console.log(x);
    var x = 10;
}

testing();
// Result: undefined
// Reason: ở dòng 7 ta khai báo x thì khi thực thi function
// nó sẽ đem đoạn khai báo var x lên nằm ở giữa dòng số 5 và số 6
// và nó sẽ không thấy được giá trị x = 10.
