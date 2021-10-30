
/*********************** PROMISE TRONG JAVASCRIPT ***********************/

// 1. CÁCH DÙNG PROMISE CỦA MODULE FS.READFILE.

// Trong javascript nó có một thằng gọi là promise ta có thể tạo nó như sau:
// Nó là một constructor function
// var promise = new Promise();

// Ta sẽ cài môt module có tên là promise-fs như sau:
// npm i --save promise-fs 

var fs = require('promise-fs');
// Thằng readFile này sẽ trả về một promise, promise của nó có 2 function là then() và catch()
// then() chính là kết quả trả về mà ta muốn nhận.
// catch() là lỗi

// Function dùng để log ra kết quả khi không có lỗi.
function onDone(song){
    console.log(song);
}
// Functung dùng để show lỗi khi có lỗi.
function onError(error){
    console.log(error);
}

// function fs.readFile trả về một promise, do vậy thằng function readFile này cũng trả về một promise luôn.
function readFile(path){
    return fs.readFile(path, {encoding:'utf-8'});
}

// Read file sử dụng function readFile trong module fs.
fs.readFile('song1.txt',{encoding:'utf-8'})
.then(onDone)
.catch(onError);

// Read file sử dụng function readFile do ta tự viết ra.
readFile('song1.txt')
.then(onDone)
.catch(onError);

// Bây giờ ta sẽ thực hiện việc read file thứ 1 sau đó read file thứ 2...

readFile('song1.txt')
.then(onDone)
.then(function(){
  return readFile('song2.txt');  
})
.then(onDone)
.catch(onError);
// Khi nó chạy qua hàm readFile gặp tới .then(onDone) nó sẽ chờ thằng này xong nói mới chạy tiếp xuống bên dưới.
// Bản thân thằng .then() nó cũng trả về một promise, là chính nó
// Nên nó cũng có thể gọi thêm .then() nữa.

// Kết quả khi ta xuất ra màn hình
// song 1
// song 2

// 2. BẢN CHẤT CỦA PROMISE TRONG JAVASCRIPT.
// fs này là của javascript.
var fs = require('fs');

function readFilePromise(path){
    
    return new Promise(function(resolve, reject){
        // Resolve là nhận kết quả khi thực hiện xong (không có lỗi)
        // reject là nhận về lỗi của qua trình thực thi.
        
        fs.readFile(path,{encoding:'utf-8'},function(err, data){
            if(err){
                // Nếu có lỗi thì gọi tới reject.
                reject(err);
                // và reject này sẽ được truyền vào hàm .catch()
            }
            else{
                resolve(data);
                // sẽ được gọi khi thực thi xong và trả về kết quả của thực thi (không có lỗi).
                // và resole này sẽ truyền kết quả tới hàm .then()
            }
            
        });
    });
}

// Cách gọi mà ta mong muốn của function readFilePromise.
readFilePromise('song1.txt')
.then(function(song1){
    console.log(song1);
})
.catch(function(error){
    console.log(error);
});

// Cách gọi liên tiếp song 1 và song 2
//????







