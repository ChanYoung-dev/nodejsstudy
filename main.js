var http = require('http');
var fs = require('fs');
var url = require('url'); //url모듈사용

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>
  <head>
    <title>${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>`; //create링크를 누르면 localhost:3000/create로 이동

}

function templateList(filelist){
  var list = '<ul>';
  var i=0;
  while(i<filelist.length){
    list= list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i=i+1;
  }
  list = list + '</ul>';
  return list;
}
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url,true).pathname;
    if(pathname==='/'){
      if(queryData.id === undefined){
          fs. readdir('./data',function(error,filelist){
            console.log(filelist);
            var title='Welcome';
            var description='Hello,Node js';
            var list=templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
            response.writeHead(200);
            response.end(template);
          });
      } else {
        console.log(pathname);
        fs. readdir('./data',function(error,filelist){
        var list = '<ul>';
        var i=0;
        while(i<filelist.length){
          list= list+`<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
          i=i+1;
        }
        list = list + '</ul>';
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          var title=queryData.id;
          var list=templateList(filelist);
          var template = templateHTML(title, list, `<h2>${title}</h2>${description}`);
          response.writeHead(200);
          response.end(template);
        });
        });
      }
    }else if(pathname === '/create'){
      fs. readdir('./data',function(error,filelist){
        console.log(pathname);
        var title='WEB - create';
        var list=templateList(filelist);
        var template = templateHTML(title, list, `<form action="http://localhost:3000/process_create" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`); //if(pathname==='/'){if(queryData.id === undefined){ 이부분 복사
        response.writeHead(200);
        response.end(template);
      });
    }else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
