import React from "react";
import {UserContext} from "./Context";

class Registration extends React.Component{
    render() {
        let style = {
            left: "50%",
            top: "50%",
            borderColor: "#cfc78c",
            borderStyle: "inset",
            borderWidth: "5px",
            display: "inline-block",
            marginLeft:"20%",
            marginTop:"10%",
            padding:"3%"
        }
        let validate = (email, mobile, login, password)=>{
            if (!email.match("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")) {
                alert("Недопустимый емайл")
                return false;
            }
            if (!mobile.match("^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$")) {
                alert("Недопустимый номер телефона")
                return false;
            }
            if(!login.match("^(?=.*[A-Za-z0-9]$)[A-Za-z][A-Za-z\\d.-]{0,19}$")){
                alert("Недоспустимый логин")
                return false;
            }
            if(!password.match("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{8,}$")) {
                alert("Недопустимый пароль")
                return false;
            }
            return true;
        };
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

            if (!validate(email,mobilePhone, login, password))
                return null;


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
                                if(json.success){
                                    alert("Вы зарегестрированы! Письмо отправлено на ваш почтовый ящик!")
                                }
                                else {
                                    alert(json.reason+" Уже используется...")
                                }
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
                           <div style={style}>
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