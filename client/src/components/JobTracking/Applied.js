import React from "react";
import CompanyInfo from "./subComponents/CompanyInfo"
import StatusBar from "./subComponents/StatusBar"
import Position from "./subComponents/Position"
import Contact from "./subComponents/Contact"
import Interview from "./subComponents/Interview"
import NewContactBtn from "./subComponents/NewContactBtn"
import NewInterviewBtn from "./subComponents/NewInterviewBtn"

function Applied(){
    return(
        <div>
            <CompanyInfo />
            <StatusBar />
            <NewContactBtn />
            <Contact />
            <NewInterviewBtn />
            <Interview />
            <Position />
        </div>
    )
}

export default Applied;