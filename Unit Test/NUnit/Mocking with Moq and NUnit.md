# Mocking with Moq and NUnit

- [Mocking with Moq and NUnit](#mocking-with-moq-and-nunit)
  - [3 Configuring Mock Method Return Values](#3-configuring-mock-method-return-values)
    - [3.1 Configuring Mock Object Method Return Values](#31-configuring-mock-object-method-return-values)
    - [3.2 Argument Matching in Mocked Methods](#32-argument-matching-in-mocked-methods)
    - [3.3 Mocking Methods with out Parameters](#33-mocking-methods-with-out-parameters)
    - [3.4 Mocking Methods with ref Parameters](#34-mocking-methods-with-ref-parameters)
    - [3.5 Configuring Mock Methods to Return Null](#35-configuring-mock-methods-to-return-null)
  - [4 Working with mock properties.](#4-working-with-mock-properties)
    - [4.1 Configuring a Mocked Property to Return a Specified Value](#41-configuring-a-mocked-property-to-return-a-specified-value)
    - [4.2 Manually Mocking Property Hierarchies](#42-manually-mocking-property-hierarchies)
    - [4.3 Auto Mocking Property Hierarchies](#43-auto-mocking-property-hierarchies)
    - [4.4 Configuring Mock Properties to Track Changes](#44-configuring-mock-properties-to-track-changes)
    - [4.5 Enabling Change Tracking for All Mocked Properties](#45-enabling-change-tracking-for-all-mocked-properties)
  - [5 Checking That Mock Methods and Properties Are Used](#5-checking-that-mock-methods-and-properties-are-used)
    - [5.1 Verifying a Method Where No Parameters Were Called](#51-verifying-a-method-where-no-parameters-were-called)
    - [5.3 Verifying a Method Was Called a Specific Number of Times](#53-verifying-a-method-was-called-a-specific-number-of-times)
    - [5.4 Verifying Property Setter and Getters Were Called](#54-verifying-property-setter-and-getters-were-called)
    - [5.5 Verifying That No Unexpected Calls Were Made](#55-verifying-that-no-unexpected-calls-were-made)
  - [6. Using Partial Mocks and Advanced Mocking Techniques](#6-using-partial-mocks-and-advanced-mocking-techniques)
    - [6.1 Understanding Strict Mocks](#61-understanding-strict-mocks)
    - [6.2 Throwing Exceptions from Mock Objects](#62-throwing-exceptions-from-mock-objects)
    - [6.3 Raising Events from Mock Objects](#63-raising-events-from-mock-objects)
    - [6.4 Understanding Partial Mocks](#64-understanding-partial-mocks)
    - [6.5 Mocking Nondeterministic Code Such as DateTime.Now](#65-mocking-nondeterministic-code-such-as-datetimenow)
    - [6.6 Mocking Protected Members of Partial Mocks](#66-mocking-protected-members-of-partial-mocks)
    - [6.7 An Alternative to Using Partial Mocks](#67-an-alternative-to-using-partial-mocks)

## 3 Configuring Mock Method Return Values

### 3.1 Configuring Mock Object Method Return Values

Trong đoạn code bên dưới, ta setup cho method **Validate** của **IIdentityVerifier** sẽ trả về **true** nếu các params của nó lần lượt là *Sarah*, *25*, *"133 Pluralsight Drive, Draper, Utah"*

```c#
mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);
```

Nếu ta đổi đoạn code trên thành 

```c#
mockIdentityVerifier.Setup(x => x.Validate("Sarah 2",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);
```

Thì method **Validate** mà ta setup sẽ không tra về **true** mà sẽ là **false** bởi vì application bên trên có tên là **Sarah**

```c#
var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);
```

Test case đầy đủ như bên dưới.

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();
    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);

    var mockCreditScorer = new Mock<ICreditScorer>();

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 3.2 Argument Matching in Mocked Methods

Khi ta thay đổi thành `It.IsAny<>()` thì sẽ không còn check giá trị của parameter mà ta truyền vào cho method mà ta cần setup, mà lúc này nó chỉ check type của parameter thôi.

Ta cần cẩn thận khi sử dụng `It.IsAny<>()` vì giá trị của `.Returns();` lúc nào cũng trả về đúng với giá trị mà ta setup, nó sẽ không phụ thuộc vào việc tính toán các giá trị của parameter truyền vào.

```c#
 mockIdentityVerifier.Setup(x => x.Validate(It.IsAny<string>(),
                                                It.IsAny<int>(),
                                                It.IsAny<string>()))
                        .Returns(true);
```

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();
    mockIdentityVerifier.Setup(x => x.Validate(It.IsAny<string>(),
                                                It.IsAny<int>(),
                                                It.IsAny<string>()))
                        .Returns(true);
    
    var mockCreditScorer = new Mock<ICreditScorer>();

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 3.3 Mocking Methods with out Parameters

Khi ta cần mock cho một function mà function đó trả về giá trị bằng cách dùng reference trong parameter, ví dụ như function bên dưới

```c#
 void Validate(string applicantName, 
                      int applicantAge, 
                      string applicantAddress, 
                      out bool isValid);
```

Thì ta làm như sau:

Khai báo một biến và gán giá trị mà ta muốn trả về, sau đó trong **Setup** ta đặt biến đó vào danh sách parameter tương ứng như bên dưới

```c#
bool isValidOutValue = true;
mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah",
                                                out isValidOutValue));
```

Test case đầy đủ cho trường hợp này

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();
    
    bool isValidOutValue = true;
    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah",
                                                out isValidOutValue));


    var mockCreditScorer = new Mock<ICreditScorer>();

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 3.4 Mocking Methods with ref Parameters

Khi ta làm việc với function mà có parameter là `ref` như function bên dưới

```c#
 void Validate(string applicantName, 
                      int applicantAge, 
                      string applicantAddress, 
                      ref IdentityVerificationStatus status);
```

Để mock với dạng functon này ta làm như sau:

Khai báo một delegate giống với function mà ta cần mock bên ngoài test method.

```c#
delegate void ValidateCallback(string applicantName, 
                                int applicantAge, 
                                string applicantAddress, 
                                ref IdentityVerificationStatus status);
```

Sau đó ta dùng `.CallBack()` của NUnit để gọi lại, và parameter trong function chính ta sẽ thiết lập nó là `ref It.Ref<IdentityVerificationStatus>.IsAny` để không check giá trị của parameter.

```c#
mockIdentityVerifier
            .Setup(x => x.Validate("Sarah", 
                                    25, 
                                    "133 Pluralsight Drive, Draper, Utah", 
                                    ref It.Ref<IdentityVerificationStatus>.IsAny))
            .Callback(new ValidateCallback(
                        (string applicantName, 
                            int applicantAge, 
                            string applicantAddress, 
                            ref IdentityVerificationStatus status) => 
                                        status = new IdentityVerificationStatus(true)));
```

Test case đầy đủ 

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();
    
    mockIdentityVerifier
        .Setup(x => x.Validate("Sarah", 
                                25, 
                                "133 Pluralsight Drive, Draper, Utah", 
                                ref It.Ref<IdentityVerificationStatus>.IsAny))
        .Callback(new ValidateCallback(
                    (string applicantName, 
                        int applicantAge, 
                        string applicantAddress, 
                        ref IdentityVerificationStatus status) => 
                                    status = new IdentityVerificationStatus(true)));


    var mockCreditScorer = new Mock<ICreditScorer>();

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 3.5 Configuring Mock Methods to Return Null

Bên ngoài test method ta tạo một interface/class giả.

```c#
public interface INullExample
{
    string SomeMethod();
}
```

Test case minh họa

Theo mặc định của NUnit nếu ta setup mà không chỉ ra trả về là gì thì NUnit sẽ trả về null. nên ta thấy bên dưới sẽ không cần gọi tới `.Returns()`.

```c#
[Test]
public void NullReturnExample()
{
    var mock = new Mock<INullExample>();

    mock.Setup(x => x.SomeMethod());
        //.Returns<string>(null);

    string mockReturnValue = mock.Object.SomeMethod();

    Assert.That(mockReturnValue, Is.Null);
}
```

## 4 Working with mock properties.

### 4.1 Configuring a Mocked Property to Return a Specified Value

Để trả về một giá trị cụ thể của một method hay của một property ta làm như sau:

Trong đoạn code `mockCreditScorer.Setup(x => x.Score).Returns(300);` ta nói rằng ta muốn setup property **Score** của `ICreditScorer` khi được gọi thì sẽ trả về giá trị là **300**.

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);

    var mockCreditScorer = new Mock<ICreditScorer>();

    mockCreditScorer.Setup(x => x.Score).Returns(300);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 4.2 Manually Mocking Property Hierarchies

Để setup mock cho các property lồng nhau thì ta làm như sau:

Ta setup mock cho thằng con sau đó setup mock cho thằng cha bằng việc return về giá trị của setup mock của con.

Trong trường hợp này: 

* `ScoreValue` là con của `ScoreResult`

* `ScoreResult` là con của `ICreditScorer`

Ta sẽ có thứ tự mock như sau:

```c#
    var mockCreditScorer = new Mock<ICreditScorer>();

    var mockScoreValue = new Mock<ScoreValue>();
    mockScoreValue.Setup(x => x.Score).Returns(300);

    var mockScoreResult = new Mock<ScoreResult>();
    mockScoreResult.Setup(x => x.ScoreValue).Returns(mockScoreValue.Object);

    mockCreditScorer.Setup(x => x.ScoreResult).Returns(mockScoreResult.Object);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);
```

Test method đầy đủ:

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);

    var mockCreditScorer = new Mock<ICreditScorer>();

    var mockScoreValue = new Mock<ScoreValue>();
    mockScoreValue.Setup(x => x.Score).Returns(300);

    var mockScoreResult = new Mock<ScoreResult>();
    mockScoreResult.Setup(x => x.ScoreValue).Returns(mockScoreValue.Object);

    mockCreditScorer.Setup(x => x.ScoreResult).Returns(mockScoreResult.Object);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 4.3 Auto Mocking Property Hierarchies

Ta thấy rằng cả `ScoreResult` và `ScoreValue` điều là `virtual`

```c#
public class ScoreResult
{
    public virtual ScoreValue ScoreValue { get; }
}

public class ScoreValue
{
    public virtual int Score { get; }
}
```
nên ta có thể viết ngắn gọn lại như sau cho việc mock 2 objects này

```c#
mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
```

Nếu ta khai báo trong lúc khởi tạo bằng `DefaultValue.Mock` thì các thằng con bên trong của nó sẽ là giá trị mặc định của kiểu dữ liệu đó mà không phải là null. Nếu ta chọn option là `DefaultValue.Empty` thì sẽ là null.

```c#
var mockCreditScorer = new Mock<ICreditScorer> { DefaultValue = DefaultValue.Mock};
```

Test case đầy đủ như sau:

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer> { DefaultValue = DefaultValue.Mock};

    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
}
```

### 4.4 Configuring Mock Properties to Track Changes

Khi ta muốn track change sự thay đổi của một property thì ta chỉ cần sử dụng `.SetupProperty()`. Trong method này nó có 2 overloads là

* Chỉ truyền vào property cần trak change.

* Truyền vào property cần track change và giá trị khởi tạo nó, ví dụ ``.SetupProperty(x => x.count, 10)`` thì khi chạy xong thì biến count sẽ được thay đổi thành 11.

Test case đầy đủ cho trường hợp này:

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();

    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
    mockCreditScorer.SetupProperty(x => x.Count);


    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
    Assert.That(mockCreditScorer.Object.Count, Is.EqualTo(1));
}
```

### 4.5 Enabling Change Tracking for All Mocked Properties

Nếu ta muốn track change cho tất cả các properties thì ta làm như sau:

Ta gọi đến `mockCreditScorer.SetupAllProperties();` . Ta cần chú ý rằng, nếu trước đó ta có gọi đến .Setup cho bất kỳ properties nào thì khi gọi đến `SetupAllProperties()` nó sẽ override lại giá trị. Do vậy, ta cần chắc chắn rằng `mockCreditScorer.SetupAllProperties();` được gọi trước tiên khi ta Setup các mock object.

Test case đầy đủ cho trường hợp này

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();

    mockCreditScorer.SetupAllProperties();

    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
    //mockCreditScorer.SetupProperty(x => x.Count);

    

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    Assert.That(application.GetIsAccepted(), Is.True);
    Assert.That(mockCreditScorer.Object.Count, Is.EqualTo(1));
}
```

## 5 Checking That Mock Methods and Properties Are Used

### 5.1 Verifying a Method Where No Parameters Were Called

Ở dòng code `mockIdentityVerifier.Verify(x => x.Initialize());` sẽ check liệu rằng method `Initialize()` có được gọi ở trong `sut.Process(application);` bởi vì trong method `Process(application)` có call tới  method `Initialize()` (call ở dòng `_identityVerifier.Initialize();` bên dưới).

Ta có thể thấy function `Process(application)` như sau:

```c#
public void Process(LoanApplication application)
{
    if (application.GetApplicantSalary() < MinimumSalary)
    {
        application.Decline();
        return;
    }

    if (application.GetApplicantAge() < MinimumAge)
    {
        application.Decline();
        return;
    }

    _identityVerifier.Initialize();

    var isValidIdentity = _identityVerifier.Validate(application.GetApplicantName(),
                                                        application.GetApplicantAge(),
                                                        application.GetApplicantAddress());

    if (!isValidIdentity)
    {
        application.Decline();
        return;
    }


    _creditScorer.CalculateScore(application.GetApplicantName(),
                                    application.GetApplicantAddress());

    _creditScorer.Count++;

    if (_creditScorer.ScoreResult.ScoreValue.Score < MinimumCreditScore)
    {
        application.Decline();
        return;
    }

    application.Accept();
}
```
Test case đầy đủ: 

```c#
[Test]
public void InitializeIdentityVerifier()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();
    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    mockIdentityVerifier.Verify(x => x.Initialize());
}

````

### 5.2 Verifying a Method Where a Parameter Was Called

Trong đoạn code `mockCreditScorer.Verify(x => x.CalculateScore("Sarah", "133 Pluralsight Drive, Draper, Utah"));`
nó sẽ verify là method `CalculateScore` được thi trong method `Process(application)` với các parameter là `"Sarah", "133 Pluralsight Drive, Draper, Utah"`. Nếu function `CalculateScore` được gọi nhưng khác các parameters trên thì test case vẫn fail.

Nếu `mockCreditScorer.Verify(x => x.CalculateScore(It.IsAny<string>, It.IsAny<string>)` thì test case sẽ bỏ qua parameter, nó sẽ luôn luôn pass khi method `CalculateScore` được thực thi. 

```c#
[Test]
public void CalculateScore()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();
    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    mockCreditScorer.Verify(x => x.CalculateScore("Sarah", "133 Pluralsight Drive, Draper, Utah"));
}
```

### 5.3 Verifying a Method Was Called a Specific Number of Times

Ta có thể kiểm tra xem method được call bao nhiêu lần

Trong test case bên dưới ta expected là method `CalculateScore()` được gọi 1 lần duy nhất

```c#
 mockCreditScorer.Verify(x => x.CalculateScore(
                            "Sarah", "133 Pluralsight Drive, Draper, Utah"),
                            Times.Once);
```

Test case đầy đủ

```c#
[Test]
public void CalculateScore()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();
    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    mockCreditScorer.Verify(x => x.CalculateScore(
                            "Sarah", "133 Pluralsight Drive, Draper, Utah"),
                            Times.Once);
}
```

### 5.4 Verifying Property Setter and Getters Were Called

Đôi khi ta cần kiểm tra là một property có được **get** hay **set** dữ liệu hay không? nếu **set** thì được **set** giá trị bao nhiêu
`mockCreditScorer.VerifyGet(x => x.ScoreResult.ScoreValue.Score, Times.Once);` Ta expect rằng **Score** sẽ được get và get một lần duy nhất.

`mockCreditScorer.VerifyGet(x => x.ScoreResult.ScoreValue.Score);` Ta expect rằng **Score** sẽ được get và không quan trọng số lần

`mockCreditScorer.VerifySet(x => x.Count = It.IsAny<int>(), Times.Once);` Ta expect rằng **Score** sẽ được Set dữ liệu ( bất kỳ giá trị nào cũng được) và được set 1 lần duy nhất.

`mockCreditScorer.VerifySet(x => x.Count = It.IsAny<int>());` Ta expect rằng **Score** sẽ được Set dữ liệu và không quan trọng giá trị gì và set bao nhiều lần.

`mockCreditScorer.VerifySet(x => x.Count = 1);` Ta expect rằng **Score** sẽ được set dữ liệu và giá trị được set là **1**.

Ta nên chú ý vào việc ta verify dữ liệu, bởi vì có thể ta sẽ bị trùng ví dụ như `Assert.That(mockCreditScorer.Object.Count, Is.EqualTo(1));`, ở lệnh này nó đã check là **Count** có bằng 1 hay không.


```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();

    mockCreditScorer.SetupAllProperties();

    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
    //mockCreditScorer.SetupProperty(x => x.Count);

    

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    mockCreditScorer.VerifyGet(x => x.ScoreResult.ScoreValue.Score, Times.Once);
    mockCreditScorer.VerifySet(x => x.Count = It.IsAny<int>(), Times.Once);

    Assert.That(application.GetIsAccepted(), Is.True);
    Assert.That(mockCreditScorer.Object.Count, Is.EqualTo(1));           
}
```

### 5.5 Verifying That No Unexpected Calls Were Made

Đôi khi ta muốn rằng method mà ta đang viết unit test thì các method hay property được dùng trong nó phải được verify thì ta dùng `mockIdentityVerifier.VerifyNoOtherCalls();`

Ví dụ như test case bên dưới ta đang test cho method **Process(application)** thì khi ta dùng `VerifyNoOtherCalls` thì tất cả các properties và methods được dùng trong `Process(application)` phải được verify.


```C#
[Test]
public void InitializeIdentityVerifier()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();
    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    mockIdentityVerifier.Verify(x => x.Initialize());

    mockIdentityVerifier.Verify(x => x.Validate(It.IsAny<string>(),
                                                It.IsAny<int>(),
                                                It.IsAny<string>()));

    mockIdentityVerifier.VerifyNoOtherCalls();
}
```

## 6. Using Partial Mocks and Advanced Mocking Techniques

### 6.1 Understanding Strict Mocks

Loose mock là mặc định của NUnit nó sẽ set default value và không throw exception và nó cũng khôn bắt buộc ta explicit setup các method mà được sử dụng ở system under test ( hay method mà ta cần test).

Ta muốn force qua dùng **Strict mock** thì ta cần chỉ ra trong khởi tạo của mock ví dụ `new Mock<IIdentityVerifier>(MockBehaviro.Strict)`

Do vậy, khi ta sử dúng trick mock, thì các method, property được sử dụng cho method được test sẽ phải setup tường minh ra.


Ví dụ trong test case bên dưới do ta chỉ ra là dùng strict mock `var mockIdentityVerifier = new Mock<IIdentityVerifier>(MockBehavior.Strict);` nên tất cả các methods mà  được invoke bởi method `Process` cần được setup, trong trường hợp này ta cần thêm `mockIdentityVerifier.Setup(x => x.Initialize());`.

```c#
[Test]
public void Accept()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>(MockBehavior.Strict);

    mockIdentityVerifier.Setup(x => x.Initialize());

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);



    var mockCreditScorer = new Mock<ICreditScorer>();

    mockCreditScorer.SetupAllProperties();

    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
    //mockCreditScorer.SetupProperty(x => x.Count);

    

    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);

    mockCreditScorer.VerifyGet(x => x.ScoreResult.ScoreValue.Score, Times.Once);
    //mockCreditScorer.VerifySet(x => x.Count = It.IsAny<int>(), Times.Once);

    Assert.That(application.GetIsAccepted(), Is.True);
    Assert.That(mockCreditScorer.Object.Count, Is.EqualTo(1));           
}
```

### 6.2 Throwing Exceptions from Mock Objects

Trong method `Process(LoanApplication application)` nếu việc `CalculateScore` không thành công thì status của application đó sẽ là **fail**.


```c#
try
{
    _creditScorer.CalculateScore(application.GetApplicantName(),
                            application.GetApplicantAddress());
}
catch
{
    application.Decline();
    return;
}
```

Trong test case ta có dòng code sau:

```c#
mockCreditScorer.Setup(x => x.CalculateScore(It.IsAny<string>(), It.IsAny<string>()))
                    .Throws(new InvalidOperationException("Test Exception"));
```

Nếu ta không có dòng code bên trên thì status của application vẫn là **True**, do ta không setup việc ta throw exception cho method `CalculateScore`.

Ở đoạn code trên ta setup cho method `CalculateScore` là nhận vào bất kỳ parameter nào và sẽ throw ra mọt excetption là `InvalidOperationException`

```c#
[Test]
public void DeclineWhenCreditScoreError()
{
    LoanProduct product = new LoanProduct(99, "Loan", 5.25m);
    LoanAmount amount = new LoanAmount("USD", 200_000);
    var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);

    var mockIdentityVerifier = new Mock<IIdentityVerifier>();

    mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);

    var mockCreditScorer = new Mock<ICreditScorer>();            
    mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);

    mockCreditScorer.Setup(x => x.CalculateScore(It.IsAny<string>(), It.IsAny<string>()))
                    .Throws(new InvalidOperationException("Test Exception"));


    var sut = new LoanApplicationProcessor(mockIdentityVerifier.Object,
                                            mockCreditScorer.Object);

    sut.Process(application);
    
    Assert.That(application.GetIsAccepted(), Is.False);            
}
```

### 6.3 Raising Events from Mock Objects

### 6.4 Understanding Partial Mocks

### 6.5 Mocking Nondeterministic Code Such as DateTime.Now

### 6.6 Mocking Protected Members of Partial Mocks

### 6.7 An Alternative to Using Partial Mocks