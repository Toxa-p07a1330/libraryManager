import React from 'react';
import {UserContext} from "./Context";

class Sidemenu extends React.Component{
    style= {
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "5px",
        display:"inline-block",
        align: "left",
        width:"15%",
        minHeight:"100%"
    }
    render(props) {
        return (
            <UserContext.Consumer>
                {(context)=>{
                    return (
                        <div style={this.style}>
                            <ul>
                                <li><a>Главная</a></li>
                                <li><a>Книги</a></li>
                                <li><a>Авторы</a></li>
                                <li><a>Отделения библиотеки</a></li>
                                {context.isAdmin?<li><a>Пользователи</a></li>:""}
                                {context.isAdmin?<li><a>История операций</a></li>:""}
                                {context.isAdmin?<li><a>Статистика</a></li>:""}
                            </ul>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        );
    }
}
export default Sidemenu;