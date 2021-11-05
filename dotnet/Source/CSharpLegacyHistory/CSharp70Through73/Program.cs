using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq;
using static System.Console;

namespace CSharp70Through73
{
    /// <summary>
    /// Reference: https://docs.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-7#tuples-and-discards
    /// </summary>

    public class Point
    {
        public Point(double x, double y)
            => (X, Y) = (x, y);

        // Thật ra bạn có thể hoàn toàn viết lại cho tường minh như sau:
        //public Point(double x, double y)
        //{
        //    (X, Y) = (x, y);
        //}

        public double X { get; }
        public double Y { get; }

        public void Deconstruct(out double x, out double y) =>
            (x, y) = (X, Y);

        // Bạn có thể viết lại tường minh như sau:
        //public void Deconstruct(out double x, out double y)
        //{
        //    (x, y) = (X, Y);
        //}
    }

    public static class TuplesAndDiscard
    {
        private static int Plus(int a, int b)
        {
            return (a + b);
        }

        private static int Subtract(int a, int b)
        {
            return (a - b);
        }

        private static (int max, int min) Range(int[]numbers)
        {
            (int max, int min) resultTuple = (numbers.Max(),numbers.Min());
            return resultTuple;
        }

        private static (string, double, int, int, int, int) QueryCityDataForYears(string name, int year1, int year2)
        {
            int population1 = 0, population2 = 0;
            double area = 0;

            if (name == "New York City")
            {
                area = 468.48;
                if (year1 == 1960)
                {
                    population1 = 7781984;
                }
                if (year2 == 2010)
                {
                    population2 = 8175133;
                }
                return (name, area, year1, population1, year2, population2);
            }

            return ("", 0, 0, 0, 0, 0);
        }

        public static void Demo1()
        {
            (string Alpha, string Beta) namedLetters = ("a", "b");
            WriteLine($"{namedLetters.Alpha}, {namedLetters.Beta}");
            ReadLine();
        }

        public static void Demo2()
        {
            (int plusResult, int substractResult) resultObject = (Plus(2,2),Subtract(5,3));
            WriteLine($"{resultObject.plusResult}, {resultObject.substractResult}");
            ReadLine();

        }

        public static void Demo3()
        {
            var alphabetStart = (Alpha: "a", Beta: "b");
            Console.WriteLine($"{alphabetStart.Alpha}, {alphabetStart.Beta}");
        }

        /// <summary>
        /// Deconstructing the tuple
        /// </summary>
        public static void Demo4()
        {
            var numbers = new[] {2, 3, 4, 5, 1};
            (int max, int min) = Range(numbers);
            WriteLine(max);
            WriteLine(min);
            ReadLine();
        }

        public static void Demo5()
        {
            var p = new Point(3.14, 2.71);
            (double X, double Y) = p;
            WriteLine("Before change: ");
            WriteLine(X);
            WriteLine(Y);

            WriteLine("After change: ");
            X = 2;
            Y = 1;
            WriteLine(X);
            WriteLine(Y);

            WriteLine("Object Point after deconstruction: ");
            WriteLine(p.X);
            WriteLine(p.Y);

            ReadLine();
        }

        public static void Demo6()
        {
            int count = 5;
            string label = "Colors used in the map";
            var pair = (count, label); 
            WriteLine(pair.count);
            WriteLine(pair.label);
            ReadLine();
        }

        public static void Demo7()
        {
            var (_, _, _, pop1, _, pop2) = QueryCityDataForYears("New York City", 1960, 2010);

            Console.WriteLine($"Population change, 1960 to 2010: {pop2 - pop1:N0}");
            ReadLine();
        }
    }

    public static class PatternMatching
    {
        public static void Demo1()
        {
            // Từ khóa is trước đây chỉ dùng được cho kiểu reference type
            // nhưng giờ được sử dụng được cho kiểu value type.
            int input = 1;
            int sum = 0;
            if (input is int count)
            {
                sum += count;
            }

            WriteLine(sum);
            ReadLine();
        }
    }

    public class OldOrderBL
    {
        public Guid OrderId { get; set; }
        public int OrderType { get; set; }
        public DateTime OrderDate { get; set; }
        //Other properties relevant to the Order class goes here
        public OldOrderBL InitializeOrder(Guid OrderId)
        {
            if (OrderId == Guid.Empty)
                OrderId = Guid.NewGuid();
            else
                this.OrderId = OrderId;
            OrderType = 2;
            OrderDate = DateTime.Now;
            return this;
        }
        public void ValidateOrder(Guid OrderId)
        {
            //Write your code to validate the order here
        }
        public void SearchOrder(Guid OrderId)
        {
            //Write your code here to search an order in the database.
        }
        public void ProcessOrder()
        {
            //Write your code here to process an order.
        }
        public void CancelOrder(Guid OrderId)
        {
            //Write your code here to cancel an order.
        }
        public void SaveOrder()
        {
            //Write your code here to save order information in the db.
        }
    }

    public class NewOlderBL
    {
        Guid OrderId { get; set; }
        int OrderType { get; set; }
        DateTime OrderDate { get; set; }
        //Other properties relevant to the Order class goes here
        public NewOlderBL InitializeOrder(Guid OrderId)
        {
            if (OrderId == Guid.Empty)
                OrderId = Guid.NewGuid();
            else
                this.OrderId = OrderId;
            OrderType = 2;
            OrderDate = DateTime.Now;
            return this;
        }
        public NewOlderBL ValidateOrder(Guid OrderId)
        {
            return this;
            //Write your code to validate the order here
        }
        public NewOlderBL SearchOrder(Guid OrderId)
        {
            return this;
            //Write your code here to search an order in the database.
        }
        public NewOlderBL ProcessOrder()
        {
            return this;
            //Write your code here to process an order.
        }
        public void CancelOrder(Guid OrderId)
        {
            //Write your code here to cancel an order.
        }
        public void SaveOrder()
        {
            //Write your code here to save order information in the db.
        }
    }

    static class Program
    {
        static void Main(string[] args)
        {
            //TuplesAndDiscard.Demo7();
            Guid OrderId = Guid.Parse("9043f30c-446f-421f-af70-234fe8f57c0d");
            OldOrderBL orderBL = new OldOrderBL();
            orderBL.InitializeOrder(OrderId);
            orderBL.ValidateOrder(OrderId);
            orderBL.ProcessOrder();
            orderBL.SaveOrder();
            Console.ReadKey();

            // Method chain
            Guid NewOrderId = Guid.Parse("9043f30c-446f-421f-af70-234fe8f57c0d");
            NewOlderBL NewOrderBL = new NewOlderBL();
            orderBL.InitializeOrder(OrderId).ValidateOrder(OrderId).
            ProcessOrder().SaveOrder();
            Console.ReadKey();

        }
    }
}
