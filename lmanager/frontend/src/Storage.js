import React from "react";
import {UserContext} from "./Context";



class Storage extends React.Component{
    constructor() {
        super();
        this.state = {
            isLoaded: false,
        }

    }
    style = {
        display: "inline-block",
        width: "100%",
        height: "40%",
        padding: "1%",
        borderColor: "#cfc78c",
        borderStyle: "inset",
        borderWidth: "2px",
    }



    render() {

        return (
            <UserContext.Consumer>
                {
                    (context)=>{
                        {
                            let id = context.removeFromStack()
                            let wayToAPI =context.wayToApi+"storage/&id="+id;
                            if (!this.state.isLoaded)
                            {
                                fetch(wayToAPI).then(
                                    (response)=>{
                                        response.json().then(
                                            (json)=>{
                                                console.log(json)
                                                this.setState({data: json[0], isLoaded: true})

                                            },
                                            (reject)=>{
                                                console.log(reject)
                                            }
                                        )
                                    },
                                    (reject)=>{
                                        console.log(reject)
                                    });


                            }
                        }
                        let isLoaded = this.state.isLoaded;
                        return(

                            <div style={this.style}>
                                <div>
                                    Отделение №{isLoaded?this.state.data.id:""}
                                </div>
                                <div>
                                    Адрес: {isLoaded?this.state.data.address:""}
                                </div>
                                <div>
                                    Начинает работу в {isLoaded?this.state.data.startWorkingAt:""}
                                </div>
                                <div>
                                    Заканчивает работу в {isLoaded?this.state.data.endWorkingAt:""}
                                </div>
                                <div>
                                    {isLoaded?(this.state.data.isActive?"Д":"Не д"):""}оступно для посещения
                                </div>
                                <div>
                                    {
                                        (()=>{
                                            if(this.state.data)
                                            {
                                                let openTime = this.state.data.startWorkingAt;
                                                let closeTime = this.state.data.endWorkingAt;
                                                closeTime = +(closeTime.split(":")[1])+(+(closeTime.split(":")[0]*60))
                                                openTime = +(openTime.split(":")[1])+(+(openTime.split(":")[0]*60))
                                                let ret;
                                                let currentTime = (new Date()).getHours()*60+(new Date()).getMinutes();
                                                if (currentTime<openTime)
                                                    ret = "Откроется через "+Math.floor((openTime-currentTime)/60)+" часов "
                                                        +(openTime-currentTime)%60+" минут(ы)";
                                                if (currentTime<closeTime)
                                                    ret= "Закроется через "+Math.floor((closeTime-currentTime)/60)+" часов "
                                                        +(closeTime-currentTime)%60+" минут(ы)";
                                                if(currentTime>closeTime)
                                                    ret = "Откроется через "+Math.floor((24*60+openTime-currentTime)/60)+" часов "
                                                        +(24*60+openTime-currentTime)%60+" минут(ы)";
                                                ret = ret.replace(" 0 часов", "");

                                                return ret;


                                            }
                                        })()
                                    }
                                </div>
                            </div>
                        )
                    }
                }
            </UserContext.Consumer>
        );
    }
}
export default Storage;

