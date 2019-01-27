//var template = {
module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB2</a></h1>
      ${list}
      ${control}
      ${body}
    </body>
    </html>`; //create링크를 누르면 localhost:3000/create로 이동
    //모듈test확인을 위해 WEB을 WEB2로 바꾸었다.
  },
  List:function(filelist){
    var list = '<ul>';
    var i=0;
    while(i<filelist.length){
      list= list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
      i=i+1;
    }
    list = list + '</ul>';
    return list;
  }

}
