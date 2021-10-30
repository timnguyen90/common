// Phân biệt giữa constructor function và normal function
// Constructor function
// - Được dùng với từ khóa new để tạo ra một object mới.
// - Được đặt tên theo danh từ
// - Chữ cái đầu tiên viết hoa.

// Normal function
// - Được dùng để làm một business gì đó, một việc gì đó.
// - Được đặt tên theo động từ
// - Chữ đầu tiên viết thường, chữ thứ 2 viết hoa (camelCase)

// Prototypes
// Tất cả các function điều có một thằng property là prototype.
// Trong prototype lại có môt thằng constructor function chỉ về thằng chứa prototype.

function Mouse(color, weight){
    this.type = 'mouse';
    this.color = color;
    this.weight = weight;
}

console.log(Mouse.prototype);
// Kết quả là: Mouse {}
console.log(Mouse.prototype.constructor);
// Kết quả là: [Function: Mouse]
console.log(Mouse.prototype.constructor===Mouse);
// Kể quả là true, chứng tỏ rằng Mouse và thằng constructor trong prototype là 1 đứa.

// => Prototype là cái mà được chia sẻ giữa tất cả mấy thằng mà được tạo ra 
// bằng từ khóa new.


// Bây giờ ta xem xét đoạn chương trình sau:
function Mouse(color, weight){
    this.type = 'mouse';
    this.color = color;
    this.weight = weight;
};
Mouse.prototype.sleep =function(){
    console.log('Sleeping...');
}
var jerry = new Mouse('Orange', 20);
var mickey = new Mouse('White',10);
console.log(jerry.sleep()===mickey.sleep());
// Kết quả là: True

// Ta thấy rằng nếu ta khai báo một method bằng prototype thì khi ta new các 
// đối tượng chứa prototype đó thì nó sẽ giống nhau cái method được khai báo bằng 
// prototype đó.
// Trong prototype ta cũng có thể truy cập đến các thuộc tính của đối tượng thông qua từ khóa this.

// Đại loại cũng có thể hiểu nó là một static vậy.
// Dùng prototype thì nó sẽ tiết kiệm bộ nhớ hơn.

// Nếu ta không khai báo một method bằng prototype mà để method định khai báo 
// bằng prototype thành một propertiy của object đó
// Thi khi ta tạo đối tượng đó thì mỗi đối tượng sẽ có một property riêng (function định khai báo bằng prototype.) 






