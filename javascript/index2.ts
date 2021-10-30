let apples: number = 5;
let speed: string = 'fast';
let hasName: boolean = true;
let nothingMuch: null = null;
let nothing: undefined = undefined;

// Object literal
let point: {x: number; y: number}={
    x: 10,
    y:10
} 
// Class
class Car{}
let car: Car = new Car();

// Build in object
let now: Date = new Date();

// Array
let colors: string[] =['red', 'green','blue'];
let myNumbers: number[] = [1, 2, 3];
let truths: boolean[] = [true, true, false];

// Function 
const logNumber = (i:number)  => {
    console.log(i);
}

// Chỉ ra tường mình annotations của việc kiểu tham số đầu vào 
// và kiểu kết quả trả về.
const logNumber2: (i: number)=>void = (i: number) => {
    console.log(i);
}

// Có 2 loại xác định kiểu dữ liệu chính trong typescript là
// Type annotations vs type inference
// *Type annotations: We (dev) tell typescript the type
// - when a function returns the 'any' type and we need to clarity the value.
// - when we declare a variable on one line then initialize it later.
// when we want a variable to have a type that can't be inferred.
// *Type inference
// - Always, typescript guesses the type.

// method JSON.parse() khi nó nhận kiểu gì vào nó sẽ trả ra kiểu giá trị của cái đó
// ví dụ:
// 'false' => JSON.parse() => boolean
// '4' => JSON.parse() => number
// '{"value":5}' => JSON.parse() => {value:number}
// '{"name":"alex"}' => JSON.parse() => {name:string}

// When to use annotations
// 1) function that returns the 'any' type
const json = '{"x":10, "y":20}';
const coordinates: {x:number, y: number} = JSON.parse(json);
console.log(coordinates);

// 2) when we declare a variable on one line
// and initializate it later.
let words = ['red', 'green', 'blue'];
let foundWord:boolean;
for(let i = 0; i<words.length; i++){
    foundWord = true;
}

// 3) Variable whose type cannot be inferred correclty
let numbers = [-10, -1, 12];
let numberAboveZero: boolean | number = false;
for(let i=0; i<numbers.length; i++){
    if(numbers[i]>0){
        numberAboveZero = numbers[i];
    }

}


// Function nhận vào 2 số và trả về một số.
const add = (a:number, b: number):number =>{
    return a+b;
}
// ví dụ ta tạo một function nhận 2 tham số đầu vào và ta trả 
// kết quả về sau khi hàm tính toán, nhưng ta lại quên gọi lệnh
// return thì typescript vẫn không phàn nàn gì nếu ta không chỉ
// định tường mình kiểu giá trị mà function đó trả về hay nói 
// cách khác là ta phải định nghĩa hàm đó là hàm có giá trị trả về.

/**********************************************************/
// Lession 24: Annotations for Anonymous functions.
// arrow function
const subtract = (a:number, b: number): number =>{
    return a-b;
};
// Name function
function devide (a:number, b:number):number{
    return a/b;
}
// Anonymous fuction
const multiply = function(a: number, b: number): number{
    return a*b;
}

/**********************************************************/
// Lession 25: void and Never
// kiểu void có thể trả về là không có gì
// hoặc là null hoặc là undefined.
const logger = (message: string):void =>{
    //console.log(message);
    //return null;
    //return undefined;
}
// khi một function mà vứt ra một cục lỗi thì có có nghĩa là
// không return về bất kỳ một cái gì cả.
// khi ta dùng never nghĩa là ta mong đợi sẽ không bao giờ được return
// về cái gì cả dù cho đó là null hay undefined.
const throwError = (message:string):never =>{
    throw new Error(message);
}
/**********************************************************/
// Lesson 26: Destructing with Annotations
const todayWeather = {
    date: new Date(),
    weather: 'sunny'
};
// định nghĩa theo cách thông thường
const logWeather = (forecast: {date:Date, weather: string}):void =>{
    console.log(forecast.date);
    console.log(forecast.weather);
};
// Lúc ta gọi ra sẽ trông như sau:
logWeather(todayWeather);

// Trong ES2015 ta có cách viết như sau:
const logWeather2 = ({date, weather})=> {
    console.log(date);
    console.log(weather);
}

// trong typescript ta cũng làm được điều tương như như trong es2015 như trên như sau:
const logWeather3 =({date, weather}:{date: Date, weather:string}):void =>{
    console.log(date);
    console.log(weather);
} 
/**********************************************************/

// Lesson 27. Annotations Around objects.
const profile = {
    name: 'alex',
    age: 20,
    coords: {
        lat: 0,
        lng: 15
    },
    // một function bên trong object dùng để set lại giá trị của thằng age.
    // được viết theo cú pháp của es5
    setAge(age: number):void{
        this.age = age;
    }


}

// Lesson 28 Arrays in Typescript.
const carMakers: string[] = ['a','b','c'];
const dates = [new Date(), new Date())];
// Mảng 2 chiều
const carsByMake=[
    ['a'],
    ['b','b1'],
    ['c','c1']
] 
const carsByMake2: string[][] =[];

// Lesson 29: whyy typed arrays
// - Why do we care? 
// + TS can do type inference when extracting values from an array
const car = carMakers[0];
const myCar = carMakers.pop();
// + TS can prevent use from adding incompatible values to the array
carMakers.push(100);// cannot adding this item because it is a number.
// + We can get help 'map' 'forEach', 'reduce' functions
carMakers.map((car:string):string=>{
    return car;
})
// + Flexible - arrays can still contain mulitple different types.
const importantDates = [new Date(),'2030-10-10'];
const importantDates2: (Date: string) [] = [new Date()];

