var fs = require('fs');

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

// Goi readFilePromise với nhiều files theo đúng thứ tự.
readFilePromise('song1.txt')
.then(function(song1){
    console.log(song1);
    return readFilePromise('song2.txt');
})
.then(function(song2){
    console.log(song2);
    return readFilePromise('song3.txt');
})
.then(function(song3){
    console.log(song3);
});

// Nhìn đoạn code phía trên ta sẽ thấy việc gọi và trả về các promise rất là complicated.
// Do vậy ta có Promise.all(), với đầu vào là một array chứa các promise.

Promise.all([
    readFilePromise('song1.txt'),
    readFilePromise('song2.txt'),
    readFilePromise('song3.txt')
]).then(function(values){ 
    // thằng then này sẽ được gọi khi tất cả các promises của array truyền vào điều là resolve.
    // Kết quả là một array tương ứng với các promises truyền vào
    console.log(values);
})
.catch(function(error){
    console.log();
    // Một trong 3 thằng bị dính lỗi thì nó sẽ gọi tới thằng catch này.
}); 
