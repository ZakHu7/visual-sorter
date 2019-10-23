// SelectionSort

export default function SelectionSort(arr, setSteps, setStepsCounter, setTotalSteps, setComparisons){
    //IT IS CRUCIAL TO MAKE A COPY HERE!!!
    //YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
    let copy = [...arr];

    //var stepsCounter = 0;
    var steps = [];
    var comparisons = 0;


    for(var i = 0; i < copy.length - 1;++i){
        var min = Number.MAX_SAFE_INTEGER;
        var loc = 0;
        for(var j = i; j < copy.length; ++j){
            ++comparisons;
            if(copy[j].height <= min){
                min = copy[j].height;
                loc = j;
            }
        }
        // ["instruction", index, toSplice]
        // "sp" stands for "splice"
        // add what is toSplice by splicing it into dataBottom
        steps.push(["s", i, loc]);
        var tmp = copy[i];
        copy[i] = copy[loc];
        copy[loc] = tmp;
    }
    // console.log(copy);
    setSteps(steps);
    setStepsCounter(steps.length);
    setTotalSteps(steps.length);
    setComparisons(comparisons);
}
