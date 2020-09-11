import React from "react";
import {UserContext} from "./Context";

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
                                    <input type="button" value="Отправить" onClick={()=>{

                                        let login = document.getElementById("login").value;
                                        let password = document.getElementById("password").value;
                                        let api = context.wayToApi + `login/?login=${login}&password=${password}`;
                                        console.log(api)
                                        let users = fetch(api);
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