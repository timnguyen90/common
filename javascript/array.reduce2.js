//array.reduce
// nếu có giá trị init thì thay vì lấy phần tử đầu tiên trong lần lặp đầu tiên thì nó sẽ lấy giá trị của thằng init thay vì phần tử đầu tiên.
var numbers = [1,2,3,4,5];
var sum = numbers.reduce(function(a,b){
    console.log(a, b);
    return a + b;
},0);
console.log(sum);

// kết quả thực thi
// 0, 1
// 1, 2
// 3, 3
// 6, 4
// 10

var products = [
    {name: 'A', quantity: 2, unitPrice: 10},
    {name: 'A', quantity: 3, unitPrice: 20},
    {name: 'A', quantity: 4, unitPrice: 30}
];

var total = products.reduce(function(currentTotal, product){
    return currentTotal + product.quantity * product.unitPrice;
},0);
console.log(total);

var items = ['Tom', 'Bill', 'Kim']
// Use reduce to make this result
// '<Tom><Bill><kim>'