using NUnit.Framework;
using UnitTestNetCore;

namespace UnitTestNetCoreNUnitTests
{
    [TestFixture]
    public class CaculatorNUnitTests
    {
        [Test]
        public void AddNumber_InputTwoInt_GetCorrectAddition()
        {

            // Arrange
            Caculator calc = new();

            // Act
            int result = calc.AddNumbers(10, 20);

            // Assert
            Assert.AreEqual(30, result);
        }

        [Test]
        public void IsOddChecker_InputEvenNmber_ReturnFalse()
        {
            Caculator calc = new();
            
            bool isOdd = calc.IsOddNumber(10);

            Assert.That(isOdd, Is.EqualTo(false));
            Assert.IsFalse(isOdd);
        }

        [Test]
        public void IsOddChecker_InputOffNumber_RetrunTrue()
        {
            Caculator calc = new();
            bool isOdd = calc.IsOddNumber(11);
            Assert.That(!isOdd, Is.EqualTo(true));
            Assert.IsTrue(isOdd);
        }

        [Test]
        [TestCase(11)]
        [TestCase(13)]
        public void IsOddChecker_InputOddNumber_ReturnTrue(int a)
        {
            Caculator calc = new();

            bool isOdd = calc.IsOddNumber(a);
            Assert.That(isOdd, Is.EqualTo(true));
            Assert.IsTrue(isOdd);
        }

        [Test]
        [TestCase(10, ExpectedResult =false)]
        [TestCase(11, ExpectedResult =true)]
        public bool IsOddChecker_InputNumber_ReturnTrueIfOdd(int a)
        {
            Caculator calc = new();
            return calc.IsOddNumber(a);
        }
    }
}