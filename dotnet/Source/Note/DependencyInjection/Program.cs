using System;

namespace DependencyInjection
{
    class ClassA
    {
        public void ActionA() => Console.WriteLine("Action in ClassA");
    }

    class ClassB
    {
        public void ActionB()
        {
            Console.WriteLine("Action in ClassB");
            var a = new ClassA();
            a.ActionA();
        }
    }
    class Program
    {
        static void Main(string[] args)
        {
            var b = new ClassB();
            b.ActionB();
        }
    }
}
