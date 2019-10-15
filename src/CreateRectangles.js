import React from 'react';
import Rectangle from './Rectangle.js';
// import './Rectangle.css'


export default function CreateRectangles(props){
    // var style = {
    //     width: props.width,
    //     height: props.height,
    //     margin: props.margin,
    // }
    var rectNum = props.rectNum;
    var maxWidth = props.maxWidth;
    var heights = props.heights;

    var width = Math.round(maxWidth/rectNum);
    var margin = 1;

    var rects = [];

    for(var i = 0; i < rectNum; ++i){
        var height = heights[i];
        var data = height;
        if (height == 0) {
            data = "";
        }
        //alert(height);
        if (props.lightUp.includes(i)){
            //console.log(i, props.lightUp);
            rects.push(<Rectangle width={width} height={height} margin={margin} data={data} color={true}/>);
            
        } else {
            rects.push(<Rectangle width={width} height={height} margin={margin} data={data}/>);
        }
    }

    return <span> {rects} </span>;
}