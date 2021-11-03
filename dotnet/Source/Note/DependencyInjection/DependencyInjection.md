Một thư viện Dependency Injection thì nó có 3 thành phần sau:
 
DI Container nó sẽ cho phép: (trong DI của MS thì nó chính là `ServiceCollection`
- Đăng ký các dịch vụ (các lớp)
- `ServiceProvider` => Get Service

Trong DI của MS thì nó sẽ theo bộ ba như sau:
* Tạo mới `ServiceCollection`
`var services = new ServiceCollection();`
* Đăng ký service, ở đây ta muốn khi gọi đến `IClassC` thì nó sẽ trả về một new object `ClassC`
* `services.AddSingleton<IClassC, ClassC>();`
*  Tạo một `ServiceProvider`
`var provider = services.BuildServiceProvider();`
* Và cuối cùng là lấy ra instance mà ta muốn được sử dụng
` var service = provider.GetService<IClassC>();`

```c#
var services = new ServiceCollection();

// Đăng ký dịch vụ IClassC tương ứng với đối tượng ClassC
services.AddSingleton<IClassC, ClassC>();

var provider = services.BuildServiceProvider();

for (int i = 0; i < 5; i++)
{
    var service = provider.GetService<IClassC>();
    Console.WriteLine(service.GetHashCode());
} 
// ClassC is created
// 32854180
// 32854180
// 32854180
// 32854180
// 32854180
// Gọi 5 lần chỉ 1 dịch vụ (đối tượng) được tạo ra

```