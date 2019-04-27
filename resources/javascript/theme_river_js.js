function show_time(d,locality,hotel_name)
{
   hotel_name = hotel_name.replace(/\//g, "-");
   hotel_name = hotel_name.replace(/ /g, "_");
  //
  // console.log("the hotel for which this data is being displayed is " + hotel_name);
  console.log("The path to the file ./resources/data/theme_river/"+locality+"/"+hotel_name);

  var myPath = "./resources/data/theme_river/"+locality+"/"+hotel_name+".csv";
  var datearray = [];
  var colorrange = [];
  d3version4.select(".tooltip").remove();
    d3version4.select(".time_series").remove();
  // d3version4.selectAll(".remove").remove();

  // document.body.appendChild(document.getElementById('chartId'));
  // document.body.appendChild(document.getElementById('timeId'));


 d3version4.csv(myPath, function(err, d){
   if(err) console.log(err);

   var nested_data = d3version4.nest()
 		.key(function(d) { return d.date; })
         .entries(d);

   var mqpdata = nested_data.map(function(d){
     var array = d.key.split("/");
     var obj = {
       date: new Date(parseInt(array[2]), parseInt(array[0])-1, 1)
     }

     d.values.forEach(function(v){
       obj[v.key] = v.value;

     })

     return obj;
   })
   console.log("Darshan ka Print");
   console.log(mqpdata)

   buildStreamGraph(mqpdata);

 })


 function buildStreamGraph(mqpdata) {
 var data = mqpdata;


 var stack = d3version4.stack()
     .keys(["POS", "NEG"])
     .order(d3version4.stackOrderNone)
     .offset(d3version4.stackOffsetWiggle);

 var series = stack(data);

 var width = 850,
     height = 500;

 var x = d3version4.scaleTime()
     .domain(d3version4.extent(data, function(d){ return d.date; }))
     .range([100, width]);
 //
 var xAxis = d3version4.axisBottom(x);

 var y = d3version4.scaleLinear()
     .domain([0, d3version4.max(series, function(layer) { return d3version4.max(layer, function(d){ return d[0] + d[1];}); })])
     .range([height/2, -200]);

   var yAxis = d3.svg.axis()
         .scale(y);
   var yAxisR = d3.svg.axis()
         .scale(y);


 var color = d3version4.scaleLinear()
     .range(["#51D0D7", "#31B5BB"]);

 var color = d3version4.scaleOrdinal(d3version4.schemeCategory20);

 var area = d3version4.area()
     .x(function(d) { /*console.info('in area function', d);*/ return x(d.data.date); })
     .y0(function(d) { return y(d[0]); })
     .y1(function(d) { return y(d[1]); })
     .curve(d3version4.curveBasis);

  //  var tooltip = d3version4.select("#ThemeRiverDiv").append("div")
 	// .attr("class", "tooltip");

 var svg = d3version4.select("#ThemeRiverDiv").append("svg")
 .attr("class","time_series")
     .attr("width", width)
     .attr("height", height);

 svg.selectAll("path")
     .data(series)
     .enter().append("path")
     .attr("d", area)
     .style("fill", function() { return color(Math.random()); })
     .on('mouseover', function(d){
       d3version4.select(this).style('fill',d3version4.rgb( d3version4.select(this).style("fill") ).brighter());
   		// d3version4.select("#ThemeRiverDiv").text(d.key);
   // tooltip.transition()
   //              .duration(700)
   //              .style("opacity", 1);
   // 			tooltip.html("Cantidad: " + "#familiares")
   //              .style("left", (d3version4.event.pageX + 5) + "px")
   //              .style("top", (d3version4.event.pageY - 28) + "px");
     })
     .on('mouseout', function(d){
       d3version4.select(this).style('fill',
          d3version4.rgb( d3version4.select(this).style("fill") ).darker());
          // d3version4.select("#ThemeRiverDiv").text("Mouse over");
   // tooltip.transition()
   //              .duration(500)
   //              .style("opacity", 0);
 })

 // var x = d3.time.scale()
 //     .range([0, width]);
 //
 // var y = d3.scale.linear()
 //     .range([height-10, 0]);
 // var xAxis = d3.svg.axis()
 //     .scale(x)
 //     .orient("bottom")
 //     .ticks(d3.time.months);
 //
 // var yAxis = d3.svg.axis()
 //     .scale(y);
 //
 // var yAxisr = d3.svg.axis()
 //     .scale(y);
 //
 // svg.append("g")
 //     .attr("class", "x axis")
 //     .attr("transform", "translate(0," + height + ")")
 //     .call(xAxis);
 //
 // svg.append("g")
 //     .attr("class", "y axis")
 //     .attr("transform", "translate(" + width + ", 0)")
 //     .call(yAxis.orient("right"));
 //
 // svg.append("g")
 //     .attr("class", "y axis")
 //     .call(yAxis.orient("left"));


   var xAxisGroup = svg.append("g").call(xAxis);
 }

}
