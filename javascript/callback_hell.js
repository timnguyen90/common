// callback hell
var fs = require('fs');
// Read file theo kiểu đồng bộ sync
var song1 = fs.readFileSync('song1.txt',{encoding:'utf8'});
var song2 = fs.readFileSync('song2.txt',{encoding:'utf8'});
var song3 = fs.readFileSync('song3.txt',{encoding:'utf8'});
console.log(song1, song2, song3);
// Kết quả theo kiểu synchonous.
// Song 1 song 2 song 3

// Read file theo kiểu bất đồng bộ.
// NHƯNG VẪN CHO KẾT QUẢ TRẢ VỀ LÀ THEO KIỂU ĐỒNG BỘ.
fs.readFile('song1.txt',{encoding:'utf8'},function(err, song1){
    // function này được thực thi sau khi việc đọc file đã xong.
    // xuất kết quả của file song1.txt.
    console.log(song1);
    // thực hiện việc đọc file thứ 2
    fs.readFile('song2.txt', {encoding:'utf8'}, function(err2, song2){
        // Xuất kết quả của file song2.txt.
        console.log(song2);
        // Thực hiện việc đọc file song3.txt
        fs.readFile('song3.txt',{encoding:'utf8'},function(err3, song3){
            // Xuất kết quả của file song 3
            console.log(song3);
        });
    });
});
// Kết quả trả về của đoạn chương trình trên như sau:
// Vì ta dùng callback để gọi lồng nhau nhau do vậy nó sẽ makes sure thực hiện đúng trình 
// tự mà ta mong muốn, nếu ta không gọi lồng như vầy, mà gọi riêng từng cái (readfile)
// thì kết quả trả về sẽ không không như ta mong đợi.
// song 1
// song 2
// song 3

// ĐOẠN CHƯƠNG TRÌNH PHÍA TRÊN ĐƯỢC GỌI LÀ CALLBACK HELL, CÓ NGHĨA LÀ GỌI CÁC HÀM 
// LỒNG LỒNG VÀO NHAU, ĐỂ KHẮC PHỤC ĐIỀU NÀY THÌ TA CÓ PROMISE RA ĐỜI!!!

