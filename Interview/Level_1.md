# Part 1:  Programming Techniques

## 1. Viết chương trình xuất ra bảng cửu chương của một số được nhập vào từ bàn phím:

Ví dụ nhập vào 15:

*Expected Output :*
```
15 X 1 = 15                                                                                                   
15 X 2 = 30                                                                                                   
15 X 3 = 45                                                                                                   
15 X 4 = 60                                                                                                   
15 X 5 = 75                                                                                                   
15 X 6 = 90                                                                                                   
15 X 7 = 105                                                                                                  
15 X 8 = 120                                                                                                  
15 X 9 = 135                                                                                                  
15 X 10 = 150
```

```c#
using System;  
public class interview1  
{  
    public static void Main() 
{
   int j,n;
   
	Console.Write("\n\n");
    Console.Write("Display the multiplication table:\n");
    Console.Write("-----------------------------------");
    Console.Write("\n\n");   

   Console.Write("Input the number (Table to be calculated) : ");
   n= Convert.ToInt32(Console.ReadLine());   
   Console.Write("\n");
   for(j=1;j<=10;j++)
   {
     Console.Write("{0} X {1} = {2} \n",n,j,n*j);
   }
  }
}
```

## 2. Viết chương trình xuất ra bảng cửu chương từ 1 tới n

Ví dụ nhập vào 5:

*Expected Output :*

```
1x1 = 1, 2x1 = 2, 3x1 = 3, 4x1 = 4, 5x1 = 5                                                                   
1x2 = 2, 2x2 = 4, 3x2 = 6, 4x2 = 8, 5x2 = 10                                                                  
1x3 = 3, 2x3 = 6, 3x3 = 9, 4x3 = 12, 5x3 = 15                                                                 
1x4 = 4, 2x4 = 8, 3x4 = 12, 4x4 = 16, 5x4 = 20                                                                
1x5 = 5, 2x5 = 10, 3x5 = 15, 4x5 = 20, 5x5 = 25                                                               
1x6 = 6, 2x6 = 12, 3x6 = 18, 4x6 = 24, 5x6 = 30                                                               
1x7 = 7, 2x7 = 14, 3x7 = 21, 4x7 = 28, 5x7 = 35                                                               
1x8 = 8, 2x8 = 16, 3x8 = 24, 4x8 = 32, 5x8 = 40                                                               
1x9 = 9, 2x9 = 18, 3x9 = 27, 4x9 = 36, 5x9 = 45                                                               
1x10 = 10, 2x10 = 20, 3x10 = 30, 4x10 = 40, 5x10 = 50 
```

```c#
using System;  
public class interview2  
{  
    public static void Main() 
{
   int j,i,n;
	Console.Write("\n\n");
    Console.Write("Display the multiplication table vertically from 1 to n:\n");
    Console.Write("---------------------------------------------------------");
    Console.Write("\n\n");   
   
   Console.Write("Input upto the table number starting from 1 : ");
   n= Convert.ToInt32(Console.ReadLine());   
   Console.Write("Multiplication table from 1 to {0} \n",n);
   for(i=1;i<=10;i++)
   {
     for(j=1;j<=n;j++)
     {
       if (j<=n-1)
           Console.Write("{0}x{1} = {2}, ",j,i,i*j);
          else
	    Console.Write("{0}x{1} = {2}",j,i,i*j);

      }
     Console.Write("\n");
    }
  }	
}
```

## 3. Viết chương trình xuất ra hình như bên dưới (cho phép người dùng vẽ ra hình với n dòng với n từ người dùng nhập vào).

Ví dụ nhập vào 3:

*Expected Output :*

```
*
**
***
****
```

```c#
using System;  
public class Exercise9  
{  
    public static void Main() 
{
    int i,j,rows;
	Console.Write("\n\n");
    Console.Write("Display the pattern like right angle using asterisk:\n");
    Console.Write("------------------------------------------------------");
    Console.Write("\n\n");   
   
   Console.WriteLine("Input number of rows : ");
   rows= Convert.ToInt32(Console.ReadLine());   
   for(i=1;i<=rows;i++)
   {
	for(j=1;j<=i;j++)
	   Console.Write("*");
	Console.Write("\n");
   }
  }   
}
```

## 4 Viết chương trình nhập vào n rồi xuất ra như dạng hình bên dưới (n = 10).
Ví dụ nhập vào 10:

*Expected Output :*

```
1                                                                                                             
12                                                                                                            
123                                                                                                           
1234                                                                                                          
12345                                                                                                         
123456                                                                                                        
1234567                                                                                                       
12345678                                                                                                      
123456789                                                                                                     
12345678910
```

```c#
using System;  
public class Exercise10  
{  
    public static void Main() 
{
   int i,j,rows;
   
	Console.Write("\n\n");
    Console.Write("Display the pattern as right angle triangle using number:\n");
    Console.Write("-----------------------------------------------------------");
    Console.Write("\n\n");
	
   Console.WriteLine("Input number of rows : ");
   rows= Convert.ToInt32(Console.ReadLine());   
   for(i=1;i<=rows;i++)
   {
	for(j=1;j<=i;j++)
	   Console.Write("{0}",j);
	Console.Write("\n");
   }
  }
}
```

## 5 


