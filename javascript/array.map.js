// array.map
// Đầu vào sẽ là một array và kết quả sẽ là một array
// ứng với mỗi phần tử của array ban đầu, map sẽ dùng function mà ta implement để xử lý với phần tử đó 

var numbers = [1,2,3,4,5];
var squaredNumbers = numbers.map(function(x){
    return x*x;
});
console.log(squaredNumbers);