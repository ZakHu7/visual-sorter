// InsertionSort

export default function InsertionSort(arr, setSteps, setStepsCounter, setTotalSteps, setComparisons){
    //IT IS CRUCIAL TO MAKE A COPY HERE!!!
    //YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
    let copy = [...arr];

    //var stepsCounter = 0;
    var steps = [];
    var inserted = [];
    var comparisons = 0;

    for(var i = 0; i < copy.length;++i){
        for(var j = 0; j < inserted.length; ++j){
            ++comparisons;
            if(copy[i].height <= inserted[j].height){
                break;
            }
        }
        // ["instruction", index, toSplice]
        // "sp" stands for "splice"
        // add what is toSplice by splicing it into dataBottom
        steps.push(["sp", j, copy[i]]);
        inserted.splice(j,0,copy[i]);
    }
    // console.log(copy);
    setSteps(steps);
    setStepsCounter(steps.length);
    setTotalSteps(steps.length);
    setComparisons(comparisons);
}
