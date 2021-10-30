function greeting(name){
    return 'Hi '+ name + ' !';
}

function greeting2(name){
    return `Hi, ${name} ${1+2}}!`;
    // trong {} ta có thể viết bất cứ cái gì liên quan đến javascript
    // chẳn hạn như tính toán, gọi hàm... 
    // ta còn có thể xuống dòng trong `` 
}

var result = greeting2('Tim');
console.log(result);
