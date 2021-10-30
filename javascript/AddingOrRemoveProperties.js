function Circle(radius){
    this.radius = radius;
    this.draw = function(){
        console.log('draw');
    }
}

const circle = new Circle (10);

// Ta có thể thêm mới properties cho một object bằng cách sau:
circle.lolcation = {x: 1};
// Hoặc có thể lam bằng cách sau vẫn có kết quả tương tự
circle['location'] = {x: 1};
// Nếu bạn muốn đặt tên cho một properties ma có các khoản trắng, ký tự đặc biệt gì đó 
// thi bạn phải dùng cách khai báo dung cặp []


// ĐỂ DELETE MỘT PROPERTIES CỦA MỘT OBJECT TA LÀM NHƯ SAU;
delete circle.location;// or delete circle['location']
