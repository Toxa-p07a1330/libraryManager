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


function  getDataFromSQLite(request){
    let promise;
    console.log(request)
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('../database/database.db');

    promise = new Promise((resolve, reject)=>{
        db.serialize(()=>{
            db.all(request, (err, rows)=>{
                if (err)
                    reject(err);
                else
                    resolve(rows);

            })
        })
        db.close();
    });
    return promise;
}

function sendDataToClient(request, responseTarget){
   // console.log(request);



    getDataFromSQLite(request).then(
        (result)=> {
        //console.log(result);
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


function writeNewUserToDatabase(user){
    let request = `INSERT INTO user (fName, sName, tName, login, password, email, mobilePhone, wasBorn) 
    VALUEs(\'${user.fName}\', \'${user.sName}\', \'${user.tName}\', \'${user.login}\',
         \'${user.password}\', \'${user.email}\', \'${user.mobilePhone}\', \'${user.wasBorn}\')`;
    console.log(request);
    getDataFromSQLite(request).then(
        (response)=>{console.log(response)},
        (reject)=>{console.log(reject)});
}
function registrate(url, response){
    let user = requestParamsToObjest(url);
    let keys = ["login", "mobliePhone", "email"];
    getDataFromSQLite("SELECT * FROM USER WHERE LOGIN= \'"+user.login+"\'").then(
        (responseLogin)=>{
            if (responseLogin.length===0){
                getDataFromSQLite("SELECT * FROM USER WHERE mobilePhone= \'"+user.mobilePhone+"\'").then(
                    (responseMobile)=>{
                        if (responseMobile.length===0){
                            getDataFromSQLite("SELECT * FROM USER WHERE email= \'"+user.email+"\'").then(
                                (responseEmail)=>{
                                    if (responseEmail.length===0){
                                        response.write(JSON.stringify({success:true}));
                                        writeNewUserToDatabase(user);
                                        response.end();
                                    }
                                    else {
                                        response.write(JSON.stringify({success:false, reason:"Email"}))
                                        response.end();
                                    }
                                },
                                (reject)=>{
                                    console.log(reject)
                                }
                            )
                        }
                        else {
                            response.write(JSON.stringify({success:false, reason:"Номер телефона "}))
                            response.end();
                        }
                    },
                    (reject)=>{
                        console.log(reject)
                    }
                )
            }
            else {
                response.write(JSON.stringify({success:false, reason:"Логин"}))
                response.end();
            }

        },
        (reject)=>{
            console.log(reject)
        }
    )


}

function tryLogin(url, response){
    url = url.replace("login", "user")
    parceRequest(url, response)
}


http.createServer(function(request, response){

    request.url = decodeURI(request.url);
    initializeMap();
    response.setHeader("Content-Type", "application/json; charset=UTF-8");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Cache-Control");
    response.statusCode = 200;
    if (request.url.indexOf("favicon")>-1)
        response.end();
    else {
        if (request.url.indexOf("api")<0)
            response.end()
        else {
            if (request.url.split("/")[2]==="registration")
                registrate(request.url, response);
            else
                if(request.url.split("/")[2]==="ban"){
                    ban(request.url, response);
                }
                else
                    parceRequest(request.url, response);
        }
    }



}).listen(3001);