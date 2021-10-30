var fs = require('fs');
var co = require('co');

function readFilePromise(path) {
    return new Promise(function(resolve, reject) {
      fs.readFile(path, { encoding: "utf-8" }, function(err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

// Cách dùng co
// Option 1
co(function*(){
    // Function này được khai bao theo kiểu generator function.
    // sử dụng từ khóa yield cùng với việc function ở sau nó trả về một promise
    // để thực hiện việc chạy bất đồng bộ nhưng cho kết quả lại là đồng bộ.
    var song1 = yield readFilePromise('song1.txt');
    var song2 = yield readFilePromise('song2.txt');
    var song3 = yield readFilePromise('song3.txt'); 
    // Bên trong thằng co này nó cũng trả về một promise.
    return [song1, song2, song3];
    //console.log(song1, song2, song3);
    // Result: song , song2, song 3
}).then(function(values){
    console.log(values);
}).catch(function(error){
    console.log(error);
});  

// Option 2
co(function*(){
    // Khi mà ta yield một array thì nó sẽ chờ 3 cái promise trong này được resolve thì mới trả kết quả về.
    var values = yield [
        readFilePromise('song1.txt'),
        readFilePromise('song2.txt'),
        readFilePromise('song3.txt')
    ];
    return values;
}).then(function(values){
    console.log(values);
}).catch(function(error){
    console.log(error);
}); 

// co.wrap trả về một cái hàm.
// ở đây ta muôn implement mà trả về một cái hàm, và cái làm đó lại trả về promise.
var readFile = co.wrap(function*(files){
    // chuyển một array kiểu string sang một array kiểu promise.
     var values = yield files.map(function(file){
         return readFilePromise(file);
     });
     return values;
});
// khi ta gọi nó ra
readFile(['song1.txt','song2.txt','song3.txt'])
.then(function(values){
    console.log(values)
});