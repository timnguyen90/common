//array.reduce
// liên tưởng đến dãy fibonacy
// dùng đầu ra của thằng trước làm đầu vào của thằng sau

// Tính tổng các phần tử trong mảng
var numbers = [1,2,3,4];
var result = numbers.reduce(function(a,b){
    console.log(a, b);
    return a+b;
});
console.log(result);

// kết quả là 
// 1, 2
// 3, 3
// 6, 4
// 10
