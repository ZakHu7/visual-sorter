import React, { useEffect } from 'react';
// import logo from './logo.svg';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import './App.css';

import Rectangle from './Rectangle.js';
import SingleSelect from './SingleSelect.js';
import CreateRectangles from './CreateRectangles.js';

import BubbleSort from './BubbleSort.js';
import MergeSortSwitch from './MergeSortSwitch.js';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        light: '#86C232',
        main: '#86C232',
        dark: '#86C232',
      },
      secondary: {
        light: '#474B4F',
        main: '#474B4F',
        dark: '#474B4F',
      }
    },
      
})
// Goal: To create a visual realization of sorting algorithms.
// Create rectangles as data points.
// 1. Line up rectangles at the bottom
// 2. Array of heights should be the state of the main program


function getHeights(rectNum, maxRectHeight){
  var res = [];
  for(var i = 0; i < rectNum; ++i){
    res.push(Math.round(Math.random() * maxRectHeight));
  }
  //console.log(res);
  return res;
}




function App() {

  const useStyles = makeStyles(theme => ({
    button: {
        background: '#86C232',
        margin: "5px",
        color: "white",
    }
  }));

  window.addEventListener("resize", updateWidth);

  //const maxWidth = 1200;
  var maxRectHeight = 200;
  const [maxWidth, setMaxWidth] = React.useState(window.innerWidth * 0.7);


  // filters
  const [sortType, setSortType] = React.useState("BubbleSort");
  const [rectNum, setRectNum] = React.useState(50);
  const [speed, setSpeed] = React.useState(1);

  // data tracking
  const [heights, setHeights] = React.useState(getHeights(rectNum,maxRectHeight));
  const [steps, setSteps] = React.useState([]);
  const [totalSteps, setTotalSteps] = React.useState(0);
  const [stepsCounter, setStepsCounter] = React.useState(0);
  const [lightUp, setLightUp] = React.useState([]);


  function updateWidth(){
    setMaxWidth(window.innerWidth * 0.7);
  }

  function timer(){
    // console.log(steps);
    // console.log(totalSteps);
    // console.log(stepsCounter);

    let index = totalSteps - stepsCounter;

    if(steps[index][0] == 's'){
      let a = steps[index][1];
      let b = steps[index][2];

      let tmp = heights[a];
      heights[a] = heights[b];
      heights[b] = tmp;

      setLightUp([a,b]);
    } else if(steps[index][0] == 'p'){
      let a = steps[index][1];
      let b = steps[index][2];

      heights[a] = b;

      setLightUp([a]);
    }

    
    setHeights(heights);
    setStepsCounter(stepsCounter - 1);
  };

  useEffect(() => {
      if (stepsCounter <= 0) {
          return;
      }
      const id = setInterval(timer, speed);
      return () => clearInterval(id);
      },
      [stepsCounter]
  );

  useEffect(() => {
    setHeights(getHeights(rectNum,maxRectHeight));
    },
    [rectNum]
  );

  function Sort(heights, setSteps, setStepsCounter, setTotalSteps){
    if(sortType == "BubbleSort"){
      BubbleSort(heights, setSteps, setStepsCounter, setTotalSteps);
    } else if(sortType == "MergeSort(Switch)"){
      MergeSortSwitch(heights, setSteps, setStepsCounter, setTotalSteps);
    }
  }

  const classes = useStyles();
  return (
    <MuiThemeProvider theme={theme}>

      
      <div className="App">
        <div className="App-header">
          {/* {JSON.stringify(maxWidth)} */}
          <Button
              className={classes.button}
              variant="contained"
              onClick={() => setHeights(getHeights(rectNum,maxRectHeight))}
          >
            Randomize
          </Button>
          <SingleSelect 
            title={"Type of Sort"}
            items={["BubbleSort", "MergeSort(Switch)", "MergeSort(Put)", "HeapSort"]}
            value={sortType}
            onChange={(sortType) => setSortType(sortType)}
          />
          <SingleSelect 
            title={"Data Points"}
            items={[10, 25, 50, 100]}
            value={rectNum}
            onChange={(rectNum) => setRectNum(rectNum)}
          />
          <SingleSelect 
            title={"Speed(ms)"}
            items={[1, 50, 100, 500]}
            value={speed}
            onChange={(speed) => setSpeed(speed)}
          />
          <Button
              className={classes.button}
              variant="contained"
              onClick={() => Sort(heights, setSteps, setStepsCounter, setTotalSteps)}
          >
            Sort
          </Button>
        </div>
        <div className="App-main">
          {/* <Clock></Clock> */}
          <CreateRectangles
            rectNum={rectNum}
            maxWidth={maxWidth} 
            heights={heights}
            lightUp={lightUp}
          >
          </CreateRectangles>
          
        </div>
        {/* {JSON.stringify(heights)} */}


      </div>
          
    </MuiThemeProvider>
  );
}

export default App;
