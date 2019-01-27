var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // k8805
var i = 0;
while(i < members.length){
  console.log('array loop', members[i]);
  i = i + 1;
}

// 배열
var roles = {
  'programmer':'egoing',
  'designer' : 'k8805',
  'manager' : 'hoya'
}
console.log(roles.designer); //k8805
console.log(roles['designer']); //k8805

for(var n in roles){
  console.log('object => ', n, 'value => ', roles[n]); //n으로해도되고 name으로 해도 된다.
}
//객체
