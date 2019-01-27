var M = {
  v:'v',
  f:function(){
    console.log(this.v);
  }
}

module.exports = M;
// module.exports만 선언하면 mpart.js전부를 외부에서 사용 할수있도록 하는것
// module.exports = M;  M만 외부에서 사용할 수 있게 한다.
