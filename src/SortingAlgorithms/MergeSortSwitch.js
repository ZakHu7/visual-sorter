// MergeSort

export default function MergeSortSwitch(arr, setSteps, setStepsCounter, setTotalSteps){
    //IT IS CRUCIAL TO MAKE A COPY HERE!!!
    //YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
    let copy = [...arr];
    //var stepsCounter = 0;
    var steps = [];

    mergeSortDivide(copy, 0, copy.length-1, steps);


    //console.log(copy);
    setSteps(steps);
    setStepsCounter(steps.length);
    setTotalSteps(steps.length);
}

function mergeSortDivide(arr, l, r, steps){
    if(l < r){
        var m = Math.floor((l+r) / 2);
        mergeSortDivide(arr, l, m, steps);
        mergeSortDivide(arr, m + 1, r, steps);

        mergeSortConquer(arr, l, m, r, steps);
    }
}

function mergeSortConquer(arr, start, mid, end, steps){
    var start2 = mid + 1;

    if(arr[mid].height <= arr[start2].height){
        return;
    }

    while(start <= mid && start2 <= end) {
        if(arr[start].height <= arr[start2].height){
            ++start;
        } else {
            var value = arr[start2];
            var index = start2;
            while(index != start) {
                arr[index] = arr[index - 1];
                steps.push(['s',index,index - 1]);
                --index;
            }
            arr[start] = value;

            ++start;
            ++mid;
            ++start2;
        }
    }
}