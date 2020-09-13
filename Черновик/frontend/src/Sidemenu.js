import React from 'react';
import {UserContext} from "./Context";

class Sidemenu extends React.Component{
    style= {
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "5px",
        display:"inline-block",
        align: "left",
        padding: "1%",
        minHeight:"100%",
        verticalAlign:"top",
    }
    render(props) {
        return (
            <UserContext.Consumer>
                {(context)=>{
                    let isAuth = context.id;
                    return (
                        <div style={this.style}>
                            <ul>
                                <li><a href={"/home"}>Главная</a></li>
                                <li><a href = {"/books"}>Книги</a></li>
                                <li><a href={"/authors"}>Авторы</a></li>
                                <li><a href={"/storages"}>Отделения библиотеки</a></li>
                                {isAuth?<li><a href={"/profile"}>Мой профиль</a></li>:""}
                                {isAuth?"":<li><a href={"/login"}>Вход</a></li>}
                                {isAuth?"":<li><a href={"/registration"}>Регистрация</a></li>}
                                {context.isAdmin?<li><a href={"/users"}>Управление пользователями</a></li>:""}
                                {context.isAdmin?<li><a href={"/history"}>История операций</a></li>:""}
                                {isAuth?<li><a onClick={context.exit} href="/">Выход</a></li>:""}
                            </ul>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}
export default Sidemenu;