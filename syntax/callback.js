/*
function a(){
  console.log('A');
}
*/
var a =function(){
  console.log('A');
} //함수는 값이다.


function slowfunction(callback){
  callback();

}

slowfunction(a);
