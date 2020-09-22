const http = require("http");
const nodemailer = require('nodemailer');
class Book{
    constructor(){
        this.id = undefined;
        this.name = undefined;
        this.storageID = undefined;
        this.authorID = undefined;
        this.genre = undefined;
        this.date = undefined;
        this.isTaken = undefined;
        this.takersID = undefined;
    }
}
class User{
    constructor(){
        this.id = undefined;
        this.login = undefined;
        this.password = undefined;
        this.isAdmin = undefined;
        this.fName = undefined;
        this.sName = undefined;
        this.tName = undefined;
        this.email = undefined;
        this.mobilePhone = undefined;
        this.wasBorn = undefined;
        this.numberOfBookTaken = undefined;
        this.isBanned = undefined;
        this.banReason = undefined;
    }
}
class Author{
    constructor(){
        this.id = undefined;
        this.fName = undefined;
        this.sName = undefined;
        this.tName = undefined;
        this.wasBorn = undefined;
        this.diedAt = undefined;
    }
}
class Storage{
    constructor(){
        this.id = undefined;
        this.address = undefined;
        this.startWorkingAt = undefined;
        this.endWorkingAt = undefined;
    }
}
class Operation{
    constructor(){
        this.id = undefined;
        this.roleRequired = undefined;
        this.comment = undefined;
    }
}
class History{
    constructor(){
        this.id = undefined;
        this.operationID = undefined;
        this.userID = undefined;
        this.bookID = undefined;
        this.date = undefined;
    }
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

function sendEmail(email, message){
    let transporter = nodemailer.createTransport({
        host: "smtp.yandex.com",
        secureConnection: false,
        port: 587,
        requiresAuth: true,
        secure: false,
        auth: {
            type: "login",
            user: "libManager@yandex.ru",
            pass: "libManagerPassword"
        }
    });

    transporter.sendMail({
        from: "libManager@yandex.ru",
        to: email,
        subject: "Message from libManager",
        html: message
    }).then((resolve)=>{
        console.log(resolve)
    },
        (reject)=>{
            console.log(reject)
        });
}

function log(loggingSQL){
        getDataFromSQLite(loggingSQL).then((resolve, reject)=>{console.log(reject)});
}
function  getDataFromSQLite(request){

    console.log(request)
    let sqlite3 = require('sqlite3').verbose();
    let db = new sqlite3.Database('../database/database.db');
    return new Promise((resolve, reject)=>{
        db.serialize(()=>{
            db.all(request, (err, rows)=>{
                if (!err)
                {
                   resolve(rows)
                }
                else {
                    reject(err);
                }
            })
        })
        db.close();
    });
}

function sendDataToClient(request, responseTarget){
      getDataFromSQLite(request).then(
        (result)=> {
        responseTarget.write(JSON.stringify(result));
        responseTarget.end();
    },
        (error)=>console.log(error)
    );
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
    sendEmail(user.email, `${user.fName}, cпасибо за регистрацию! Вы можете пользоваться данным почтовым ядресом для решения проблем или отправки обратной связи`);
    let loggingSQL = `insert into history (operation, date) values 
        (${"\'Пользователь №"+user.id+" зарегистрирован\'"}, \'${new Date().toString()}\')`;
    log(loggingSQL);
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
function unblock(id, response){
    let requestSQL = `UPDATE user set isBanned=\'0\', banReason = \'\' where id=\'${id}\'`;
    sendDataToClient(requestSQL, response);
    let loggingSQL = `insert into history (operation, date) values 
        (${"\'Пользователь №"+id+" разблокирован.\'"}, \'${new Date().toString()}\')`;
    log(loggingSQL);
    getDataFromSQLite(`SELECT * FROM USER WHERE id=${id};`).then(
        (response)=>{
            sendEmail(response[0].email, `${response[0].fName}, по решению администрации, бан был снят` )
        },
        (reject)=>{
            console.log(reject);
        }
    )

}
function block(id, reason, response){
    let requestSQL = `UPDATE user set isBanned=\'1\', banReason = \'${reason}\' where id=\'${id}\'`;
    sendDataToClient(requestSQL, response);
    let loggingSQL = `insert into history (operation, date) values 
        (${"\'Пользователь №"+id+" заблокирован. Причина: "+reason+"\'"}, \'${new Date().toString()}\')`;
    log(loggingSQL);
    getDataFromSQLite(`SELECT * FROM USER WHERE id=${id};`).then(
        (response)=>{
            if(reason)
                sendEmail(response[0].email, `${response[0].fName}, вы были забанены за ${reason}.
            Для снятия бана свяжитесь с администратором`)
        },
        (reject)=>{
            console.log(reject);
        }
    )
};
function toggleBlock(url, response){
   let objParams = requestParamsToObjest(url);
   let isBanned = objParams.isBanned === "true" || objParams.isBanned === "1";
   if(isBanned ){
       unblock(objParams.id, response)
   }
   else
       block(objParams.id, objParams.reason, response)

}

function setAdmin(id, response){
    let requestSQL = `UPDATE user set isAdmin=\'0\' where id=\'${id}\'`;
    sendDataToClient(requestSQL, response);
    let loggingSQL = `insert into history (operation, date) values 
        (${"\'Пользователь №"+id+" Назначен администратором\'"}, \'${new Date().toString()}\')`;
    log(loggingSQL);

    getDataFromSQLite(`SELECT * FROM USER WHERE id=${id};`).then(
        (response)=>{
            sendEmail(response[0].email, `${response[0].fName}, по решению администрации, у вас изъяты права администратора` )
        },
        (reject)=>{
            console.log(reject);
        }
    )
}
function setUser(id, response){
    let requestSQL = `UPDATE user set isAdmin=\'1\' where id=\'${id}\'`;
    sendDataToClient(requestSQL, response);
    let loggingSQL = `insert into history (operation, date) values 
        (${"\'Администратор №"+id+" понижен в правах\'"}, \'${new Date().toString()}\')`;
    log(loggingSQL);

    getDataFromSQLite(`SELECT * FROM USER WHERE id=${id};`).then(
        (response)=>{
            sendEmail(response[0].email, `${response[0].fName}, вам выданы права администраторат` )
        },
        (reject)=>{
            console.log(reject);
        }
    )
};
function toggleAdmin(url, response){
    let objParams = requestParamsToObjest(url);
    console.log(objParams)
    if(objParams.isAdmin!=='1'){
        setUser(objParams.id, response);
    }
    else
        setAdmin(objParams.id, response)
}
function toggleBook(url, response){
    let objParams = requestParamsToObjest(url);
    console.log(objParams)
    if(objParams.takersID!==undefined){
        let requestSQL = `UPDATE book set takersID=\'${objParams.takersID}\' where id=\'${objParams.id}\'`;
        console.log(requestSQL);
        sendDataToClient(requestSQL, response);
        let loggingSQL = `insert into history (operation, date) values 
        (${"\'Книга №"+objParams.id+" взята пользователем №"+objParams.takersID+"\'"}, \'${new Date().toString()}\')`;
        log(loggingSQL);
    }
    else {
        let requestSQL = `UPDATE book set takersID=\'\' where id=\'${objParams.id}\'`;
        sendDataToClient(requestSQL, response);
        let loggingSQL = `insert into history (operation, date) values 
        (${"\'Книга №"+objParams.id+" сдана\'"}, \'${new Date().toString()}\')`;
        log(loggingSQL);

    }
}

function manageMail (url, response){
    let objParams = requestParamsToObjest(url);
    console.log(objParams





    )
    sendEmail(objParams.email, objParams.message)
    response.end();

}
http.createServer(function(request, response){

	console.log("Start listerning");
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
                if(request.url.split("/")[2]==="toggleBlock"){
                    toggleBlock(request.url, response);
                }
                else
                    if(request.url.split("/")[2]==="toggleAdmin"){
                        toggleAdmin(request.url, response);
                    }
                    else
                        if(request.url.split("/")[2]==="toggleBook"){
                            toggleBook(request.url, response);
                        }
                        else
                            if(request.url.split("/")[2]==="sendMail"){
                                manageMail(request.url, response);
                            }
                            else
                                parceRequest(request.url, response);
        }
    }



}).listen(3001);