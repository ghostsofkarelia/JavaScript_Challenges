//This file uses jQuery $(document).ready() function. Include jQuery 1.7.2 if running this file and the output is printed on the console since HTML and CSS files are not required

/**
This function flattens an input array consisting of individual elements as well as elements like array of strings and array of arrays. It uses a series of conditions to identify array inside elements and add them to the main array in a sequential manner
@author: Akshay Singh
@params: {array} array Array consisting of different weird kinda elements
@returns: {array} emptyArray Flattened out array
**/
var flatten = function (array) {
    //Empty array that'll hold the flattened elements
    var emptyArray = [];
    //Iterate over all elements of the main array
    for (var key1 in array) {
        //Check if element is an array
        if (Array.isArray(array[key1])) {
            var firstInnerArray = array[key1];
            //If child is an array, iterate over it's children
            for (var key2 in firstInnerArray) {
                //Check if children are arrays
                if (Array.isArray(firstInnerArray[key2])) {
                    //Iterate over elements
                    var secondInnerArray = firstInnerArray[key2];
                    for (var key3 in secondInnerArray) {
                        //Push into empty array
                        emptyArray.push(secondInnerArray[key3]);
                    }
                }
                //Push into empty array if single elements
                else emptyArray.push(firstInnerArray[key2]);
            }
        } else {
            //Push into empty array if single elements
            emptyArray.push(array[key1]);
        }
    }
    return emptyArray;
}

/**
This function is used to call the flatten function and display the output on the console
@author: Akshay Singh
**/
var letsDoThis = function () {
    //Input array which is unflattened
    var array = ['c', 'd', 'e', [1, 2, 3, 4],
        ['f', 'g', 'h'],
        [
            [1, 2],
            [2, 3],
            [3, 4]
        ]
    ];

    //Output the unflattened array
    console.log("Unflattened Array: ");
    for (var key in array) {
        console.log("Element[" + key + "] is " + array[key]);
    }

    var flattenedArray = flatten(array);

    //Output the flattened array
    console.log("Flattened Array: ");
    for (var key in flattenedArray) {
        console.log("Element[" + key + "] is " + flattenedArray[key]);
    }
};


$(document).ready(function () {
    //Call the boss function
    letsDoThis();
});