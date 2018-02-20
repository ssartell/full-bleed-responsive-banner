var hilbert = require('./hilbert');
var d3 = require('d3');
var R = require('ramda');

var i = 0;
var min = 1;
var max = 6;
var timer = d3.interval(() => {
    var n = saw(i, [min, max]);
    update(hilbertLines(n, max));
    i++;
}, 1000);

function hilbertLines(i, max) {
    var n = Math.pow(2, i);
    var count = n * n;

    var points = R.range(0, count).map(x => hilbert.d2xy(n, x));

    var normalize = d3.scaleLinear()
        .domain(d3.extent(R.flatten(points)))
        .range([0, 1]);

    points = points.map(x => x.map(normalize));
    
    var maxN = Math.pow(2, max);
    var maxCount = maxN * maxN;
    points = R.chain(x => R.repeat(x, maxCount / count), points);

    var lines = pointsToLines(points);
    return lines;
}

function update(lines) {
    var svg = d3.select('svg');
    var width = +svg.attr('width');
    var height = +svg.attr('height');
    var strokeWidth = 8;
    var margin = strokeWidth / 2;

    var scale = d3.scaleLinear()
        .domain([0, 1])
        .range([margin, width - margin]);

    var line = d3.line()
        .x(d => scale(d[0]))
        .y(d => scale(d[1]));

    var rainbow = d3.scaleSequential()
        .domain([0, lines.length])
        .interpolator(d3.interpolateRainbow);

    var path = svg
        .selectAll('path')
        .data(lines);

    path.exit().remove();

    var allPaths = path.enter()
        .append('path')
        .attr('d', d => line(d))
        .merge(path);

    allPaths.attr('stroke', (d, i) => rainbow(i))
        .attr('fill', 'transparent')
        .attr('stroke-width', strokeWidth)
        .attr('stroke-linecap', 'square')
        .transition()
            .duration(1000)
            .attr('d', d => line(d));
}

var pointsToLines = R.converge(R.zip, [R.init, R.tail]);

function interpolate(p1, p2, n) {
    if (n <= 1) return [p1, p2];

    var points = [];
    for(var i = 0; i <= n; i++) {
        var di = i / n;
        points.push([
            p1[0] * (1 - di) + p2[0] * di,
            p1[1] * (1 - di) + p2[1] * di,
        ])
    }

    return points;
}

function saw(i, extent) {
    var min = extent[0];
    var max = extent[1];
    var range = max - min;
    return Math.abs(range - ((i + range) % (range * 2))) + min;
}