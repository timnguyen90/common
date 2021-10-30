using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Note
{
    static class ExtensionClass
    {
        public static void Print(this string s, ConsoleColor color)
        {
            Console.ForegroundColor = color;
            Console.WriteLine(s);
        }
    }

    public class JsonTemplateBuilder
    {
        private Dictionary<string, string> _options = new Dictionary<string, string>();

        public JsonTemplateBuilder Add(string key, string value)
        {
            if (!_options.ContainsKey(key))
                _options.Add(key, value);
            return this;
        }
        public string Build()
        {
            return $"{{{JsonConvert.SerializeObject(_options)}}}";
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string s = "Hello World !";
            s.Print(ConsoleColor.Yellow);

            var mystring = new JsonTemplateBuilder()
                   .Add("timestamp", "UtcDateTime(@t)")
                   .Add("timestamp", " @m")
                   .Add("abc", "@bcd")
                   .Add("1", "@11")
                   .Add("2", "@22")
                   .Build();

            Console.WriteLine(mystring);
            Console.ReadLine();
        }
    }
}
