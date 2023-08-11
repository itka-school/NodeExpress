const { log } = require("console");
const fs = require("fs");
const http = require("http");

// Читаем файл, а затем добавляем запись в файл
/* fs.readFile("some.txt", "utf-8", (err, data) => {
  err
    ? log("Ошибка чтения файла!", err)
    : fs.writeFile("some.txt", data + "\nBla-Bla!", (err) => {
        err ? log("Ошибка записи в файл!", err) : log("Запись прошла успешно!");
      });
}); */

// Создаем папку, а затем создаем в ней файл с текстом
/* fs.mkdir("text-files", function (err) {
  if (err) {
    console.log(`Произошла ошибка! ${err}`);
  } else {
    fs.writeFile("./text-files/text.txt", "Bla-Bla Blew!", () => {});
  }
}); */

// Удаляем файл с текстом, а затем удаляем папку, где был этот файл
/* fs.unlink("./text-files/text.txt", () => {
  fs.rmdir("text-files", () => {
    log("Direct deleted");
  });
}); */

// Создаем сервер, отправляем заголовки и допавляем html строкой
/* let server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.end(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    Hello <b>Node JS!</b>
  </body>
  </html>`);
});*/

// //Создаем сервер и подключаем файлы html
// let server = http.createServer((req, res) => {
//  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

//  //Добавляем содержимое файла index.html
/*   // Читаем файл index.html в потоке
  const stream = fs.createReadStream("./templates/index.html");
  //Добавляем прочитанное в res
  stream.pipe(res); */

// Реализация маршрутизации  (Routing)
//if (req.url == "/") {
//  fs.createReadStream("./templates/index.html").pipe(res);
//} else if (req.url == "/about") {
//  fs.createReadStream("./templates/about.html").pipe(res);
//} else {
// fs.createReadStream("./templates/error.html").pipe(res);
//}
//});

//const PORT = 3000;
//const HOST = "localhost";

/* server.listen(PORT, HOST, () => {
  log(`Сервер запущен: http://${HOST}:${PORT}`);
}); */

//Библиотека express js
const express = require("express");

const app = express();
//Маршрутизация в голой express js
/* 
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/templates/index.html");
});
app.get("/about", function (req, res) {
  res.sendFile(__dirname + "/templates/about.html");
});
app.use(function (req, res) {
  res.status(404).sendFile(__dirname + "/templates/error.html");
});

const PORT = 3000;

app.listen(PORT, () => {
  log(`Сервер запущен: http://localhost:${PORT}`);
}); */

//Маршрутизация  и передача данных express js и EJS
app.set("view engine", "ejs"); //Добавляем маршрутизатор EJS к приложению
app.use(express.urlencoded({ extended: false })); //Данная строка кода настраивает middleware (body-parser) в приложении на Node.js для обработки данных, переданных в запросе в формате urlencoded. Она парсит тело запроса и добавляет объект со свойствами body, params и query в объект request. Параметр extended установлен в false, что говорит о том, что обрабатываются только простые объекты, а не сложные объекты.
app.use(express.static("public")); //Говорим, что статические файлы лежат в папке public

app.get("/", function (req, res) {
  res.render("index");
});
app.get("/user/:username?", function (req, res) {
  let data = {
    username: req.params.username,
    hobbies: ["programming", "travel", "history", "tourism"],
  };
  res.render("user", data); //передаем в user.ejs объект со свойствами username и hobbies
});
app.get("/about", function (req, res) {
  res.render("about");
});

app.post("/check-user", (req, res) => {
  log(req.body);
  res.redirect(`/user/${req.body.username}`); //Если URL ...check-user, перенаправляем на /user/username. Значение username приходит из формы в файле header.ejs
});

app.use(function (req, res) {
  res.status(404).render("error"); //Отрисовываем страницу с ошибкой для кода 404
});
const PORT = 3000;

app.listen(PORT, () => {
  log(`Сервер запущен: http://localhost:${PORT}`);
});
