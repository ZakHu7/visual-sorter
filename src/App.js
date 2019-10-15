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
import MergeSortPut from './MergeSortPut.js';
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

function getData(rectNum, maxRectHeight) {
	var res = [];
	for (var i = 0; i < rectNum; ++i) {
		res.push(1 + Math.round(Math.random() * maxRectHeight));
	}
	//console.log(res);
	return res;
}


// Goal: To create a visual realization of sorting algorithms.
// Create rectangles as data points.
// 1. Line up rectangles at the bottom
// 2. The heights of rectangles is based on their data
// 3. Using whatever sorting algorithm, show step by step how the data transforms

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
	var maxData = 200;
	const [maxWidth, setMaxWidth] = React.useState(window.innerWidth * 0.7);


	// filters
	const [sortType, setSortType] = React.useState("MergeSort(Put)");
	const [rectNum, setRectNum] = React.useState(10);
	const [speed, setSpeed] = React.useState(100);

	// data tracking
	const [data, setData] = React.useState(getData(rectNum, maxData));
	const [dataBottom, setDataBottom] = React.useState(new Array(rectNum).fill(0));
	const [steps, setSteps] = React.useState([]);
	const [totalSteps, setTotalSteps] = React.useState(0);
	const [stepsCounter, setStepsCounter] = React.useState(0);
	const [lightUp, setLightUp] = React.useState([]);
	const [lightUpBottom, setLightUpBottom] = React.useState([]);
	const [sorting, setSorting] = React.useState(false);


	function updateWidth() {
		setMaxWidth(window.innerWidth * 0.7);
	}

	function reset(){
		setSorting(false);
		setDataBottom(new Array(rectNum).fill(0));
		setLightUp([]);
		setLightUpBottom([]);
	}

	function timer() {
		// console.log(steps);
		// console.log(totalSteps);
		// console.log(stepsCounter);

		let index = totalSteps - stepsCounter;
		let instruction = steps[index][0];
		let copyData = [...data]
		let copyDataBottom = [...dataBottom]

		if (instruction == 's') {
			// Switch:
			// ["instruction", index1, index2]
			// Switch what is at index1 with index2
			let a = steps[index][1];
			let b = steps[index][2];

			let tmp = copyData[a];
			copyData[a] = copyData[b];
			copyData[b] = tmp;

			setLightUp([a, b]);
		} else if (instruction == 'p') {
			// Put:
			// ["instruction", index, toPut]
			// Put what is toPut at index, replacing old element
			let location = steps[index][1];
			let toPut = steps[index][2];

			copyData[location] = toPut;

			setLightUp([location]);
		} else if (instruction == 'p2') {
			// Put Bottom:
			// ["instruction", index, toPut]
			// Put what is toPut at second graph's index, replacing old element
			let location = steps[index][1];
			let toPut = steps[index][2];

			copyDataBottom[location] = toPut;
			setLightUpBottom([location]);
		} else if (instruction == 'pa') {
			// Put Array:
			// ["instruction", index, toPut[]]
			// Put what is toPut[] at index, replacing old elements
			let location = steps[index][1];
			let toPut = steps[index][2];

			copyData = [
				...copyData.slice(0,location),
				...toPut,
				...copyData.slice(location + toPut.length)
			];
			
			// generate an array from starting location with length identical to toPut
			let toLightUp = Array(toPut.length).fill(location).map((x, y) => x + y);
			setLightUp(toLightUp);
		} else if (instruction == 'pa2') {
			// Put Bottom Array:
			// ["instruction", index, toPut[]]
			// Put what is toPut[] at second graph's index, replacing old elements
			let location = steps[index][1];
			let toPut = steps[index][2];

			copyDataBottom = [
				...copyDataBottom.slice(0,location),
				...toPut,
				...copyDataBottom.slice(location + toPut.length)
			];
			
			let toLightUp = Array(toPut.length).fill(location).map((x, y) => x + y);
			setLightUpBottom(toLightUp);
		}


		setData(copyData);
		setDataBottom(copyDataBottom);
		setStepsCounter(stepsCounter - 1);
	};

	useEffect(() => {
		if (stepsCounter <= 0 || !sorting) {
			return;
		}

		const id = setInterval(timer, speed);
		return () => clearInterval(id);
	},
		[stepsCounter, sorting]
	);

	useEffect(() => {
		setData(getData(rectNum, maxData));
	},
		[rectNum]
	);

	function Sort(heights, setSteps, setStepsCounter, setTotalSteps) {
		setSorting(true);
		if (sortType == "BubbleSort") {
			BubbleSort(heights, setSteps, setStepsCounter, setTotalSteps);
		} else if (sortType == "MergeSort(Switch)") {
			MergeSortSwitch(heights, setSteps, setStepsCounter, setTotalSteps);
		} else if (sortType == "MergeSort(Put)") {
			MergeSortPut(heights, setSteps, setStepsCounter, setTotalSteps);
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
						onClick={() => { reset(); setData(getData(rectNum, maxData)); }}
					>
						Randomize
          </Button>
					<SingleSelect
						title={"Type of Sort"}
						items={["BubbleSort", "MergeSort(Switch)", "MergeSort(Put)", "HeapSort"]}
						value={sortType}
						onChange={(sortType) => { reset(); setSortType(sortType); }}
					/>
					<SingleSelect
						title={"Data Points"}
						items={[10, 25, 50, 100]}
						value={rectNum}
						onChange={(rectNum) => { reset(); setRectNum(rectNum); }}
					/>
					<SingleSelect
						title={"Speed(ms)"}
						items={[1, 50, 100, 500]}
						value={speed}
						onChange={(speed) => { reset(); setSpeed(speed); }}
					/>
					<Button
						className={classes.button}
						variant="contained"
						onClick={() => Sort(data, setSteps, setStepsCounter, setTotalSteps)}
					>
						Sort
          </Button>
				</div>
				<div className="App-main">
					{/* <Clock></Clock> */}
					<CreateRectangles
						rectNum={rectNum}
						maxWidth={maxWidth}
						heights={data}
						lightUp={lightUp}
					>
					</CreateRectangles>

				</div>

				<div className="App-main">
					{/* <Clock></Clock> */}
					<CreateRectangles
						rectNum={rectNum}
						maxWidth={maxWidth}
						heights={dataBottom}
						lightUp={lightUpBottom}
					>
					</CreateRectangles>

				</div>
				{/* {JSON.stringify(heights)} */}


			</div>

		</MuiThemeProvider>
	);
}

export default App;
