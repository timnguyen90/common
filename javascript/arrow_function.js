// Arrow Fuction part 1

function sum(a, b){
    return a+ b;
}
sum(1,2);

var sum2 = function(a, b){
    return a + b;
};
sum2(3,3);

var sum3 = (a, b) => {return (a+b)};

var sum4 = (a, b) => a+b;

var square = (x) => x*x;

var square2 = x => x*x;

var arr = [1, 2, 3];
arr.map(x => x*x);

/**********************************************************************************************************************/
// Arrow Fuction part 2
// Arrow function nó không có context, do vậy con trỏ this nó chính là this của cái context gần nhất mà chứ thằng arrow function đó.


var a = {
    name: 'AAA',
    run: function(){
        var run2 = function(){
            console.log(this.name);
            // khi ta gọi tới this.name ở đây nó sẽ không ra kết quả
            // vì lúc này this chính là function run2 chứ không phải là thí của hàm run nữa.
            // để khắc phục điều này ta có thể dùng tới hàm bind như bên dưới khi ta gọi hàm run2()
        }.bind(a); // hoặc cũng có thể gán lại ngữ cảnh như sau nếu ta không muốn gại lại ngữ cảnh ngay khi lúc gọi hàm.
        run2();
        // nếu ta không gán lại ngữ cảnh sau khi declaration functuon run2 như trên thì có thể dùng cách
        // gán lại ngữ cảnh khi ta thực thi function run2 như sau:
        //run2.bind(a)();
        // thay vì ta bind(a) ta cũng có thể bind(this), vì this lúc này chính là a vì nó đang trong phạm vi của functuon run
        
    }
};
a.run();

// Ở một số thư viện cũ ta sẽ thấy người ta sẽ giữa lại con trỏ this của ngữ cảnh bên ngoài bằng một biến là that.
// sau đó người ta dùng that này bên trong một function nào đó.

var a = {
    name : 'AAA',
    run: function(){
        var that = this;
        var run2 = function(){
            console.log(that.name);
        }
        run2();
    }
}


// Note: important: Thằng arrow function nó không có context, do vậy context của nó chính là thằng context gần nhâts.
// Ta xem sét ví dụ sau:
var a = {
    name: 'AAA',
    run: function(){
        var run2 = () => {
            console.log(this.name);
            // this.name: ở đây this chính là con trỏ this của context bên ngoài của function run hay chính là object a
            // Do vậy nó sẽ lấy được giá trị của name là AAA
        };
        run2();
    }
};
a.run();

// Issue No#1
var a = {
    foo: 'bar',
    run: function(){
        setTimeout(function(){
            console.log(this.foo);
            // this ở đây chính là context là cái function chứ thằng setTimeout chứ không phải là this là object a.
            
        }, 2000);
    }
};
a.run();

// Cách giải quyết cho issue No#1

var a = {
    foo:'bar',
    run:function(){
        // var that = this;
        setTimeout(function(){
            console.log(this.foo);
            
            // console.log(that.foo); ở các phiên bản cũ nếu không dùng function bind()
            // thì ta có thể khai báo một biến that và that này sẽ hứng giá trị của this là context bên ngoài
            // sau đó gọi dùng that bên trong để truy cập các property bên ngoài thông qua that.

        }.bind(this)/*.bind(a)*/, 2000); // this ở đây chính là this ngữ cảnh của function run().
    }
};


// Thay vì dùng hàm bind hay dùng that để hứng giá trị của con trỏ this của ngữ cảnh bên ngoài thì ta có thể dùng arrow function.
var a = {
    foo: 'bar',
    run: function(){
        setTimeout(()=>{
            console.log(this.foo);
        }, 2000);
    }
};
 a.run();
