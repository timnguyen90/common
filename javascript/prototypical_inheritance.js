// Prototype là một objectbase, nghĩa là nó thằng ông nội của mọi object và tất cả các object 
// điều chỉ về thằng prototype.

// Ta có thể làm một ví dụ như sau để minh chứng cho điều này
Ta khai báo lần lượt 2 object là
 let x = {} 
 let y = {}
 // Thi khi ta thực thi đoạn code sau 
 x.__proto__ === y.__proto__ 
 
 // Result: true


