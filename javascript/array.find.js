//array.find
// nó sẽ tìm và trả về phần tử đầu tiên nó tìm thấy
var numbers = [1,2,3,4];
var result = numbers.find(function(number){
    return number%2===0;
});
console.log(result);
// Kết quả là: 2
