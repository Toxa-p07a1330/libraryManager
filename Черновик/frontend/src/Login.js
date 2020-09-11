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
            left: "50%",
            top: "50%",
        }
        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        let remember = false;
                        return (
                            <div>
                                <form>
                                    <div>
                                        Логин
                                        <input type={"text"} name="login" id = "login"/>
                                    </div>
                                    <div>Пароль
                                        <input type={"text"} name="password" id = "password"/>
                                    </div>
                                    <div>Запомнить меня на этом устройстве
                                        <input type={"checkbox"} name="remember" id = "remember"/>
                                    </div>
                                    <input type="button" value="Войти" onClick={()=>{

                                        let login = document.getElementById("login").value;
                                        let password = document.getElementById("password").value;
                                        let remember = document.getElementById("remember").checked;;
                                        let api = context.wayToApi + `login/?login=${login}&password=${password}`;
                                        fetch(api).then(
                                            (response)=>{
                                                response.json().then((json)=>{

                                                    if (json[0]){
                                                        context.setAuth(json[0].login)
                                                        if(remember)
                                                            setCookie("login", login);
                                                        if (json[0].isAdmin){
                                                            context.toggleAdmin();
                                                            if(remember)
                                                                setCookie("isAdmin", json[0].isAdmin)
                                                        };
                                                    }
                                                    else
                                                        alert("Неправильный логин или пароль");
                                                });
                                            },
                                            (reject)=>{console.log(reject)}
                                        )
                                    }}/>
                                </form>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Login;