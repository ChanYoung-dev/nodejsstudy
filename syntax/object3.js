/*var v1='v1';
  var v2='v2';
  */

var q = {
 v1:'v1',
 v2:'v2',
 f1:function (){
   console.log(this.v1);
 },
 f2:function(){
   console.log(this.v2);
 }
} //v1과 그 v1원에 관련된 함수를 객체하나에 묶어놓는다.

q.f1();
q.f2();
