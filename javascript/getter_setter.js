function Circle(radius){
    this.radius = radius;
    let defaultLocation = {x: 0, y:0};
    
    this.getDeffaultLocation = function(){
        return defaultLocation;
    };

    this.draw = function(){
        console.log('draw');
    };

    // Định nghĩa phương thức get, set
    Object.defineProperty(this,'defaultLocation',{
        get: function(){
            return defaultLocation;
        },
        set: function(){
            if(!value.x || !value.y)
                throw new Error('Invalid location.');
            defaultLocation = value;
        }
    });
}

const circle = new Circle(10);
circle.defaultLocation = 1;// Sẽ ném ra một cục lỗi.
circle.draw();