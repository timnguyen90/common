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

Trong ??o???n code b??n d?????i, ta setup cho method **Validate** c???a **IIdentityVerifier** s??? tr??? v??? **true** n???u c??c params c???a n?? l???n l?????t l?? *Sarah*, *25*, *"133 Pluralsight Drive, Draper, Utah"*

```c#
mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);
```

N???u ta ?????i ??o???n code tr??n th??nh 

```c#
mockIdentityVerifier.Setup(x => x.Validate("Sarah 2",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah"))
                        .Returns(true);
```

Th?? method **Validate** m?? ta setup s??? kh??ng tra v??? **true** m?? s??? l?? **false** b???i v?? application b??n tr??n c?? t??n l?? **Sarah**

```c#
var application = new LoanApplication(42,
                                            product,
                                            amount,
                                            "Sarah",
                                            25,
                                            "133 Pluralsight Drive, Draper, Utah",
                                            65_000);
```

Test case ?????y ????? nh?? b??n d?????i.

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

Khi ta thay ?????i th??nh `It.IsAny<>()` th?? s??? kh??ng c??n check gi?? tr??? c???a parameter m?? ta truy???n v??o cho method m?? ta c???n setup, m?? l??c n??y n?? ch??? check type c???a parameter th??i.

Ta c???n c???n th???n khi s??? d???ng `It.IsAny<>()` v?? gi?? tr??? c???a `.Returns();` l??c n??o c??ng tr??? v??? ????ng v???i gi?? tr??? m?? ta setup, n?? s??? kh??ng ph??? thu???c v??o vi???c t??nh to??n c??c gi?? tr??? c???a parameter truy???n v??o.

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

Khi ta c???n mock cho m???t function m?? function ???? tr??? v??? gi?? tr??? b???ng c??ch d??ng reference trong parameter, v?? d??? nh?? function b??n d?????i

```c#
 void Validate(string applicantName, 
                      int applicantAge, 
                      string applicantAddress, 
                      out bool isValid);
```

Th?? ta l??m nh?? sau:

Khai b??o m???t bi???n v?? g??n gi?? tr??? m?? ta mu???n tr??? v???, sau ???? trong **Setup** ta ?????t bi???n ???? v??o danh s??ch parameter t????ng ???ng nh?? b??n d?????i

```c#
bool isValidOutValue = true;
mockIdentityVerifier.Setup(x => x.Validate("Sarah",
                                                25,
                                                "133 Pluralsight Drive, Draper, Utah",
                                                out isValidOutValue));
```

Test case ?????y ????? cho tr?????ng h???p n??y

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

Khi ta l??m vi???c v???i function m?? c?? parameter l?? `ref` nh?? function b??n d?????i

```c#
 void Validate(string applicantName, 
                      int applicantAge, 
                      string applicantAddress, 
                      ref IdentityVerificationStatus status);
```

????? mock v???i d???ng functon n??y ta l??m nh?? sau:

Khai b??o m???t delegate gi???ng v???i function m?? ta c???n mock b??n ngo??i test method.

```c#
delegate void ValidateCallback(string applicantName, 
                                int applicantAge, 
                                string applicantAddress, 
                                ref IdentityVerificationStatus status);
```

Sau ???? ta d??ng `.CallBack()` c???a NUnit ????? g???i l???i, v?? parameter trong function ch??nh ta s??? thi???t l???p n?? l?? `ref It.Ref<IdentityVerificationStatus>.IsAny` ????? kh??ng check gi?? tr??? c???a parameter.

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

Test case ?????y ????? 

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

B??n ngo??i test method ta t???o m???t interface/class gi???.

```c#
public interface INullExample
{
    string SomeMethod();
}
```

Test case minh h???a

Theo m???c ?????nh c???a NUnit n???u ta setup m?? kh??ng ch??? ra tr??? v??? l?? g?? th?? NUnit s??? tr??? v??? null. n??n ta th???y b??n d?????i s??? kh??ng c???n g???i t???i `.Returns()`.

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

????? tr??? v??? m???t gi?? tr??? c??? th??? c???a m???t method hay c???a m???t property ta l??m nh?? sau:

Trong ??o???n code `mockCreditScorer.Setup(x => x.Score).Returns(300);` ta n??i r???ng ta mu???n setup property **Score** c???a `ICreditScorer` khi ???????c g???i th?? s??? tr??? v??? gi?? tr??? l?? **300**.

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

????? setup mock cho c??c property l???ng nhau th?? ta l??m nh?? sau:

Ta setup mock cho th???ng con sau ???? setup mock cho th???ng cha b???ng vi???c return v??? gi?? tr??? c???a setup mock c???a con.

Trong tr?????ng h???p n??y: 

* `ScoreValue` l?? con c???a `ScoreResult`

* `ScoreResult` l?? con c???a `ICreditScorer`

Ta s??? c?? th??? t??? mock nh?? sau:

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

Test method ?????y ?????:

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

Ta th???y r???ng c??? `ScoreResult` v?? `ScoreValue` ??i???u l?? `virtual`

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
n??n ta c?? th??? vi???t ng???n g???n l???i nh?? sau cho vi???c mock 2 objects n??y

```c#
mockCreditScorer.Setup(x => x.ScoreResult.ScoreValue.Score).Returns(300);
```

N???u ta khai b??o trong l??c kh???i t???o b???ng `DefaultValue.Mock` th?? c??c th???ng con b??n trong c???a n?? s??? l?? gi?? tr??? m???c ?????nh c???a ki???u d??? li???u ???? m?? kh??ng ph???i l?? null. N???u ta ch???n option l?? `DefaultValue.Empty` th?? s??? l?? null.

```c#
var mockCreditScorer = new Mock<ICreditScorer> { DefaultValue = DefaultValue.Mock};
```

Test case ?????y ????? nh?? sau:

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

Khi ta mu???n track change s??? thay ?????i c???a m???t property th?? ta ch??? c???n s??? d???ng `.SetupProperty()`. Trong method n??y n?? c?? 2 overloads l??

* Ch??? truy???n v??o property c???n trak change.

* Truy???n v??o property c???n track change v?? gi?? tr??? kh???i t???o n??, v?? d??? ``.SetupProperty(x => x.count, 10)`` th?? khi ch???y xong th?? bi???n count s??? ???????c thay ?????i th??nh 11.

Test case ?????y ????? cho tr?????ng h???p n??y:

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

N???u ta mu???n track change cho t???t c??? c??c properties th?? ta l??m nh?? sau:

Ta g???i ?????n `mockCreditScorer.SetupAllProperties();` . Ta c???n ch?? ?? r???ng, n???u tr?????c ???? ta c?? g???i ?????n .Setup cho b???t k??? properties n??o th?? khi g???i ?????n `SetupAllProperties()` n?? s??? override l???i gi?? tr???. Do v???y, ta c???n ch???c ch???n r???ng `mockCreditScorer.SetupAllProperties();` ???????c g???i tr?????c ti??n khi ta Setup c??c mock object.

Test case ?????y ????? cho tr?????ng h???p n??y

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

??? d??ng code `mockIdentityVerifier.Verify(x => x.Initialize());` s??? check li???u r???ng method `Initialize()` c?? ???????c g???i ??? trong `sut.Process(application);` b???i v?? trong method `Process(application)` c?? call t???i  method `Initialize()` (call ??? d??ng `_identityVerifier.Initialize();` b??n d?????i).

Ta c?? th??? th???y function `Process(application)` nh?? sau:

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
Test case ?????y ?????: 

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

Trong ??o???n code `mockCreditScorer.Verify(x => x.CalculateScore("Sarah", "133 Pluralsight Drive, Draper, Utah"));`
n?? s??? verify l?? method `CalculateScore` ???????c thi trong method `Process(application)` v???i c??c parameter l?? `"Sarah", "133 Pluralsight Drive, Draper, Utah"`. N???u function `CalculateScore` ???????c g???i nh??ng kh??c c??c parameters tr??n th?? test case v???n fail.

N???u `mockCreditScorer.Verify(x => x.CalculateScore(It.IsAny<string>, It.IsAny<string>)` th?? test case s??? b??? qua parameter, n?? s??? lu??n lu??n pass khi method `CalculateScore` ???????c th???c thi. 

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

Ta c?? th??? ki???m tra xem method ???????c call bao nhi??u l???n

Trong test case b??n d?????i ta expected l?? method `CalculateScore()` ???????c g???i 1 l???n duy nh???t

```c#
 mockCreditScorer.Verify(x => x.CalculateScore(
                            "Sarah", "133 Pluralsight Drive, Draper, Utah"),
                            Times.Once);
```

Test case ?????y ?????

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

????i khi ta c???n ki???m tra l?? m???t property c?? ???????c **get** hay **set** d??? li???u hay kh??ng? n???u **set** th?? ???????c **set** gi?? tr??? bao nhi??u
`mockCreditScorer.VerifyGet(x => x.ScoreResult.ScoreValue.Score, Times.Once);` Ta expect r???ng **Score** s??? ???????c get v?? get m???t l???n duy nh???t.

`mockCreditScorer.VerifyGet(x => x.ScoreResult.ScoreValue.Score);` Ta expect r???ng **Score** s??? ???????c get v?? kh??ng quan tr???ng s??? l???n

`mockCreditScorer.VerifySet(x => x.Count = It.IsAny<int>(), Times.Once);` Ta expect r???ng **Score** s??? ???????c Set d??? li???u ( b???t k??? gi?? tr??? n??o c??ng ???????c) v?? ???????c set 1 l???n duy nh???t.

`mockCreditScorer.VerifySet(x => x.Count = It.IsAny<int>());` Ta expect r???ng **Score** s??? ???????c Set d??? li???u v?? kh??ng quan tr???ng gi?? tr??? g?? v?? set bao nhi???u l???n.

`mockCreditScorer.VerifySet(x => x.Count = 1);` Ta expect r???ng **Score** s??? ???????c set d??? li???u v?? gi?? tr??? ???????c set l?? **1**.

Ta n??n ch?? ?? v??o vi???c ta verify d??? li???u, b???i v?? c?? th??? ta s??? b??? tr??ng v?? d??? nh?? `Assert.That(mockCreditScorer.Object.Count, Is.EqualTo(1));`, ??? l???nh n??y n?? ???? check l?? **Count** c?? b???ng 1 hay kh??ng.


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

????i khi ta mu???n r???ng method m?? ta ??ang vi???t unit test th?? c??c method hay property ???????c d??ng trong n?? ph???i ???????c verify th?? ta d??ng `mockIdentityVerifier.VerifyNoOtherCalls();`

V?? d??? nh?? test case b??n d?????i ta ??ang test cho method **Process(application)** th?? khi ta d??ng `VerifyNoOtherCalls` th?? t???t c??? c??c properties v?? methods ???????c d??ng trong `Process(application)` ph???i ???????c verify.


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

Loose mock l?? m???c ?????nh c???a NUnit n?? s??? set default value v?? kh??ng throw exception v?? n?? c??ng kh??n b???t bu???c ta explicit setup c??c method m?? ???????c s??? d???ng ??? system under test ( hay method m?? ta c???n test).

Ta mu???n force qua d??ng **Strict mock** th?? ta c???n ch??? ra trong kh???i t???o c???a mock v?? d??? `new Mock<IIdentityVerifier>(MockBehaviro.Strict)`

Do v???y, khi ta s??? d??ng trick mock, th?? c??c method, property ???????c s??? d???ng cho method ???????c test s??? ph???i setup t?????ng minh ra.


V?? d??? trong test case b??n d?????i do ta ch??? ra l?? d??ng strict mock `var mockIdentityVerifier = new Mock<IIdentityVerifier>(MockBehavior.Strict);` n??n t???t c??? c??c methods m??  ???????c invoke b???i method `Process` c???n ???????c setup, trong tr?????ng h???p n??y ta c???n th??m `mockIdentityVerifier.Setup(x => x.Initialize());`.

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

Trong method `Process(LoanApplication application)` n???u vi???c `CalculateScore` kh??ng th??nh c??ng th?? status c???a application ???? s??? l?? **fail**.


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

Trong test case ta c?? d??ng code sau:

```c#
mockCreditScorer.Setup(x => x.CalculateScore(It.IsAny<string>(), It.IsAny<string>()))
                    .Throws(new InvalidOperationException("Test Exception"));
```

N???u ta kh??ng c?? d??ng code b??n tr??n th?? status c???a application v???n l?? **True**, do ta kh??ng setup vi???c ta throw exception cho method `CalculateScore`.

??? ??o???n code tr??n ta setup cho method `CalculateScore` l?? nh???n v??o b???t k??? parameter n??o v?? s??? throw ra m???t excetption l?? `InvalidOperationException`

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