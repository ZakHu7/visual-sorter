import React from 'react';
import Rectangle from './Rectangle.js';
// import './Rectangle.css'

// To create all the Rectangles that is used for the data

export default function CreateRectangles(props){
    // var style = {
    //     width: props.width,
    //     height: props.height,
    //     margin: props.margin,
    // }
    var rectNum = props.rectNum;
    var data = props.data;
    var lightUp = props.lightUp;
    var maxWidth = props.maxWidth;

    
    var margin = 0.5;
    var width = Math.floor(maxWidth/rectNum);

    var rects = [];

    for(var i = 0; i < rectNum; ++i){
        if (data === undefined || data[i] === undefined) {
            continue;
        }
        //console.log(i);
        var rect = data[i];
        var height = rect.height;
        var width = width;
        var color = rect.color;
        var displayHeight = height;
        if (height == 0) {
            displayHeight = "";
        }
        //props.lightUp.includes(i)
        if (lightUp.includes(i)){
            //console.log(i, props.lightUp);
            rects.push(<Rectangle key={i} width={width} height={height} margin={margin} displayHeight={displayHeight} color={color}/>);
            
        } else {
            rects.push(<Rectangle key={i} width={width} height={height} margin={margin} displayHeight={displayHeight} color={color}/>);
        }
    }

    return <span> {rects} </span>;
}