// MergeSort

export default function MergeSortPut(arr, setSteps, setStepsCounter, setTotalSteps, setComparisons) {
	//IT IS CRUCIAL TO MAKE A COPY HERE!!!
	//YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
	let copy = [...arr];
	//var stepsCounter = 0;
	var steps = [];
	var comparisons = [0];


	mergeSort(copy, 0, steps, comparisons);


	//console.log(steps);
	setSteps(steps);
	setStepsCounter(steps.length);
	setTotalSteps(steps.length);
	setComparisons(comparisons[0]);
}

function merge(left, right, location, steps, comparisons) {
	var res = [];
	var i = 0, j = 0;

	while (true) {
		++comparisons[0];
		if (i >= left.length) {
			// ["instruction", index, toPut]
			// "pa2" stands for "put array 2"
			// put the array toPut at index,
			// overwriting what is there without increasing original array length
			steps.push(["pa", res.length + location, right.slice(j)]);
			res.push(...right.slice(j));
			break;
		} else if (j >= right.length) {
			steps.push(["pa", res.length + location, left.slice(i)]);
			res.push(...left.slice(i));
			break;
		}

		if (left[i].height < right[j].height) {
			// ["instruction", index, toPut]
			// "p2" stands for "put 2"
			// put what is at toPut at the index of heightsBottom 
			steps.push(["p", res.length + location, left[i]]);
			res.push(left[i]);
			++i;
		} else {
			steps.push(["p", res.length + location, right[j]]);
			res.push(right[j]);
			++j;
		}

	}
	// put the whole sorted array into the original data
	// steps.push(["pa", location, res]);
	return res;
}

//range is [start,end)
function mergeSort(arr, location, steps, comparisons) {
	//console.log({ arr });
	if (arr.length == 1 || arr.length == 0) {
		return arr;
	}

	var mid = Math.floor((0 + arr.length) / 2);
	var left = mergeSort(arr.slice(0, mid), location, steps, comparisons);
	var right = mergeSort(arr.slice(mid, arr.length), location+mid, steps, comparisons);

	return merge(left, right, location, steps, comparisons);
}