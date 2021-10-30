var fs = require("fs");

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

// Định nghĩa một hàm xử lý bất đồng bộ và hàm này trả về một promise.
async function run(){
    // Trong này ta sẽ gọi các lệnh bất đồng bộ,
    // Trong Node co thì ta dùng từ khóa yield nhưng ở đây khi ta dùng qua async thì nó là await.
    // await thì ngay sau đó là một lệnh phải trả về một promise
    var song1 = await readFilePromise('song1.txt');
    var song2 = await readFilePromise('song2.txt');
    console.log(song1, song2);
    return [song1, song2];
}

// Gọi hàm này ra 
run().then(function(values){
    console.log(values);
});