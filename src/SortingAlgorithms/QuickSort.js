// QuickSort

export default function QuickSort(arr, setSteps, setStepsCounter, setTotalSteps, setComparisons) {
	//IT IS CRUCIAL TO MAKE A COPY HERE!!!
	//YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
	let copy = [...arr];
	//var stepsCounter = 0;
    var steps = [];
    var comparisons = [0];

	quickSortR(copy, 0, copy.length - 1, steps, comparisons);


	//console.log(steps);
	setSteps(steps);
	setStepsCounter(steps.length);
    setTotalSteps(steps.length);
    setComparisons(comparisons[0]);
}

function quickSortR(arr, start, end, steps, comparisons){
    if (start < end){
        var pi = partition(arr, start, end, steps, comparisons);

        quickSortR(arr, start, pi - 1, steps, comparisons);
        quickSortR(arr, pi + 1, end, steps, comparisons);
    }
}

function partition(arr, start, end, steps, comparisons){
    // Take a value to pivot around
    var firstVal = arr[start].height;
    var lastVal = arr[end].height;
    var med = Math.floor((start + end) / 2);
    var middleVal = arr[med].height;

    var pivot = median(firstVal, lastVal, middleVal);
    var loc = (pivot == firstVal) ? start : (pivot == lastVal) ? end : med;
    steps.push(['s', loc, end]);
    var tmpRect = arr[loc]
    arr[loc] = arr[end];
    arr[end] = tmpRect;

    // Only pivot the last element
    // var pivot = arr[end].height;
    // var tmpRect = arr[end];

    var i = start;

    for (var j = start; j < end; ++j) {
        // console.log([arr[j].height, pivot, i , j]);
        ++comparisons[0];
        if (arr[j].height < pivot) {
            if (i != j) {
                steps.push(['s', i, j]);
                let tmp = arr[j];
                arr[j] = arr[i];
                arr[i] = tmp;
            }
            ++i;
        }
    }

    steps.push(['s', i, end]);
    arr[end] = arr[i];
    arr[i] = tmpRect;
    return i;

}

// Find the median of three values
function median(a, b, c){
    return (a+b+c) - Math.max(a,b,c) - Math.min(a,b,c);
}