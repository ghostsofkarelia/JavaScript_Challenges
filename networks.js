//Output div where the output is appended
var $outputDiv;

//Output error label
var errorLabel = 'NO SUCH ROUTE';

//Container for the output
var $outputContainer = $('#outputContainer');

/**
This function creates a graph using the JSNetworkX API. It creates a Multi Directed Graph and add nodes to it using their simple names. It also adds edges with their weights
@author: Akshay Singh
@return: {graph} graph Graph object with the nodes and edges
**/
var createGraph = function () {
    var graph = new jsnx.MultiDiGraph();
    graph.addEdge('A', 'B', {
        weight: 5
    });
    graph.addEdge('B', 'C', {
        weight: 4
    });
    graph.addEdge('C', 'D', {
        weight: 8
    });
    graph.addEdge('D', 'C', {
        weight: 8
    });
    graph.addEdge('D', 'E', {
        weight: 6
    });
    graph.addEdge('E', 'B', {
        weight: 3
    });
    graph.addEdge('C', 'E', {
        weight: 2
    });
    graph.addEdge('A', 'E', {
        weight: 7
    });
    graph.addEdge('A', 'D', {
        weight: 5
    });
    return graph;
}

/**
This function calculates the distance of the route ABC by adding weights of the respective edges: AB and BC
@author: Akshay Singh
@param: {graph} graph Graph object representing the graph
@return: {number} Distance of the route ABC
**/
var calculateDistABC = function (graph) {
    var distanceAB = graph.getEdgeData('A', 'B');
    var distanceBC = graph.getEdgeData('B', 'C');
    if (distanceAB && distanceBC) {
        return distanceAB[0]['weight'] + distanceBC[0]['weight'];
    } else return errorLabel;
}

/**
This function calculates the distance of the route AD by adding weights of the respective edges: AD
@author: Akshay Singh
@param: {graph} graph Graph object representing the graph
@return: {number} Distance of the route AD
**/
var calculateDistAD = function (graph) {
    var distanceAD = graph.getEdgeData('A', 'D');
    if (distanceAD) {
        return distanceAD[0]['weight'];
    } else return errorLabel;
}

/**
This function calculates the distance of the route ADC by adding weights of the respective edges: AD and DC
@author: Akshay Singh
@param: {graph} graph Graph object representing the graph
@return: {number} Distance of the route ADC
**/
var calculateDistADC = function (graph) {
    var distanceAD = graph.getEdgeData('A', 'D')
    var distanceDC = graph.getEdgeData('D', 'C');
    if (distanceAD && distanceDC) {
        return distanceAD[0]['weight'] 
            + distanceDC[0]['weight'];
    } else return errorLabel;
}

/**
This function calculates the distance of the route AEBCD by adding weights of the respective edges: AE,EB,BC and CD
@author: Akshay Singh
@param: {graph} graph Graph object representing the graph
@return: {number} Distance of the route AEBCD
**/
var calculateDistAEBCD = function (graph) {
    var distanceAE = graph.getEdgeData('A', 'E');
    var distanceEB = graph.getEdgeData('E', 'B');
    var distanceBC = graph.getEdgeData('B', 'C');
    var distanceCD = graph.getEdgeData('C', 'D');
    if (distanceAE && distanceEB && distanceBC && distanceCD) {
        return distanceAE[0]['weight'] 
            + distanceEB[0]['weight'] 
            + distanceBC[0]['weight'] 
            + distanceCD[0]['weight'];
    } else return errorLabel;
};

/**
This function calculates the distance of the route AED by adding weights of the respective edges: AE and ED
@author: Akshay Singh
@param: {graph} graph Graph object representing the graph
@return: {number} Distance of the route AED
**/
var calculateDistAED = function (graph) {
    var distanceAE = graph.getEdgeData('A', 'E');
    var distanceED = graph.getEdgeData('E', 'D');
    console.log(distanceAE);
    console.log(distanceED);
    if (distanceAE && distanceED) {
        return distanceAE[0]['weight'] 
            + distanceED[0]['weight'];
    } else return errorLabel;
};

/**
This function creates the output by appending a div with output label to the output container.
@author: Akshay Singh
@params: {string or number} label Output to be placed within label tags
**/
var createOutput = function (label) {
    $outputDiv = $('<div><label>' + label + '</label></div>');
    $outputContainer.append($outputDiv);
}

$(document).ready(function () {
    //Call to create the graph with nodes
    var graph = createGraph();
    var distanceABC = calculateDistABC(graph);
    createOutput(distanceABC);
    var distanceAD = calculateDistAD(graph);
    createOutput(distanceAD);
    var distanceADC = calculateDistADC(graph);
    createOutput(distanceADC);
    var distanceAEBCD = calculateDistAEBCD(graph);
    createOutput(distanceAEBCD);
    var distanceAED = calculateDistAED(graph);
    createOutput(distanceAED);
});