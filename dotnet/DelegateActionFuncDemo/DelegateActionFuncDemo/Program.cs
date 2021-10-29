using System;
using System.Collections.Generic;
using System.Linq;

namespace DelegateActionFuncDemo
{
    public delegate void ShowLog(string message);
    class Program
    {
        static void Info(string s)
        {
            Console.WriteLine(s);
        }

        static void Warning(string s)
        {
            Console.WriteLine(s);
        }

        static int Sum(int a, int b) => a + b;
        static int Sub(int a, int b) => a - b;

        static List<int> FilterByPredicate(Func<int, bool> expression, int[] array)
        {
            return array.Where(expression).ToList();
        }

        static void Main(string[] args)
        {
            //ShowLog log = null;
            //log += Info;
            //log += Warning;
            //log?.Invoke("Testing");

            //Action<string> action2;
            //action2 = Warning;
            //action2 += Info;

            //action2?.Invoke("Testing.....");

            // Khai bao môt delegate có kiểu trả về là int.
            // Tương đương với kiểu khai báo tường minh như sau: 
            // delegate int function1();
            //Func<int> function1;

            // Khai báo một delegate có kiểu trả về là string và có 2 tham số đầu vào là string và double
            // Tương đương với khai báo tường minh như sau: 
            // delegate string function2(string s, double i);
            //Func<string, double, string> function2;

            //Func<int, int, int> caculator;
            //int a = 5;
            //int b = 10;
            //caculator = Sum;
            //Console.WriteLine($"Tong: {caculator(a, b)}");
            //caculator = Sub;
            //Console.WriteLine($"Hieu: {caculator(a, b)}");

            // Biểu thức lambda có 1 tham số.
            //Action<string> Nortification;
            //Nortification = (string s) => Console.WriteLine(s);
            //Nortification?.Invoke("This is a message");

            //// Biểu thức lambda không có tham số.
            //Action Nortification1;
            //Nortification1 = () => Console.WriteLine("Hello !");
            //Nortification1?.Invoke();

            //// Ta có thể bỏ qua kiểu của tham số đầu vào như sau:
            //Action<string> welcome;
            //welcome = s => Console.WriteLine(s);
            //welcome?.Invoke("Hello!");

            //Action<string, string> welcome2;
            //welcome2 = (mgs, name) => Console.WriteLine(mgs +" "+name);
            //welcome2?.Invoke("Hello","John");

            // Delegate có kiểu tra về với biểu thức lambda.
            Func<int, int, int> caculator;
            caculator = (a, b) => {
                int result = a + b;
                return result;
            };
            Console.WriteLine($"Result: {caculator(5, 6)}");

            // Duyệt qua một mảng cho trước, sau khi tính toán trả về một mảng là căn bậc 2 của mảng ban đầu.
            int[] myArray = { 1, 2, 3, 4, 45, 56, 6, 54 };
            var result = myArray.Select((x) => {
                return Math.Sqrt(x);
            });
            foreach (var item in result)
            {
                Console.WriteLine(item);
            }

            // Duyệt qua mảng phần tử, hiển thị các số chia hết cho 2.
            myArray.ToList().ForEach(x => {
                if (x % 2 == 0) Console.WriteLine(x);
            });


            var filterResult = FilterByPredicate(s => s % 2 == 0, myArray);

        }
    }
}
