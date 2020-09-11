import React from "react";
import {UserContext} from "./Context";

class Registration extends React.Component{
    render() {
        let style = {
            left: "50%",
            top: "50%",
        }
        let tryToReg = (context)=>{

            let fName = document.getElementById("fName").value;
            let sName = document.getElementById("sName").value;
            let tName = document.getElementById("tName").value;
            let login = document.getElementById("login").value;
            let password = document.getElementById("password").value;
            let rPassword = document.getElementById("r-password").value;
            let mobilePhone = document.getElementById("mobilePhone").value;
            let email = document.getElementById("email").value;
            let wasBorn = document.getElementById("wasBorn").value;

            console.log(context.wayToApi+"registration/")
            if (password!==rPassword)
                alert("Пароли не совпадают ")
            else {
                fetch(context.wayToApi+"registration/?fName="+fName+"&"+"sName="+sName+"&"+"tName="+tName+"&" +
                    "login="+login+"&"+"password="+password+"&"+"email="+email+"&mobilePhone="+mobilePhone+
                    "&wasBorn="+wasBorn).then(
                    (response)=>{
                        response.json().then(
                            (json)=>{
                                console.log(json)
                            },
                            (reject)=>{
                                console.log(reject)
                            }
                        )
                    },
                    (reject)=>{
                        console.log(reject)
                }
                )
            }
        }

        return (
           <UserContext.Consumer>
               {


                   (context)=>{
                       return (
                           <div style={this.style}>
                              <form>
                                           Логин:<input type={"text"} id = "login"/><br/>
                                           Пароль:<input type={"text"} id = "password"/><br/>
                                           Повторите пароль:<input type={"text"} id = "r-password"/><br/>
                                           Имя:<input type={"text"} id = "fName"/><br/>
                                           Фамилия:<input type={"text"} id = "sName"/><br/>
                                           Отчество:<input type={"text"} id = "tName"/><br/>
                                           Дата рождения (дд.мм.гггг):<input type={"text"} id = "wasBorn"/><br/>
                                           email:<input type={"text"} id = "email"/><br/>
                                           номер телефона:<input type={"text"} id = "mobilePhone"/><br/>

                              </form>
                               <button onClick={()=>{tryToReg(context)}}>Зарегистрироваться</button>
                           </div>
                       )
                   }
               }
           </UserContext.Consumer>
        );
    }
}
export default Registration;