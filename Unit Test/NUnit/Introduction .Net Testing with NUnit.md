# .NET TESTING WITH Nunit 3

- [.NET TESTING WITH Nunit 3](#net-testing-with-nunit-3)
- [1. Understanding NUnit Tests.](#1-understanding-nunit-tests)
  - [1.1 NUnit Attributes overview](#11-nunit-attributes-overview)
  - [2. NUnit Assertions overview](#2-nunit-assertions-overview)
  - [3. The logical Arrange, Act, Assert test phrases.](#3-the-logical-arrange-act-assert-test-phrases)
  - [4. Asserting on different types of results](#4-asserting-on-different-types-of-results)
    - [4.1 The Nunit Constrain Model of Assertings.](#41-the-nunit-constrain-model-of-assertings)
    - [4.2 Asserting on Equality](#42-asserting-on-equality)
    - [4.3 Asserting on reference equality](#43-asserting-on-reference-equality)
    - [4.4 Adding custom failure message.](#44-adding-custom-failure-message)
    - [4.5 Asserting on floating point value.](#45-asserting-on-floating-point-value)
    - [4.6 Asserting on collection content.](#46-asserting-on-collection-content)
    - [4.7 Asserting That Exceptions Are Thrown](#47-asserting-that-exceptions-are-thrown)
    - [4.8 Other Asertion examples](#48-other-asertion-examples)
  - [5. Controlling Test Execution](#5-controlling-test-execution)
    - [5.1 Ignoring Tests](#51-ignoring-tests)
    - [5.2 Organizing tests into categories](#52-organizing-tests-into-categories)
    - [5.3 An Overview of the test execution lifecycle.](#53-an-overview-of-the-test-execution-lifecycle)
    - [5.4 Running Code before and after Each Test](#54-running-code-before-and-after-each-test)
    - [5.5 Running Code before and after Each Test Class](#55-running-code-before-and-after-each-test-class)
  - [6 Creating data driven tests and reducing test code duplication.](#6-creating-data-driven-tests-and-reducing-test-code-duplication)
    - [6.1 Providing Method Level Test Data](#61-providing-method-level-test-data)
    - [6.2 Simplifying TestCase Expected Values](#62-simplifying-testcase-expected-values)
    - [6.3 Sharing Test Data across Multiple Tests](#63-sharing-test-data-across-multiple-tests)
    - [6.4 Reading Test Data from External Sources](#64-reading-test-data-from-external-sources)
    - [6.5 Generating Test Data](#65-generating-test-data)
    - [6.6 Creating Custom Category Attributes](#66-creating-custom-category-attributes)
    - [6.7 Creating Custom constraints](#67-creating-custom-constraints)

# 1. Understanding NUnit Tests.

## 1.1 NUnit Attributes overview

![picture](./images/1.PNG)

## 2. NUnit Assertions overview

`Assert` c?? hai ki???u l?? **Constraint Model (newer)** v?? **Classic Model (older)**.

**Classic Model** v???n ???????c support nh??ng n?? s??? kh??ng ???????c th??m c??c t??nh n??ng m???i.

**Constraint Model** n??n ???????c d??ng v?? s??? ???????c access to??n b??? c??c capabilites c???a NUnit.

![picture](./images/2.PNG)

## 3. The logical Arrange, Act, Assert test phrases.

Trong unit test th?? c?? 3 th??nh ph???n, nh??ng trong tr?????ng h???p th???c t??? kh??ng ph???i l??c n??o ta c??ng ph???i ????? c??? 3 th??nh ph???n b??n d?????i c???.

**Arange:** Set up test object(s), initialize, test data...

**Act:** call method, set property, ...

**Assert:** compare returned value/ end state with exprected.

```c#
[Test]
public void ReturnTermInMonths()
{
    // Arrange
    var sut= new LoanTerm(1);
    // Act
    var numberOfMonths= sut.ToMonths();
    // Assert
    Assert.That(numberOfMonths, Is.EqualTo(12));            
}

```

## 4. Asserting on different types of results

### 4.1 The Nunit Constrain Model of Assertings.

C?? 2 ki???u cho assert.

Th??ng th?????ng

```c#
Assert.That(sut.Years, Is.EqualTo(1));
```

Ho???c 

```c#
Assert.That(sut.Years, new EqualConstraint(1));
```

`Is` l?? m???t abstract class n?? c?? th??? ch???a c??c method sau:

```c#
EqualConstrant()
FalseConstrain()
GreaterThanConstrant()
```

Trong method `That`th?? n?? nh?? sau:

Th?? `TResolveConstraint` l?? m???t base interface m?? c??c ki???u kh??c n?? k??? th???a l???i.

```c#
That<TActual> (TActual actual, TResolveConstraint expression){...}
```

```c#
public class Equalconstraint: Constraint{}

public abstract class Constraint: IConstraint{}

public interface IConstrant: IResolveConstraint{}
```

### 4.2 Asserting on Equality

**Khi ta assert m?? ki???u object th?? ta c???n override l???i method `EqualTo` n???u ta d??ng n?? ????? compare two objects.**

```c#
public override bool Equals(object obj)
{
    if (obj == null || obj.GetType() != GetType())
    {
        return false;
    }

    ValueObject other = (ValueObject)obj;
    IEnumerator<object> thisValues = GetAtomicValues().GetEnumerator();
    IEnumerator<object> otherValues = other.GetAtomicValues().GetEnumerator();

    while (thisValues.MoveNext() && otherValues.MoveNext())
    {
        if (ReferenceEquals(thisValues.Current, null) ^ ReferenceEquals(otherValues.Current, null))
        {
            return false;
        }
        if (thisValues.Current != null && !thisValues.Current.Equals(otherValues.Current))
        {
            return false;
        }
    }
    return !thisValues.MoveNext() && !otherValues.MoveNext();
}

public override int GetHashCode()
{
    return GetAtomicValues()
        .Select(x => x != null ? x.GetHashCode() : 0)
        .Aggregate((x, y) => x ^ y);
}
```
**Sau ???? ta s??? d???ng nh?? sau:**

So so s??nh **a** c?? b???ng **b** hay kh??ng

```c#
[Test]
public void RespectValueEquality()
{
    var a = new LoanTerm(1);
    var b = new LoanTerm(1);

    Assert.That(a, Is.EqualTo(b));
}
```

So so s??nh **a** kh??ng b???ng **b** hay kh??ng

```c#
[Test]
public void RespectValueInequality()
{
    var a = new LoanTerm(1);
    var b = new LoanTerm(2);

    Assert.That(a, Is.Not.EqualTo(b));
}
```

### 4.3 Asserting on reference equality

Ta d??ng `SameAs` ????? ki???m tra cho ki???u d??? li???u object xem c?? c??ng reference hay kh??ng.

```c#
[Test]
public void ReferenceEqualityExample()
{
    var a = new LoanTerm(1);
    var b = a;
    var c = new LoanTerm(1);

    Assert.That(a, Is.SameAs(b));
    Assert.That(a, Is.Not.SameAs(c));

    var x = new List<string> { "a", "b" };
    var y = x;
    var z = new List<string> { "a", "b" };

    Assert.That(y, Is.SameAs(x));
    Assert.That(z, Is.Not.SameAs(x));
}
```

### 4.4 Adding custom failure message.

Test case b??n d?????i ta th??m v??o m???t message **Months should be 12 * number of years** khi test case fail n?? s??? hi???n th??? message n??y.

```c#
[Test]
public void ReturnTermInMonths()
{
    var sut = new LoanTerm(1);

    Assert.That(sut.ToMonths(), Is.EqualTo(12), "Months should be 12 * number of years");
}
```

### 4.5 Asserting on floating point value.

Gi?? tr??? **a** b??n d?????i l?? 0.33333333... n??n trong 2 methods Assert b??n d?????i:

Assert ?????u ti??n ta ch??? ra l?? sai l???ch trong kho???n 0.004

Assert th??? hai l?? sai l???ch trong kho???n 10%

```c#
[Test]
public void Double()
{
    double a = 1.0 / 3.0;

    Assert.That(a, Is.EqualTo(0.33).Within(0.004));
    Assert.That(a, Is.EqualTo(0.33).Within(10).Percent);
}
```

### 4.6 Asserting on collection content.

??o???n code b??n d?????i s??? ki???m tra l?? `comparisons` ???????c t??nh to??n khi tr??? v??? c?? ph???i l?? ch???a 3 ph???n t??? nh?? mong ?????i nh?? c???a `products` hay kh??ng.

```c#
[Test]
public void ReturnCorrectNumberOfComparisons()
{
    var products = new List<LoanProduct>
    {
        new LoanProduct(1, "a", 1),
        new LoanProduct(2, "b", 2),
        new LoanProduct(3, "c", 3)
    };

    var sut = new ProductComparer(new LoanAmount("USD", 200_000m), products);

    List<MonthlyRepaymentComparison> comparisons =
        sut.CompareMonthlyRepayments(new LoanTerm(30));

    Assert.That(comparisons, Has.Exactly(3).Items);
}
```

??o???n code b??n d?????i s??? ki???m tra xem gi?? tr??? c???a `comparions` khi tr??? v??? c?? gi?? tr??? n??o b??? tr??ng hay kh??ng.

```c#
[Test]
public void NotReturnDuplicateComparisons()
{
    var products = new List<LoanProduct>
    {
        new LoanProduct(1, "a", 1),
        new LoanProduct(2, "b", 2),
        new LoanProduct(3, "c", 3)
    };

    var sut = new ProductComparer(new LoanAmount("USD", 200_000m), products);

    List<MonthlyRepaymentComparison> comparisons =
        sut.CompareMonthlyRepayments(new LoanTerm(30));

    Assert.That(comparisons, Is.Unique);
}
```

Trong ??o???n ch????ng tr??nh b??n d?????i s??? ki???m tra xem gi?? tr??? c???a `comparisons` khi tr??? v??? c?? ch???a `exprectedProduct` hay kh??ng. V???i c??ch ti???p c???n n??y ta c???n ph???i bi???t tr?????c v?? ?????nh ngh??a tr?????c gi?? tr??? c???a `exxpectedProduct` ????? c?? th??? th???c hi???n **Assert** nh?? b??n d?????i.

```c#
public void ReturnComparisonForFirstProduct()
{
    var products = new List<LoanProduct>
    {
        new LoanProduct(1, "a", 1),
        new LoanProduct(2, "b", 2),
        new LoanProduct(3, "c", 3)
    };

    var sut = new ProductComparer(new LoanAmount("USD", 200_000m), products);

    List<MonthlyRepaymentComparison> comparisons =
        sut.CompareMonthlyRepayments(new LoanTerm(30));

    // Need to also know the expected monthly repayment
    var expectedProduct = new MonthlyRepaymentComparison("a", 1, 643.28m);

    Assert.That(comparisons, Does.Contain(expectedProduct));
}
```

Trong ??o???n ch????ng tr??nh b??n d?????i v???i **Approach 1**  ta mong mu???n r???ng gi?? tr???n c???a list `comparisons` khi tr??? v??? ch??? c?? m???t ph???n t??? v?? c??c propperties c???a ph???n t??? ???? ph???i c?? c??c gi?? tr??? m?? ta mong mu???n. v???i c??ch ti???p c???n n??y n???u properties c???a object m?? ta c???n test b??? thay ?????i trong t????ng lai, **th?? ta c??ng ph???i thay ?????i c??c t??n c???a c??c properties ???? trong test case**.

V???i **Approach 2** ta s??? ch??? ?????nh model m?? ta c???n test v?? c???n l???y c??c property ra v?? sau ???? l?? th???c hi???n vi???c so s??nh b???ng c??ch g???i t???i lamda expression. (model ch???a c??c properties ??? ????y m?? ta mu???n test c??c gi?? tr??? l?? **MonthlyRepaymentComparison**).

```c#
[Test]
public void ReturnComparisonForFirstProduct_WithPartialKnownExpectedValues()
{
    var products = new List<LoanProduct>
    {
        new LoanProduct(1, "a", 1),
        new LoanProduct(2, "b", 2),
        new LoanProduct(3, "c", 3)
    };

    var sut = new ProductComparer(new LoanAmount("USD", 200_000m), products);

    List<MonthlyRepaymentComparison> comparisons =
        sut.CompareMonthlyRepayments(new LoanTerm(30));

    //Don't care about the expected monthly repayment, only that the product is there
    
    // Approach 1
    Assert.That(comparisons, Has.Exactly(1)
                                .Property("ProductName").EqualTo("a")
                                .And
                                .Property("InterestRate").EqualTo(1)
                                .And
                                .Property("MonthlyRepayment").GreaterThan(0));
    // Approach 2
    Assert.That(comparisons, Has.Exactly(1)
                                .Matches<MonthlyRepaymentComparison>(
                                        item => item.ProductName == "a" &&
                                                item.InterestRate == 1 &&
                                                item.MonthlyRepayment > 0));
}
```

### 4.7 Asserting That Exceptions Are Thrown

Trong ??o???n code b??n d?????i:

**Case 1:** Ki???m tra xem exception b??? throw ra c?? ph???i l?? `ArgumentOutOfRangeException` hay kh??ng

**Case 2:** Nh?? **Case 1** nh??ng th??m l?? l???i ???????c v???t ra v???i **Message** c?? ph???i l?? **Please specify a value greater than 0.\r\nParameter name: years** hay kh??ng.

**Case 3:** Nh?? **Case 2** nh??ng ??? ????y ta thay v?? hard code ch??? ?????nh l?? t??n property l?? **Message**.

**Case 4:** Ki???m tra xem nguy??n nh??n g??y l???i c?? ph???i do **years** hay kh??ng? b???ng c??ch get gi?? tr??? c???a property **ParamName** l?? parameter ???????c g???i v?? g??y ra l???i

**Case 5:** L?? enhence c???a **Case 4** ????? sau n??y d??? maintain code.

```c#
[Test]
public void NotAllowZeroYears()
{
    // Case 1
    Assert.That(() => new LoanTerm(0), Throws.TypeOf<ArgumentOutOfRangeException>());
    
    // Case 2
    Assert.That(() => new LoanTerm(0), Throws.TypeOf<ArgumentOutOfRangeException>()
                        .With
                        .Property("Message")
                        .EqualTo("Please specify a value greater than 0.\r\nParameter name: years"));
    // Case 3
    Assert.That(() => new LoanTerm(0), Throws.TypeOf<ArgumentOutOfRangeException>()
                        .With
                        .Message
                        .EqualTo("Please specify a value greater than 0.\r\nParameter name: years"));
    // Case 4
    // Correct ex and para name but don't care about the message
    Assert.That(() => new LoanTerm(0), Throws.TypeOf<ArgumentOutOfRangeException>()
                        .With
                        .Property("ParamName")
                        .EqualTo("years"));
    // Case 5
    Assert.That(() => new LoanTerm(0), Throws.TypeOf<ArgumentOutOfRangeException>()
                                    .With
                                    .Matches<ArgumentOutOfRangeException>(
                                        ex => ex.ParamName == "years"));
}
```

### 4.8 Other Asertion examples

**Assert v???i NUll value**

```c#
Assert.That(name, Is.null)
Assert.That(name, Is.Not.Null)
```

**Assert v???i string value**

```c#
Assert.That(name, Is.Empty);
Assert.That(name, Is.Not.Empty);

Assert.That(name, Is.EqualTo("abc")) // L??u ?? l?? c?? ph???n bi???t hoa th?????ng
Assert.That(name, Is.EqualTo("abc").IgnoreCase); // Kh??ng ph???n bi???t hoa th?????ng "ABC" v???i "abc" l?? gi???ng nhau.

Assert.That(name, Does.StartWith("ab")) // Ki???m tra chu???i c?? ph???i b???t ?????u b???ng "ab" hay kh??ng
Assert.That(name, Does.EndWith("ab")) // Ki???m tra xem chu???i c?? ph???i k???t th??c b???ng "ab" hay kh??ng

Assert.That(name, Does.Contain("ab")) // Ki???m tra xem chu???i c?? ch???a "ab" hay kh??ng
Assert.That(name, Does.Not.Contain("ab")) // Ki??m tra xem chu???i kh??ng c?? ch???a "ab"

Assert.That(name, Does.StartWith("ab")
                        .And.EndsWith("cd")); // Ki???m tra xem chu???i c?? b???t ?????u v???i "ab" v?? k???t th??c v???i "cd" hay kh??ng

Assert.that(name, Does.StartWith("abc")
                        .Or.EndsWitch("xyz")); // Ki???m tra chu???i c?? b???t ?????u b???ng "abc" ho???c k???t th??c b???ng "xyz"

```

**Asserting on Boolean values**

```c# 
bool isNew = true;
Assert.That(isNew); // pass
Assert.That(isNew, Is.True); // pass

bool areMarried = false;
Assert.That(areMarried == false); // pass
Assert.That(areMarried, Is.False); // pass
Assert.That(areMarried, Is.Not.True); // pass
```

**Asserting within Ranges**

```c#
DateTime d1 = new DateTime(2000, 2, 20);
Datetime d2 = new DateTime(2000, 2, 25);

Assert.That(d1, Is.EqualTo(d2)); // fail
Assert.That(d1, Is.EqualTo(d2).Within(4).Days); // fail
Assert.That(d1, Is.EqualTo(d2).Within(5).Days); pass
```

Xem th??m c??c asertion ??? https://docs.nunit.org/articles/nunit/writing-tests/constraints/Constraints.html


## 5. Controlling Test Execution

### 5.1 Ignoring Tests

????? ingore m???t test case hay m???t test class, ta d??ng attribute `[Ignore("Reason to ingore")] `.

V?? d??? l?? ta ??ang ingoring m???t test case.

```c#
[Test]
[Ignore("Need to complete update work.")]        
public void ReturnTermInMonths()
{
    // Something here...
}
```

### 5.2 Organizing tests into categories

N???u ta mu???n nh??m c??c test cases v??o m???t nh??m l???i v???i nhau ta d??ng `[Category(T??n category)]]` ????? nh??m c??c test cases v??o m???t category v???i nhau. L??c n??y trong m??n h??nh **Test Explorer** s??? nh??m c??c test cases c???a ta theo c??c category.

Ta c?? th??? d??ng attribute n??y cho **Test Class** n???u ta mu???n h???t t???t c??? c??c test cases trong test class ???? c??ng thu???c m???t **Category**.

### 5.3 An Overview of the test execution lifecycle.

Kh??ng gi???ng nh?? c??c unit test framework kh??c (nh?? xUnit) th?? Nunit ch??? t???o m???t instance cho test class, d?? cho test class ???? c?? bao nhi??u test method. (v???i xUnit  th?? ???ng v???i m???i test method s??? ???????c t???o m???i m???t instance c???a test class ????? th???c thi)

Th??? t??? th???c hi???n trong m???t **Test Class**

**Constructor => test case 1 => test case 2 .... test case n=> Dispose (t??? IDisposable)**

Ta c?? th??? can thi???p v??o th??? t???c th???c hi???n tr??n b???ng c??ch th??m v??o **One-time setup**, **Setup**, **TearDown**

Ta c?? th??? xem h??nh sau ????? c?? th??? c?? c??i nh??n bao qu??t h??n.

![picture](./images/3.PNG)

### 5.4 Running Code before and after Each Test

**Before:** Khi m?? ta c?? c??c business l???p ??i l???p l???i nhi???u l???n trong m???i test case th?? ta n??n ?????t n?? v??o ph???n **Setup**, v?? m???i khi execute m???i test case trong test class n?? s??? g???i l???i ph???n setup n??y.

**After:** Khi execute xong m???i test case m?? ta mu???n clear g?? ???? ????? chu???n b??? cho ch???y test case ti???p theo ta implement method c?? attribute l?? `[TearDown]`. N???u test method c???a ta m?? c?? implement **IDispose()** th?? ta c??ng g???i lu??n trong `TearDown`.


```c#
[Category("Product Comparison")]
public class ProductComparerShould
{
    private List<LoanProduct> products;
    private ProductComparer sut;

    [SetUp]
    public void Setup()
    {
        products = new List<LoanProduct>
        {
            new LoanProduct(1, "a", 1),
            new LoanProduct(2, "b", 2),
            new LoanProduct(3, "c", 3)
        };

        sut = new ProductComparer(new LoanAmount("USD", 200_000m), products);
    }

    [TearDown]
    public void TearDown()
    {
        // Runs after each test executes
        // sut.Dispose();
    }

    [Test]        
    public void ReturnCorrectNumberOfComparisons()
    {
        List<MonthlyRepaymentComparison> comparisons =
            sut.CompareMonthlyRepayments(new LoanTerm(30));

        Assert.That(comparisons, Has.Exactly(3).Items);
    }
}
```

### 5.5 Running Code before and after Each Test Class

Khi m?? data ???????c s??? d???ng cho test class ???????c kh??? t???o m???t l???n duy nh???t v?? ???????c s??? d???ng xuy??n s???t cho c??c test case c???a n?? th?? ta d??ng `[OnetimeSetup]`

`[OnetimeSetup]` s??? ???????c g???i tr?????c c??? `[SetUp]` ????? kh???i t???o gi?? tr??? cho test class ????.

Khi ta s??? d???ng data trong `[OnetimeSetup]` th?? c??c data trong ???? s??? ???????c thay ?????i, v?? n???u data trong ???? khi b??? thay ?????i khi th???c thi trong m???t test case n??o ????, th?? test case k??? ti???p khi s??? d???ng data m?? ???????c t???o ra trong `[OnetimeSetup]` s??? b??? ???nh h?????ng k???t qu??.

Khi m?? ta s??? d???ng xong data trong `[OnetimeSetup]` th?? khi ta mu???n despose n?? th?? ta d??ng `[OneTimeTearDown]` ????? th???c hi???n gi???i ph??ng b??? nh???.

```c#
[Category("Product Comparison")]
public class ProductComparerShould
{
    private List<LoanProduct> products;
    private ProductComparer sut;

    [OneTimeSetUp]
    public void OneTimeSetUp()
    {
        // Simulate long setup init time for this list of products
        // We assume that this list will not be modified by any tests
        // as this will potentially break other tests (i.e. break test isolation)
        products = new List<LoanProduct>
        {
            new LoanProduct(1, "a", 1),
            new LoanProduct(2, "b", 2),
            new LoanProduct(3, "c", 3)
        };
    }


    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        // Run after last test in this test class (fixture) executes
        // e.g. disposing of shared expensive setup performed in OneTimeSetUp

        // products.Dispose(); e.g. if products implemented IDisposable
    }

    [SetUp]
    public void Setup()
    {
        sut = new ProductComparer(new LoanAmount("USD", 200_000m), products);
    }

    [TearDown]
    public void TearDown()
    {
        // Runs after each test executes
        // sut.Dispose();
    }

    [Test]        
    public void ReturnCorrectNumberOfComparisons()
    {
        List<MonthlyRepaymentComparison> comparisons =
            sut.CompareMonthlyRepayments(new LoanTerm(30));

        Assert.That(comparisons, Has.Exactly(3).Items);
    }

    // the rest of other test cases below...
}
```

## 6 Creating data driven tests and reducing test code duplication.

### 6.1 Providing Method Level Test Data

Khi ta mu???n test method execute qua m???t t???p d??? li???u test data th?? ta d??ng atribute ``[TestCase(...)]`` b??n trong d???u () ta ch??? ra c??c test data ????? test method d??ng v?? expected result khi d??ng c??c data n??y ch???y qua test method.

B??n d?????i test method ta s??? ch??? ra c??c parameter t????ng ???ng v???i c??c data m?? ta setup trong attribute `TestCase` m?? ta ????? ph??a tr??n.

```c#
[Test]
[TestCase(200_000, 6.5, 30, 1264.14)]
[TestCase(200_000, 10, 30, 1755.14)]
[TestCase(500_000, 10, 30, 4387.86)]
public void CalculateCorrectMonthlyRepayment(decimal principal,
                                                decimal interestRate,
                                                int termInYears,
                                                decimal expectedMonthlyPayment)
{
    var sut = new LoanRepaymentCalculator();

    var monthlyPayment = sut.CalculateMonthlyRepayment(
                                new LoanAmount("USD", principal), 
                                interestRate, 
                                new LoanTerm(termInYears));

    Assert.That(monthlyPayment, Is.EqualTo(expectedMonthlyPayment));
}
```

### 6.2 Simplifying TestCase Expected Values

Thay v?? ta g???i ?????n Assert nh?? c??ch b??n tr??n, th?? ta c?? th??? l??m g???n l???i nh?? b??n d?????i.

Ta ch??? c???n th??m t?????ng m??nh `ExpectedResult` v?? sau ???? trong test method th?? return v??? gi?? tr??? actual result, sau ???? vi???c c??n l???i n?? s??? t??? so s??nh.

```c#
[Test]
[TestCase(200_000, 6.5, 30, ExpectedResult = 1264.14)]
[TestCase(200_000, 10, 30, ExpectedResult = 1755.14)]
[TestCase(500_000, 10, 30, ExpectedResult = 4387.86)]
public decimal CalculateCorrectMonthlyRepayment_SimplifiedTestCase(decimal principal,
                                        decimal interestRate,
                                        int termInYears)
{
    var sut = new LoanRepaymentCalculator();

    return sut.CalculateMonthlyRepayment(
                                new LoanAmount("USD", principal),
                                interestRate,
                                new LoanTerm(termInYears));
}
```

### 6.3 Sharing Test Data across Multiple Tests

????i khi ta c???n sharing hay d??ng chung c??c test case l???i v???i nhau ????? c?? th??? d??ng cho nhi???u test methods ??? c??c test class kh??c nhau th?? ta l??m nh?? sau:

T???o m???t class m?? s??? ch???a c??c `TestCaseData`

```c#
public class MonthlyRepaymentTestData
{
    public static IEnumerable TestCases
    {
        get
        {
            yield return new TestCaseData(200_000m, 6.5m, 30, 1264.14m);
            yield return new TestCaseData(500_000m, 10m, 30, 4387.86m);
            yield return new TestCaseData(200_000m, 10m, 30, 1755.14m);
        }
    }
}
```

Trong test method ta s??? d??ng nh?? sau

```c#
[Test]
[TestCaseSource(typeof(MonthlyRepaymentTestData), "TestCases")]
public void CalculateCorrectMonthlyRepayment_Centralized(decimal principal,
                                        decimal interestRate,
                                        int termInYears,
                                        decimal expectedMonthlyPayment)
{
    var sut = new LoanRepaymentCalculator();

    var monthlyPayment = sut.CalculateMonthlyRepayment(
                                new LoanAmount("USD", principal),
                                interestRate,
                                new LoanTerm(termInYears));

    Assert.That(monthlyPayment, Is.EqualTo(expectedMonthlyPayment));
}
```

?????i v???i test method m?? ta vi???t theo ki???u c?? return th?? ta l??m nh?? sau:

T???o m???t class c?? ch???a c??c `TestCaseData`, ta ch?? ?? v??o `.Returns(1264.14)` ????y ch??nh l?? expected value c???a b??? test data ???ng v???i t???ng `TestCaseData`.

```c#
public class MonthlyRepaymentTestDataWithReturn
{
    public static IEnumerable TestCases
    {
        get
        {
            yield return new TestCaseData(200_000m, 6.5m, 30).Returns(1264.14);
            yield return new TestCaseData(200_000m, 10m, 30).Returns(1755.14);
            yield return new TestCaseData(500_000m, 10m, 30).Returns(4387.86);
        }
    }
}
```
Trong test method ta d??ng nh?? sau:

```c#
[Test]
[TestCaseSource(typeof(MonthlyRepaymentTestDataWithReturn), "TestCases")]
public decimal CalculateCorrectMonthlyRepayment_CentralizedWithReturn(decimal principal,
                                decimal interestRate,
                                int termInYears)
{
    var sut = new LoanRepaymentCalculator();

    return sut.CalculateMonthlyRepayment(
                                new LoanAmount("USD", principal),
                                interestRate,
                                new LoanTerm(termInYears));
}
```

### 6.4 Reading Test Data from External Sources

????? ?????c c??c tets data t?? m???t file n??o ???? ta l??m nh?? sau:

**L??u ??:** Khi ta add file ch???a c??c test data th?? ta ph???i ch???n property **Copy to Output Directory** l?? *Copy if newer*

????? ?????c data t??? CSV ch???n h???n ta c?? th??? s??? d???ng library **CSV Helper libray**.

Ta tham kh???o ??o???n code b??n d?????i d??ng ????? t???o TestCaseData t??? file CSV

```c#
public class MonthlyRepaymentCsvData
{
    public static IEnumerable GetTestCases(string csvFileName)
    {
        var csvLines = File.ReadAllLines(csvFileName);

        var testCases = new List<TestCaseData>();

        foreach (var line in csvLines)
        {
            string[] values = line.Replace(" ", "").Split(',');

            decimal principal = decimal.Parse(values[0]);
            decimal interestRate = decimal.Parse(values[1]);
            int termInYears = int.Parse(values[2]);
            decimal expectedRepayment = decimal.Parse(values[3]);

            testCases.Add(new TestCaseData(principal, interestRate, termInYears, expectedRepayment));
        }

        return testCases;
    }
}
```

Khi ta s??? d???ng trong test method s??? nh?? sau:

Trong ???? `new object[] { "Data.csv" }` l?? t??n c???a file ch???a test case m?? ta mu???n ?????c ra

```c#
[Test]
[TestCaseSource(typeof(MonthlyRepaymentCsvData), "GetTestCases", new object[] { "Data.csv" })]
public void CalculateCorrectMonthlyRepayment_Csv(decimal principal,
                                decimal interestRate,
                                int termInYears,
                                decimal expectedMonthlyPayment)
{
    var sut = new LoanRepaymentCalculator();

    var monthlyPayment = sut.CalculateMonthlyRepayment(
                                new LoanAmount("USD", principal),
                                interestRate,
                                new LoanTerm(termInYears));

    Assert.That(monthlyPayment, Is.EqualTo(expectedMonthlyPayment));
}
```

### 6.5 Generating Test Data

????? test c??c data v???i m???t t???p d??? li???u m?? ta bi???t tr?????c range c???a n?? (gi?? tr??? b???t ?????u, gi?? tr??? k???t th??c v?? kho???n c??ch gi??? 2 gi?? tr??? l?? bao nhi???u (b?????c nh???y)) th?? ta d??ng attribute `Range` ????? t???o ra test data.

**Case 1** NUnit s??? t???o m???t b??? combination c??c test data v???i nhau, nh?? trong tr?????ng h???p b??n d?????i s??? c?? 27 test cases ???????c t???o ra v???i t???p d??? li???u b??n d?????i. V???i Approach n??y s??? th??ch h???p v???i vi???c ta mu???n ki???m tra xem c?? exeption n??o b??? throw ra hay kh??ng khi run test.

**Case 2** Khi s??? d???ng v???i atribute `[Sequential]` th?? Unuit s??? kh??ng ??i combine c??c test data v???i nhau m?? ch??? s??? d???ng c??c test data m?? ta ch??? ra, nh?? trong demo b??n d?????i th?? ch??? c?? 3 test data m?? ta ch??? ?????nh ra.

**Case 3** ??? tr?????ng h???p n??y ta d??ng `[Range(50_000, 1_000_000, 50_000)]decimal principal,` th?? gi?? tr??? s??? b???t ?????u l?? 50.000 v?? k???t th??c l?? 1.000.000 v?? b?????c nh???y l?? 50.000. NUnit s??? d???a v??o ???? m?? t???o ra m???t t???p d??? li???u cho test data c???a gi?? tr??? c???a **principal** value.


```c#

// Case 1
[Test]
public void CalculateCorrectMonthlyRepayment_Combinatorial(
    [Values(100_000, 200_000, 500_000)]decimal principal,
    [Values(6.5, 10, 20)]decimal interestRate,
    [Values(10, 20, 30)]int termInYears)
{
    var sut = new LoanRepaymentCalculator();

    var monthlyPayment = sut.CalculateMonthlyRepayment(
        new LoanAmount("USD", principal), interestRate, new LoanTerm(termInYears));
}

// Case 2
[Test]
[Sequential]
public void CalculateCorrectMonthlyRepayment_Sequential(
            [Values(200_000, 200_000, 500_000)]decimal principal,
            [Values(6.5, 10, 10)]decimal interestRate,
            [Values(30, 30, 30)]int termInYears,
            [Values(1264.14, 1755.14, 4387.86)]decimal expectedMonthlyPayment)
{
    var sut = new LoanRepaymentCalculator();

    var monthlyPayment = sut.CalculateMonthlyRepayment(
        new LoanAmount("USD", principal), interestRate, new LoanTerm(termInYears));

    Assert.That(monthlyPayment, Is.EqualTo(expectedMonthlyPayment));
}

// Case 3
[Test]
public void CalculateCorrectMonthlyRepayment_Range(
    [Range(50_000, 1_000_000, 50_000)]decimal principal,
    [Range(0.5, 20.00, 0.5)]decimal interestRate,
    [Values(10, 20, 30)]int termInYears)
{
    var sut = new LoanRepaymentCalculator();

    sut.CalculateMonthlyRepayment(
        new LoanAmount("USD", principal), interestRate, new LoanTerm(termInYears));
}
```

### 6.6 Creating Custom Category Attributes

????? t???o m???t custom attribute cho test class hay test method ta l??m nh?? sau

```c#
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
class ProductComparisonAttribute : CategoryAttribute
{
}
```

Sau ???? ta g???i ra s??? d???ng nh?? sau:

```c#
[ProductComparison]
public class MonthlyRepaymentComparisonShould
{
    [Test]        
    public void RespectValueEquality()
    {
        var a = new MonthlyRepaymentComparison("a", 42.42m, 22.22m);
        var b = new MonthlyRepaymentComparison("a", 42.42m, 22.22m);

        Assert.That(a, Is.EqualTo(b));
    }

    [Test]        
    public void RespectValueInequality()
    {
        var a = new MonthlyRepaymentComparison("a", 42.42m, 22.22m);
        var b = new MonthlyRepaymentComparison("a", 42.42m, 23.22m);

        Assert.That(a, Is.Not.EqualTo(b));
    }
}
```

### 6.7 Creating Custom constraints

T???o class `MonthlyRepaymentGreaterThanZeroConstraint`

```c#
class MonthlyRepaymentGreaterThanZeroConstraint : Constraint
{
    public string ExpectedProductName { get; }
    public decimal ExpectedInterestRate { get; }

    public MonthlyRepaymentGreaterThanZeroConstraint(string expectedProductName, 
                                                        decimal expectedInterestRate)
    {
        ExpectedProductName = expectedProductName;
        ExpectedInterestRate = expectedInterestRate;
    }

    public override ConstraintResult ApplyTo<TActual>(TActual actual)
    {
        MonthlyRepaymentComparison comparison = actual as MonthlyRepaymentComparison;

        if (comparison is null)
        {
            return new ConstraintResult(this, actual, ConstraintStatus.Error);
        }

        if (comparison.InterestRate == ExpectedInterestRate && 
            comparison.ProductName == ExpectedProductName && 
            comparison.MonthlyRepayment > 0)
        {
            return new ConstraintResult(this, actual, ConstraintStatus.Success);
        }

        return new ConstraintResult(this, actual, ConstraintStatus.Failure);
    }
}
```

Sau ???? ta s??? d???ng nh?? sau:

```c#
[Test]
public void ReturnComparisonForFirstProduct_WithPartialKnownExpectedValues()
{
    List<MonthlyRepaymentComparison> comparisons =
        sut.CompareMonthlyRepayments(new LoanTerm(30));

    //Assert.That(comparisons, Has.Exactly(1)
    //                            .Matches<MonthlyRepaymentComparison>(
    //                                    item => item.ProductName == "a" &&
    //                                            item.InterestRate == 1 &&
    //                                            item.MonthlyRepayment > 0));

    Assert.That(comparisons,
                Has.Exactly(1)
                    .Matches(new MonthlyRepaymentGreaterThanZeroConstraint("a", 1)));

}
```