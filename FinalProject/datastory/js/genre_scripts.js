
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody().strength(-2000))
    .force("center", d3.forceCenter(width / 2 - 120, height / 2 - 20));


d3.json("data/genre_graph.json", function(error, graph) {
  if (error) throw error;

  graph.links.forEach(function(d){
    d.source = d.source_id;
    d.target = d.target_id;
  });

  var link = svg.append("g")
                .style("stroke", "#aaa")
                .selectAll("line")
                .data(graph.links)
                .enter().append("line");

  var node = svg.append("g")
            .attr("class", "nodes")
  .selectAll("circle")
            .data(graph.nodes)
  .enter().append("circle")
          .attr("r", 6)
          .call(d3.drag()
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

  var label = svg.append("g")
      .attr("class", "labels")
      .selectAll("text")
      .data(graph.nodes)
      .enter().append("text")
        .attr("class", "label")
        .text(function(d) { return d.genre; });

  simulation.nodes(graph.nodes).on("tick", ticked);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; })
        .attr("source", function(d) {return d.source; })
        .attr("target", function(d) {return d.target; })
        .attr("stroke-width", function(d) { return d.stroke_width; })
        .style("opacity", .5)
        .attr("class", function(d) { return "genre"+d.source.id + " genre" + d.target.id; })
        .on("mouseover", function(){this.style.opacity=1;})
        .on("mouseout", function(){this.style.opacity=.5;})
        .on("click", function(d) { clickOnGenreLink(this, d); });

    node
         .attr("r", function(d) { return d.radius*2; })
         .style("fill", function(d){return d.color;} )
         .style("stroke", "#969696")
         .style("stroke-width", "1px")
         .on("mouseover", function(d) {this.style.cursor='pointer';})
         .on("mouseout", function(d) {this.style.cursor='cursor';})
         .on("click", function(d) { clickOnGenreNode(d); })
         .attr("cx", function (d) { return d.x+6; })
         .attr("cy", function(d) { return d.y-6; });

    label
        .attr("x", function(d) { return d.x - d.genre.length*1.5; })
            .attr("y", function (d) { return d.y; })
            .style("font-size", "10px").style("fill", "black");
  }
  simulation.force("link").links(graph.links);
});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart()
  //simulation.fix(d);
}


var delay = ( function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();
prev_node = null;
prev_link = null;
prev_link_d = null;
last = "";

function clickOnGenreLink(d, a){
  resetNodeColour();
  document.getElementById('genre_title').innerHTML = a.source.genre + " VS " + a.target.genre;
  d.style.stroke = "black";
  prev_link = a;
  prev_link_d = d;
  last = "link";

  $('#genre_distri_p').hide();
  $('#genre_hottness_p').hide();
  $('#genre_distri').hide();
  $('#genre_hottness').hide();
  $('#genre_distri_cmp').show();
  $('#genre_hottness_cmp').show();

  drawGraphLinks(document.getElementById("genre_other_opt").value, "genre_other", a);

  d3.json("data/genre_analysis/counts.json", function(error, genre_info) {
    if (error) throw error;
    var data = {};
    info_target = genre_info[a.target.genre];
    info_source = genre_info[a.source.genre];
    data.labels = info_target.years;
    data.series = [info_target.count, info_source.count];
    data.name = [a.target.genre, a.source.genre];
    drawGraph(data, 'genre_distri_cmp');
  });

  drawGraphLinks("hottness", 'genre_hottness_cmp', a);

}
function drawGraph(data, div_id){
  if (data.name != null){
    plugins = [ Chartist.plugins.legend({ legendNames: data.name }) , Chartist.plugins.ctAxisTitle({
  axisX: {
    axisTitle: data.xlabel,
    axisClass: 'ct-axis-title',
    offset: {
      x: 0,
      y: 25
    },
    textAnchor: 'middle'
  },
  axisY: {
    axisTitle: data.ylabel,
    axisClass: 'ct-axis-title',
    offset: {
      x: 0,
      y: 0
    },
    textAnchor: 'middle',
    flipTitle: false
  }
})];
  }
  else {
    plugins = [Chartist.plugins.ctAxisTitle({
  axisX: {
    axisTitle: data.xlabel,
    axisClass: 'ct-axis-title',
    offset: {
      x: 0,
      y: 25
    },
    textAnchor: 'middle'
  },
  axisY: {
    axisTitle: data.ylabel,
    axisClass: 'ct-axis-title',
    offset: {
      x: 0,
      y: 0
    },
    textAnchor: 'middle',
    flipTitle: false
  }
})];
  }

  // We are setting a few options for our chart and override the defaults
  var options = {
    // Don't draw the line chart points
    //showPoint: true,
    // Disable line smoothing
    lineSmooth: false,
    fullWidth: false,
    // X-Axis specific configuration
    axisX: {
      // Lets offset the chart a bit from the labels
      offset: 30,
      // The label interpolation function enables you to modify the values
      // used for the labels on each axis. Here we are converting the
      // values into million pound.
      labelInterpolationFnc: function(value) {
        if ((value % 5) == 0)
          return value;
        return '';
      }
    },
    // Y-Axis specific configuration
    axisY: {
      // Lets offset the chart a bit from the labels
      offset: 30,
      // The label interpolation function enables you to modify the values
      // used for the labels on each axis. Here we are converting the
      // values into million pound.
      labelInterpolationFnc: function(value) {
        return value;
      }
    },
    plugins: plugins
  };
  new Chartist.Line('#'+div_id, data, options);
}


function drawGenreOtherGraph(type){
  if(last === "node"){
    drawGraphNodes(type, "genre_other", prev_node);
  }
  else
    drawGraphLinks(type, "genre_other", prev_link);
}

function resetNodeColour(d){
  $("#genre_primary_all").hide();
  $("#genre_primary_container").show();
  if(prev_node != null){
    var links = document.getElementsByClassName('genre' + prev_node.id);
    for(i=0; i < links.length; i++) {
      links[i].style.stroke = "#aaa";
    }
    if(d != null){
      step = 200;
      xt = d.x;
      yt = d.y;
      i = 0;
      moveNode(i, step, prev_node.x, prev_node.y, d.x, d.y, prev_node);
    }
  }
  if(last == "link")
    prev_link_d.style.stroke = "#aaa";
}

function clickOnGenreNode(d){
  resetNodeColour(d);
  prev_node = d;
  last = "node";
  var links = document.getElementsByClassName('genre' + d.id);
  for(i=0; i < links.length; i++) {
    links[i].style.stroke = d.color;
  }
  document.getElementById('genre_title').innerHTML = d.genre;
  document.getElementById('genre_primary_container').style.backgroundColor = d.color;
  var oldBGColor = $('#genre_primary_container').css('backgroundColor');
  var newBGColor = oldBGColor.replace('rgb','rgba').replace(')', ','+.5+')');
  $('#genre_primary_container').css('backgroundColor', newBGColor);

  $('#genre_distri_p').show();
  $('#genre_hottness_p').show();
  $('#genre_distri').show();
  $('#genre_hottness').show();
  $('#genre_distri_cmp').hide();
  $('#genre_hottness_cmp').hide();

  drawGraphNodes(document.getElementById("genre_other_opt").value, "genre_other", d);

  d3.json("data/genre_analysis/counts.json", function(error, genre_info) {
    if (error) throw error;
    var data = {};
    info_target = genre_info[d.genre];
    data.labels = info_target.years;
    data.series = [info_target.count];
    data.xlabel = "Release Year";
    data.ylabel = "Number of Songs";
    drawGraph(data, 'genre_distri');
  });

  d3.json("data/" + d.genre + "_analysis.json", function(error, genre_info) {
    if (error) throw error;
    document.getElementById('genre_distri_p').innerHTML = genre_info.distri;
    document.getElementById('genre_hottness_p').innerHTML = genre_info.Hottness;
  });

  drawGraphNodes("hottness", "genre_hottness", d);

  step = 200;
  x_init = d.x;
  y_init = d.y;
  i = 0;
  simulation.force("center", null);
  moveNode(i, step, x_init, y_init, width/2 - 120, height / 2 - 20, d);
}

function drawGraphNodes(type, position, d){
  d3.json("data/genre_analysis/" + type + ".json", function(error, genre_info) {
    if (error) throw error;
    var data = {};
    info_target = genre_info[d.genre];
    avg = genre_info.avg;
    data.labels = info_target.years;
    data.series = [info_target[type], info_target.predict, avg[type], avg.predict];
    data.name = ['Data', 'Prediction', 'Average data', 'Average prediction'];
    data.xlabel = "Release Year";
    data.ylabel = type;
    drawGraph(data, position);
  });
}

function drawGraphLinks(type, position, a){
  d3.json("data/genre_analysis/" + type + ".json", function(error, genre_info) {
    if (error) throw error;
    var data = {};
    info_target = genre_info[a.target.genre];
    info_source = genre_info[a.source.genre];
    avg = genre_info["avg"];
    data.labels = info_target.years;
    data.series = [info_target[type], info_source[type], info_target.predict, info_source.predict, avg[type], avg.predict];
    data.name = [a.target.genre + " data ", a.source.genre + " data", a.target.genre + " prediction ", a.source.genre + " prediction", 'Average data', 'Average prediction'];
    data.xlabel = "Release Year";
    data.ylabel = type;
    drawGraph(data, position);
  });
}

function moveNode (i, step, x0, y0, xt, yt, d) {           //  create a loop function
   setTimeout(function () {    //  call a 3s setTimeout when the loop is called
       d.fx = x0 + i*(xt - x0)/step;
       d.fy = y0 + i*(yt - y0)/step;         //  your code here
      i++;                     //  increment the counter
      if (i <= step) {            //  if the counter < 10, call the loop function
         moveNode(i, step, x0, y0, xt, yt, d);             //  ..  again which will trigger another
         simulation.alphaTarget(0.1);
      }
      else {
        d.fx = null;
        d.fy = null;
        simulation.alphaTarget(0);
      }            //  ..  setTimeout()
   }, 1)
}

function dragged(d) {
  //simulation.fix(d, d3.event.x, d3.event.y);
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  simulation.restart();
}
