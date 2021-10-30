//setInterval(fn, ms);
// Sau một khoản thời gian là ms sẽ gọi lại hàm fn, hành động này sẽ lặp đi lặp lại.
// Nếu muốn dừng nó lại thì ta phải gọi tới clearInterval.

var i = 0;
setInterval(function(){
    ++i;
    console.log(i);
},1000);

// Result: Cứ sau khoản 1s nó sẽ xuất giá trị của i lần lượt là 1, 2, 3,....

// Đoạn chương trình phía dưới sẽ in ra i từ 1 tới 10, khi tới 10 thì nó sẽ gọi tới clearInterval để dừng lại
var i = 0;
var intervalId = setInterval(function(){
    ++i;
    console.log(i);
    if(i==10){
        clearInterval(intervalId);
    }
},1000);
