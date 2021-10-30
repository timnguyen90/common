// Đầu vào là một array
// nó sẽ dùng bộ lọc mà ta implement để cho ra kết quả thỏa điều kiện của bộ lọc đó.
var numbers = [1, 2, 3, 4, 5, 6];
var evenNumber = numbers.filter(function(x){
    // x là đại diện của từng phần tử mảng ban đầu
    return x%2===0;
});
console.log(evenNumber);