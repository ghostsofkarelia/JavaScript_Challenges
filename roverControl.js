/**
This function controls the rover's position and heading based on current heading and movement in left and right space.
@author: Akshay Singh
@param: {javascript object} controlSet An object with right upper bound, position and desired control steps for the rover
**/
var controlRover = function (controlSet) {
    //Getting the x and y coordinates with position key and index
    var xCurrentPosition = controlSet['position'][0];
    var yCurrentPosition = controlSet['position'][1];

    //Getting the heading with position key and index
    var heading = controlSet['position'][2];
    $.each(controlSet['instructions'], function () {
        //After instruction L need to check current heading to get the new heading for each of the directions
        if (this[0] == 'L') {
            if (heading == 'N') {
                heading = 'E';
            } else if (heading == 'E') {
                heading = 'S';
            } else if (heading == 'S') {
                heading = 'W';
            } else {
                heading = 'N';
            }
        }

        //After instruction R need to check current heading to get the new heading for each of the directions
        else if (this[0] == 'R') {
            if (heading == 'N') {
                heading = 'W';
            } else if (heading == 'E') {
                heading = 'N';
            } else if (heading == 'S') {
                heading = 'E';
            } else {
                heading = 'S';
            }
        }
        //If the intruction is M then based on heading decide whether to increase or decrease x and y coordinates by one (based on the cartesian system)
        else {
            if (heading == 'N') {
                yCurrentPosition++;
            } else if (heading == 'E') {
                xCurrentPosition--;
            } else if (heading == 'S') {
                yCurrentPosition--;
            } else if (heading == 'W') {
                xCurrentPosition++;
            }
        }
    });

    //Call to build output after we have our final coordinates and heading
    buildOutput(xCurrentPosition, yCurrentPosition, heading);
};

/**
This function is used to build the output in the form of div and label elements within a container.
@author: Akshay Singh
@param: {integer,integer,string} xCurrentPosition,yCurrentPosition,heading
**/
var buildOutput = function (xCurrentPosition, yCurrentPosition, heading) {
    //Get parent div element
    var $outputContainer = $('#outputContainer');
    var $outputDiv;
    $outputDiv = $('<div><label>' + xCurrentPosition + ' ' + yCurrentPosition + ' ' + heading + '</label></div>');
    $outputContainer.append($outputDiv);
}

$(document).ready(function () {
    //JavaScript object with upper right bound, position and instructions
    var controlSet1 = {
        "upperRightBound": [5, 5],
            "position": [1, 2, 'N'],
            "instructions": ['L', 'M', 'L', 'M'
                             , 'L', 'M', 'L', 'M', 'M']
    };

    var controlSet2 = {
        "upperRightBound": [5, 5],
            "position": [3, 3, 'E'],
            "instructions": ['M', 'M', 'R', 'M'
                             , 'M', 'R', 'M', 'R', 'R', 'M']
    };
    controlRover(controlSet1);
    controlRover(controlSet2);

});