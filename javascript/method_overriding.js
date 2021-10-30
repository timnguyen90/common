// method overriding
/*
trong js một class kế thừa một class khác có thể override lại các method của class cha.
Việc override này có thể thêm đối số cho method hay immplement khác đi.
*/

class CoffeeMachine{
    makeCoffee(){
        console.log('Making coffee');
    }
}

class SpecialCoffeeMachine extends CoffeeMachine{
    makeCoffee(cb){
        console.log('Making coffee and do something');
        cb();
    }
}

const coffeeMachine  = new SpecialCoffeeMachine();
coffeeMachine.makeCoffee(function(){
    console.log('Call the boss');
});

// Result: Making coffee and do somethin
// Call the boss.