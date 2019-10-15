import React from 'react';
import './Rectangle.css'


export default function Rectangle(props){
    var color = "#86C232";
    if(props.color){
        color = "#32C2AA";
    }
    var rectangleStyle = {
        width: props.width,
        height: props.height,
        margin: props.margin,
        backgroundColor: color,
    }

    var labelStyle = {
        //left: Math.round(props.width/5),
        bottom: 12,
    }

    return (
        <span className="rectangle" style={rectangleStyle}>
            <div className="label" style={labelStyle}>
                {props.data} 
            </div>
        </span>
    );
}