import React from 'react';
import './Rectangle.css'


export default function Rectangle(props){
    var color = "#86C232";
    if(props.color){
        color = "#61892F";
    }
    var style = {
        width: props.width,
        height: props.height,
        margin: props.margin,
        backgroundColor: color,
    }

    return <span className="rectangle" style={style}> {props.data} </span>
}