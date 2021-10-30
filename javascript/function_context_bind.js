// global context
// function context
// bind

var mouse  = {
    name: 'Mickey',
    sayHi:function(){
        console.log('Hi! my name is: ', this.name);
    }
};
// Cách gọi 1:
// mouse.sayHi();
// sayHi ở đây là của mouse và this là this của thằng mouse.

var say = mouse.sayHi;
// Gách gọi bên dưới sẽ khác với cách gọi 1.
// về bản chất nó là như sau:
// say = function(){ do something here }
// và context ở đây là nó không có context hay là global context.
// do vậy ta cần tới hàm bind().

// say();
// Result: undefined


//ta viết lại như sau:
var say1 = mouse.sayHi.bind(mouse);
// khi mà function bind được gọi thì bind sẽ trả về một function là chính function đã gọi nó (sayHi), 
// nhưng con trỏ this nó sẽ chỉ về thằng mà truyền vào thằng function bind (mouse)
say1();

// Một ví dụ khác về ứng dùng của function bind này.
var cat = {
    name: 'Tom'
};

var say = mouse.sayHi.bind(cat);
say();
// khi chạy chương trình ta sẽ thấy rằng kết quả sẽ là 
// Result: Hi! my name is:  Tom
// Vì khi ta gọi tới bind là cat thì lúc này context của this.name sẽ bị thay đổi
// nó sẽ chỉ về this.name của thằng cat chứ không phải của thằng mouse.


// Một ví dụ khác khi ta có dùng tới callback function
// Ta có đoạn chương trình sau:
function run(cb){
    console.log('run...');
    cb();
}

var mouse = {
    name: 'Mickey',
    sayHi: function(){
        console.log(this.name);
    }
};

// Gọi hàm run và truyền vào call back chính là sayHi
run(mouse.sayHi);
// Kết quả thực thi chương trình là : undefined 
// Lý do: do sayHi được gọi trong hàm run nó không có context là của thằng  mouse, do vậy nó không biết this.name là của thằng mouse.
// Ta sẽ gặp cái này rất nhiều trong reactjs.



