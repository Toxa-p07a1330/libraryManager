import React from "react";
import {UserContext} from "./Context";


function setCookie(name, value, options = {}) {

    options = {
        path: '/',
      ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

class Login extends React.Component{
    render() {
        let style = {
            marginLeft: "25%",
            marginTop: "15%",
            padding:"3%",
            display: "inline-block",
            borderColor: "#cfc78c",
            borderStyle: "inset",
            borderWidth: "5px"
        }
        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        return (
                            <div style={style}>
                                <form>
                                    <div>
                                        Логин
                                        <input type={"text"} name="login" id = "login"/>
                                    </div>
                                    <div>Пароль
                                        <input type={"password"} name="password" id = "password"/>
                                    </div>
                                    <div>Запомнить меня на этом устройстве
                                        <input type={"checkbox"} name="remember" id = "remember"/>
                                    </div>
                                    <a href={"/home"}>
                                        <button value="Войти" onClick={()=>{
                                        let login = document.getElementById("login").value;
                                        let password = document.getElementById("password").value;
                                        let remember = document.getElementById("remember").checked;
                                        let api = context.wayToApi + `user/?login=${login}&password=${password}`;
                                        fetch(api).then(
                                            (response)=>{
                                                response.json().then((json)=>{
                                                    if (json[0]){
                                                        if (json[0].isBanned)
                                                            alert("Вы были заблокированы...")
                                                        else {
                                                            context.setAuth(json[0].id)
                                                            setCookie("id", json[0].id);
                                                            if (json[0].isAdmin) {
                                                                context.toggleAdmin();
                                                                setCookie("isAdmin", json[0].isAdmin)
                                                            }
                                                            ;
                                                            if (remember) {
                                                                document.cookie = `isAdmin= ${json[0].isAdmin}; expires = Thu, 01 Jan 2038 00:00:00 GMT`;
                                                                document.cookie = `id= ${json[0].id}; expires = Thu, 01 Jan 2038 00:00:00 GMT`;
                                                            }
                                                        }
                                                    }
                                                    else
                                                        alert("Неправильный логин или пароль");
                                                });
                                            },
                                            (reject)=>{console.log(reject)}
                                        )
                                        }}>Войти</button>
                                        </a>
                                </form>

                                <div>
                                    Не зарегестиророваны? <a href={"registration"}>Зарегистрироваться!</a>
                                </div>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Login;