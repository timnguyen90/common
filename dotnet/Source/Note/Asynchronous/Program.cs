using System;
using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;

namespace Asynchronous
{
    class Program
    {
        static async Task Task2()
        {
            Task t2 = new Task(() =>
            {
                // Do something
            });

            await t2;
            Console.WriteLine("T2 Finish");
        }

        static async Task Task3()
        {
            Task t3 = new Task(() =>
            {
                // Do something
            });

            t3.Start();
            await t3;
            Console.WriteLine("T3 Finish");
        }

        static async Task<string> Task4()
        {
            Task<string> t4 = new Task<string>(() =>
            {
                // Do something
                return "Result from T4";
            });
            t4.Start();
            var result = await t4;
            Console.WriteLine("T4 finish");
            return result;
        }

        static async Task<string> Task5()
        {
            Task<string> t5 = new Task<string>((object obj) =>
            {
                // Do something
                string t = (string)obj;
                return $"Result from {t}";
            }, "T5");
            var result = await t5;
            Console.WriteLine("T5 finish");
            return result;
        }

        static async Task Main(string[] args)
        {
            //new Task có 2 đối số
            //Nhận vào một Action không có param
            //Task t2 = new Task(Action);
            //Nhận vào một action có param, đối số thứ 2 chính là giá trị của param mà ta cần truyền vào action
            //Task t3 new Task(Action<object>, object);

            //Ta muốn chờ tất cả các task phải thực thi xong mới được gọi đến `Console.WriteLine("Press any key")` thì ta dùng method `Wait()
            // Khi ta gọi đến phương thức này thì các task lúc thực thi vẫn thực thi bất đồng bộ, nhưng nó sẽ chờ cho đến khi cả 2 task t2 và t3 thực thi xong
            // thì nó mới gọi đến statement tiếp theo.
            //t2.Wait();
            //t3.Wait();
            //Console.WriteLine("Press any key");

            //Thay vì ta muốn gọi ra từng task phải `Wait()` như vậy thì ta dùng phương thức sau cho ngắn gọi
            //Task.WaitAll(t2, t3);


            Task t2 = Task2();
            Task t3 = Task3();

            //Trả về là một giá trị string và không có tham số đầu vào
            //Task<string> t3 = new Task<string>(Func<string>);
            //Trả về là một giá trị kiểu string và có tham số đầu vào, tham số đầu vào sẽ được truyền vào đố số thứ 2 của task (đang được khai báo là object)
            //Task<string> t3 = new Task<string>(Func<object, string>, object);


            Task<string> t4 = Task4();
            Task<string> t5 = Task5();

            // Lấy kết quả từ t4 và t5
            var resultT4 = await t4;
            var resultT5 = await t4;

            Console.WriteLine(" Press any key");

        }
    }
}
