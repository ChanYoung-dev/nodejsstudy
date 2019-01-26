var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
 //url모듈사용

function templateHTML(title, list, body, control){
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
    ${control}
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
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">create</a>`);
            response.writeHead(200);
            response.end(template);
          });
      } else {
        console.log(pathname);
        fs. readdir('./data',function(error,filelist){
          fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
            var title=queryData.id;
            var list=templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2>${description}`,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`);
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
        var template = templateHTML(title, list, `<form action="/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
            <input type="submit">
          </p>
        </form>`, ''); //if(pathname==='/'){if(queryData.id === undefined){ 이부분 복사
        response.writeHead(200);
        response.end(template);
      });
    }else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){
          body = body + data;
      });
      request.on('end', function(){
          var post = qs.parse(body);
          var title = post.title;
          var description = post.description;
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`}); //200은 성공했다는 뜻
          response.end('success');
        });
      });

    } else if(pathname === '/update'){
      fs. readdir('./data',function(error,filelist){
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          var title=queryData.id;
          var list=templateList(filelist);
          var template = templateHTML(title, list,
             `
             <form action="/update_process" method="post">
               <input type="hidden" name="id" value="${title}">
               <p><input type="text" name="title" placeholder="title" value="${title}"></p>
               <p>
                 <textarea name="description" placeholder="description">${description}</textarea>
               </p>
               <p>
                 <input type="submit">
               </p>
             </form>
             `,`<a href="/create">create</a> <a href="/update?id=${title}">update</a>`); //type는 어떤스타일 name은 변수이름 // value는 칸에 미리표기가 아니라 직접표기
          response.writeHead(200);
          response.end(template);
        });
      }); //업데이트를 눌렀을시 뜨는 화면 작성코드
    }
    else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
