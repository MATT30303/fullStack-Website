import React from "react";
import "../main.css"
import Sign from "../components/landing/sign/sign"
import Background from "../components/landing/background/background.jsx";
export default function landing(){
    return(
        <div>
            <Background></Background>
            <Sign></Sign>
            
        </div>
    );
}