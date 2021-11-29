using Microsoft.VisualStudio.TestTools.UnitTesting;
using UnitTestNetCore;

namespace UnitTestNetCoreMsTest
{
    [TestClass]
    public class CaculatorTests
    {
        [TestMethod]
        public void AddNumber_InputTwoInt_GetCorrectAddition()
        {
            // Arrange
            Caculator calc = new();

            // Act
            int result = calc.AddNumbers(10, 20);

            // Assert
            Assert.AreEqual(30, result);
        }

    }
}