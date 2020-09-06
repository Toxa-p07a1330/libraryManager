import React from 'react';
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
            <div style={this.style}>
                <ul>
                    <li><a>Главная</a></li>
                    <li><a>Книги</a></li>
                    <li><a>Авторы</a></li>
                    <li><a>Отделения библиотеки</a></li>
                    {this.props.isAdmin?<li><a>Пользователи</a></li>:""}
                    {this.props.isAdmin?<li><a>История операций</a></li>:""}
                    {this.props.isAdmin?<li><a>Статистика</a></li>:""}
                </ul>
            </div>
        );
    }
}
export default Sidemenu;