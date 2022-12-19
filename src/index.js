const http = require("http");
const mysql = require("mysql");

const dbConnection = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
  port: 3306,
};

const connectionInstance = mysql.createConnection(dbConnection);

let dataNames = [];

connectionInstance.connect((error) => {
  if (error) throw error;

  console.log("connected to mysql database!");

  connectionInstance.query("CREATE DATABASE IF NOT EXISTS nodedb;");

  connectionInstance.query(
    "CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), PRIMARY KEY (id));"
  );

  connectionInstance.query(
    "INSERT INTO people(name) VALUES ('Mikkaiser Camisa 10');"
  );

  connectionInstance.query("SELECT * from people;", (error, result, fields) => {
    if (error) throw error;

    dataNames = result;
  });
});

http
  .createServer((request, response) => {
    response.write("<h1>Full Cycle Rocks!</h1>");

    dataNames.map((item) => {
      response.write(`<h2>${item.name}</h2>`);
    });

    response.end();
  })
  .listen(3333);
