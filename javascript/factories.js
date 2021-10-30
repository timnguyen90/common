// Cách khai báo bên dưới được gọi là factory.
function createCircle(radius){
    return {
        radius,
        draw:function(){
            console.log('draw');
        }
    };
}

const circle = createCircle(1);
circle.draw();