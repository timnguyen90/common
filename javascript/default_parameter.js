// Khi ta gọi function greeting nếu ta không truyền đối số vào thì name sẽ được lấy 
// giá trị mặc định là 'friend'
function greeting(name = 'friend'){
    return `Hi, ${name}`;
}
