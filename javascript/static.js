// static

class Foo{
    static someMethod(){
        console.log('some method');
    }

    anotherMethod(){
        console.log('another method');
    }
}

// Truy cập static methoid.
Foo.someMethod();

const foo = new Foo();
foo,.someMethod();// báo lỗi vì static chỉ có thằng class gọi thằng instant của class không thể gọi được.

