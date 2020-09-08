const http = require("http");



//DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG




//DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG


class Book{
    id;
    name;
    storageID;
    authorID;
    genre;
    date;
    isTaken;
    takersID;
}
class User{
    id;
    login;
    password;
    isAdmin;
    fName;
    sName;
    tName;
    email;
    mobilePhone;
    wasBorn;
    numberOfBookTaken;
    isBanned;
    banReason;
}
class Author{
    id;
    fName;
    sName;
    tName;
    wasBorn;
    diedAt;
}
class Storage{
    id;
    address;
    startWorkingAt;
    endWorkingAt;
}
class Operation{
    id;
    roleRequired;
    comment;
}
class History{
    id;
    operationID;
    userID;
    bookID;
    date;
}

let tables = new Map();
function initializeMap() {
    tables.set("user", new User());
    tables.set("author", new Author());
    tables.set("storage", new Storage());
    tables.set("operation", new Operation());
    tables.set("history", new History());
    tables.set("book", new Book());
}

/*
this block of functions returns JSON representation of object
@args - string of params in form  key=val&key1=val1
returns JSON string of rows ejected froms corresponding table with this fields
*/


function sendDataToClient(request, responseTarget){
    console.log(request);
    function  getDataFromSQLite(request){
        let promise;
        let sqlite3 = require('sqlite3').verbose();
        let db = new sqlite3.Database('../database/database.db');
        promise = new Promise((resolve, reject)=>{
            db.serialize(()=>{
                db.all(request, (err, rows)=>{
                    if (err)
                        reject();
                    else
                        resolve(rows);
                })
            })
            db.close();
        });
        return promise;
    }


    getDataFromSQLite(request).then(
        (result)=> {
        console.log(result);
        responseTarget.write(JSON.stringify(result));
        responseTarget.end();

    },
        (error)=>console.log(error)
    );
    return 1;
}
function parser(tableName, args, responseTarget){

    let fields = Object.assign({}, tables.get(tableName));
    convertObjectToArgType(requestParamsToObjest(args), fields)
    let requestSQL = convertToSQLRequest(fields, tableName);
    if (!args)
        requestSQL = "SELECT * from " + tableName + ";";
    sendDataToClient(requestSQL, responseTarget);

};



function requestParamsToObjest  (request){
    let obj = {};
    try {


        let params = request.substr(request.indexOf("?") + 1).split("&");
        if (params.indexOf("favicon") < 0) {
            for (let i of params) {
                let name = i.split("=")[0];
                let val = i.split("=")[1];
                obj[name] = val;
            }
        }
    }
    catch (e){
        console.log(e);
    }
    return obj;
};
function parceRequest  (requestStr, responseTarget){
    let parts = requestStr.split("/");
    if (parts[1]!=="api")
        return null;
    else
        parser(parts[2], parts[3], responseTarget);
}
function convertObjectToArgType  (untypedObject, typedObject){
    for (let i of Object.keys(typedObject))
        typedObject[i] = untypedObject[i];
    return typedObject;
}
function convertToSQLRequest  (object, tableName){
let request = "SELECT * FROM "+tableName+" WHERE ";
    if (!Object.keys(object).length)
        return  request.replace("where", ";");
    for (let i of Object.keys(object))
    {
        if (object[i]!==undefined)
            request+=i.valueOf()+" = \'"+object[i]+"\' AND ";
    }
    request = request.substr(0, request.lastIndexOf("AND"));
    request+=";"
    return request;
}

function registrate(url){
    console.log(url)        //todo implement
}

http.createServer(function(request, response){

    request.url = decodeURI(request.url);
    initializeMap();
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    response.statusCode = 200;
    if (request.url.indexOf("favicon")>-1)
        response.end();
    else {
        if (request.url.indexOf("api")<0)
            response.end()
        else {
            if (request.url.split("/")[2]=="registration")
                registrate(request.url);
            else
                parceRequest(request.url, response);
        }
    }



}).listen(3001);