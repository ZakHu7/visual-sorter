// BubbleSort

export default function BubbleSort(arr, setSteps, setStepsCounter, setTotalSteps){
    //IT IS CRUCIAL TO MAKE A COPY HERE!!!
    //YOU CANNOT MANIPULATE THE ORIGINAL ARRAY!!!
    let copy = [...arr];

    //var stepsCounter = 0;
    var steps = [];

    for(var j = 0; j < copy.length - 1;++j){
        for(var i = 0; i < copy.length-1-j; ++i){
            if(copy[i] > copy[i+1]){
                var tmp = copy[i];
                copy[i] = copy[i+1];
                copy[i+1] = tmp;
                
                //++stepsCounter;
                steps.push(['s',i,i+1]);

            }
        }
    }
    //console.log(copy);
    setSteps(steps);
    setStepsCounter(steps.length);
    setTotalSteps(steps.length);
}
