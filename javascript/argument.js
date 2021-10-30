// Ta có một array như sau:
const names = ['Thanh', 'Trang', 'Thuy'];
for(let i = 0; i<names.length; i++){
    console.log(names[i]);
}

// Ta khai báo một array-like object như sau:
const obj = {
    0: 'Thanh',
    1: 'Trang',
    2: 'Thuy',
    length: 3
};
// Thì ta có thể duyệt qua array như sau:
// Ta sẽ có kết quả tương tự như trên
// Nhưng ta lưu ý thằng object này sẽ không có các methods như một array bình thường có thể truy cập được

for(let i = 0; i< obj.length; i++){
    console.log(obj[i]);
}

// Sử dụng arguments
function sum(){
    let result = 0;
    // Ở function này nó sẽ không quan tâm ta truyền vào bao nhiêu đối số
    // mà nó chỉ việc lấy thằng object arguments của function hiện ra
    // arguments là một array các đối số mà function chứa nó.

    for(let i=0;i<arguments.length; i++){
        result +=arguments[i];
    }
    return result;
}

var sum = sum(1,2,3,3,4,5,6,7,8,98,9);
console.log(sum);

// Dùng argument như một array và xử lý các giá trị của arguments đó
function sum2(){
    // Thằng Array.from này nó sẽ nhận vào một array-like object và convert nó thành một array.
    const numbers = Array.from(arguments);
    // Từ mảng đã convert thì ta thực hiện tính tống bằng function reduce.
    return numbers.reduce(function(sum, num){
        return sum+num;
    },0);
}

