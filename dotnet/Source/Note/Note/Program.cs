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
}
