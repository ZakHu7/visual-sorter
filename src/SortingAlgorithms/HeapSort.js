// HeapSort
var len;
var steps;
var comparisons;

export default function HeapSort(arr, setSteps, setStepsCounter, setTotalSteps, setComparisons) {
	//IT IS CRUCIAL TO MAKE A COPY HERE!!!
	//YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
	let copy = [...arr];
    //var stepsCounter = 0;
    len = arr.length
    steps = [];
    comparisons = 0;

	heapSortH(copy);


	console.log(copy);
	setSteps(steps);
	setStepsCounter(steps.length);
    setTotalSteps(steps.length);
    setComparisons(comparisons);
}

function heapSortH(arr){
    for(var i = Math.floor(len / 2); i >= 0; --i) {
        ++comparisons;
        heapRoot(arr,i);
    }

    for(var i = arr.length - 1; i > 0; --i) {
        swap(arr, 0, i);
        steps.push(['s',0,i]);

        --len;
        ++comparisons;
        heapRoot(arr,0);

    }
}

function heapRoot(arr, i) {
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;

    if (left < len && arr[left].height > arr[max].height) {
        max = left;
    }

    if (right < len && arr[right].height > arr[max].height) {
        max = right;
    }

    if (max != i) {
        ++comparisons;
        swap(arr, i, max);
        steps.push(['s',i,max]);
        heapRoot(arr, max);
    }
}

function swap(arr, i, j) {
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}