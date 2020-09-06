const http = require("http");



//DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG


function  DEBUG(){

};

//DEBUG DEBUG DEBUG DEBUG DEBUG DEBUG

//todo implement
class Book{

}
class User{

}
class Author{

}
class Storage{
id;
address;
startWorkingAt;
endWorkingAt;
}
class Operation{

}
class History{

}
/*
thia block of functions returns JSON representation of object
@args - string of params in form  key=val&key1=val1
returns JSON string of rows ejected froms corresponding table with this fields
*/

function authorAPI(args){
    let author = new Author();
    convertObjectToArgType(requestParamsToObjest(args), author)

    let requestSQL = convertToSQLReqcuest(author, "author");
    //todo
    /*
    implement logic of working with database
    */

};


function userAPI (args){};
function storageAPI (args){};
function bookAPI (args){};
function historyAPI (args){};
function operationAPI (args){};


function requestParamsToObjest  (request){
    let obj = {};
    let params = request.substr(request.indexOf("?")+1).split("&");
    if (params.indexOf("favicon")<0){
        for (let i of params)
        {
            let name = i.split("=")[0];
            let val = i.split("=")[1];
            obj[name] = val;
        }
    }
    return obj;
};
function parceRequest  (requestStr){
    let parts = requestStr.split("/");
    if (parts[0]!="api"){
        return null;
    }
    else {
        switch (parts[1]){
            case "user":
                userAPI(parts[2]);
                break;
            case "book":
                bookAPI(parts[2]);
                break;
            case "operation":
                operationAPI(parts[2]);
                break;
            case "author":
                authorAPI(parts[2]);
                break;
            case "history":
                historyAPI(parts[2]);
                break;
            case "storage":
                storageAPI(parts[2]);
                break;
        }
    }
}
function convertObjectToArgType  (untypedObject, typedObject){
    for (let i of Object.keys(typedObject))
        typedObject[i] = untypedObject[i];
    return typedObject;
}
function convertToSQLReqcuest  (object, tableName){
let request = "SELECT * FROM "+tableName+" WHERE ";
    for (let i of Object.keys(object))
    {
        request+=i.valueOf()+" = "+object[i]+" AND ";
    }
    request = request.substr(0, request.lastIndexOf("AND"));
    request+=";"
    return request;
}


http.createServer(function(request, response){


    if (request.url.indexOf("favicon")>-1)
        response.end();
    else {
        if (request.url.indexOf("api")<0)
            response.end()
        else
            parceRequest(request.url);

    }



}).listen(3000);