import React, { useEffect, useState } from 'react';
import { blue } from '@material-ui/core/colors';
import StackUtils from 'stack-utils';
import './Rectangle.css'

//NotUsed, was trying to see if this can perform intervals properly

export default function Clock(props){
    const [currentCount, setCount] = useState(100);



    function timer(){
        setCount(currentCount - 10);
    };

    useEffect(() => {
        if (currentCount <= 0) {
            return;
        }
        const id = setInterval(timer, 1000);
        return () => clearInterval(id);
        },
        [currentCount]
    );
    
    var style = {
        width: 50,
        height: currentCount,
        margin: props.margin,
    }


    return <div className='rectangle' style={style}>{currentCount}</div>;
}