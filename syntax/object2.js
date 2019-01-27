var f = function(){
  console.log(1+1);
  console.log(1+2);
}
console.log(f);
f();

var a = [f]; //함수를 배열에 담는다
a[0]();


var o = {
  func:f
}
o.func(); //객체원소로써의 func실행 func에 f를 대입했다.
