function show_time(d, locality, hotel_name,link) {

  document.getElementById("hotel_name").innerHTML = hotel_name;
  document.getElementById("hotel_name").href = link; 
  
  document.getElementById("hotel_name").style.fontSize = "xx-large";

  hotel_name = hotel_name.replace(/\//g, "-");
  hotel_name = hotel_name.replace(/ /g, "_");

  console.log("the hotel for which this data is being displayed is " + hotel_name);
  console.log("The path to the file ./resources/data/theme_river/" + locality + "/" + hotel_name);

  var myPath = "./resources/data/theme_river/" + locality + "/" + hotel_name + ".csv";
  var datearray = [];
  var colorrange = [];
  d3version4.select(".time").remove()
  d3version4.selectAll(".remove").remove();

  chart(myPath, "orange");
  document.body.appendChild(document.getElementById('ThemeRiverDiv'));


  function chart(csvpath, color) {
    console.log("does it enter the chart function");

    if (color == "blue") {
      colorrange = ["#045A8D", "#2B8CBE", "#74A9CF", "#A6BDDB", "#D0D1E6", "#F1EEF6"];
    }
    else if (color == "pink") {
      colorrange = ["#980043", "#DD1C77", "#DF65B0", "#C994C7", "#D4B9DA", "#F1EEF6"];
    }
    else if (color == "orange") {
      colorrange = ["#008000", "#ad0906"]
    }
    strokecolor = colorrange[0];

    // var format = d3version4.time.format("%m/%d/%y");

    var margin = { top: 20, right: 40, bottom: 30, left: 30 };
    var width = document.body.clientWidth - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var tooltip = d3version4.select("#ThemeRiverDiv")
      .append("div")
      .attr("class", "remove")
      .style("position", "relative")
      .style("z-index", "40")
      .style("visibility", "hidden")
      .style("left", "50px");


    var x = d3version4.scaleTime()
      .range([0, width]);

    var y = d3version4.scaleLinear()
      .range([height - 10, 0]);

    var z = d3version4.scaleOrdinal()
      .range(colorrange);

    // var yAxisr = d3version4.svg.axis()
    //   .scale(y);

    // var stack = d3version4.layout.stack()
    //   .offset("silhouette")
    //   .values(function (d) { return d.values; })
    //   .x(function (d) { return d.date; })
    //   .y(function (d) { return d.value; });


    var svg = d3version4.select("#ThemeRiverDiv").append("svg")
      // .attr("height", height + margin.top + margin.bottom)
      // .attr("width", width + margin.left + margin.right)
      .attr("height", "100%")
      .attr("width", "100%")
      .attr("class", "time")
      .attr("id", "timeId")
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3version4.csv(csvpath, function (d) {

      var nested_data = d3version4.nest()
        .key(function (d) { return d.month; })
        .entries(d);

      var data = nested_data.map(function (d) {
        var array = d.key.split("/");
        var obj = {
          month: new Date(parseInt(array[2]), parseInt(array[0]) - 1, 1)
        }
        d.values.forEach(function (v) {
          obj[v.label] = v.count;

        })

        return obj;
      })

      console.log(data)


      var stack = d3version4.stack()
        .keys(["POS", "NEG"])
        .order(d3version4.stackOrderNone)
        .offset(d3version4.stackOffsetWiggle);

      var series = stack(data);


      x.domain(d3version4.extent(data, function (d) { return d.month; }))
      y.domain([0, d3version4.max(series, function (layer) { return d3version4.max(layer, function (d) { return d[0] + d[1]; }); })])


      var xAxis = d3version4.axisBottom(x);
      var yAxis = d3version4.axisLeft(y);

      var area = d3version4.area()
        .x(function (d) { return x(d.data.month); })
        .y0(function (d) { return y(d[0]); })
        .y1(function (d) { return y(d[1]); })
        .curve(d3version4.curveBasis);

      svg.selectAll(".layer")
        .data(series)
        .enter().append("path")
        .attr("d", area)
        .attr("class", "layer")
        .style("fill", function (d, i) { return z(i); });


      svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (height+200) + ")")
        .call(xAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + width + ", 200)")
        .call(yAxis);

      svg.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0, 200)")
        .call(yAxis);

      svg.selectAll(".layer")
        .attr("opacity", 1)
        .on("mouseover", function (d, i) {
          svg.selectAll(".layer").transition()
            .duration(250)
            .attr("opacity", function (d, j) {
              return j != i ? 0.6 : 1;
            })
        })

        .on("mousemove", function (d, i) {
          mousex = d3version4.mouse(this);
          mousex = mousex[0];
          console.log("mousex : "+ mousex)
          var invertedx = x.invert(mousex);
          console.log("invertedx : " + invertedx)
          console.log("invertedx.getMonth() : "+invertedx.getMonth())
          console.log("invertedx.getDate() : "+invertedx.getDate())
          console.log("invertedx.getYear() : "+invertedx.getYear())
          invertedx = invertedx.getMonth() + invertedx.getDate();
          console.log("invertedx.getMonth() + invertedx.getDate(): "+invertedx)
          var selected = (d.key);
          console.log("selected : "+ selected)
          for (var k = 0; k < selected.length; k++) {
            datearray[k] = selected[k].month
            console.log("datearray[k] : "+ datearray[k])
            datearray[k] = datearray[k].getMonth() + datearray[k].getDate();
            console.log("datearray[k] 1: "+ datearray[k])
          }

          mousedate = datearray.indexOf(invertedx);
          console.log("mousedate: "+mousedate)
          proVal = d.count[mousedate].count;
          console.log("proval : "+ proValP)

          d3version4.select(this)
            .classed("hover", true)
            .attr("stroke", strokecolor)
            .attr("stroke-width", "0.5px"),
            tooltip.html("<p>" + d.key + "<br>" + proVal + "</p>").style("visibility", "visible").style("left", margin.left).style("top", margin.top).style("position", "absolute");

        })
        .on("mouseout", function (d, i) {
          svg.selectAll(".layer")
            .transition()
            .duration(250)
            .attr("opacity", "1");
          d3version4.select(this)
            .classed("hover", false)
            .attr("stroke-width", "0px"), tooltip.html("<p>" + d.label + "<br>" + proVal + "</p>").style("visibility", "hidden").style("left", margin.left).style("top", margin.top).style("position", "absolute");
        })

      var vertical = d3version4.select("#ThemeRiverDiv")
        .append("div")
        .attr("class", "remove")
        .style("position", "relative")
        .style("z-index", "19")
        .style("width", "1px")
        .style("left", "0px")
        .style("background", "#fff");

      d3version4.select("#ThemeRiverDiv")
        .on("mousemove", function () {
          mousex = d3version4.mouse(this);
          mousex = mousex[0] + 5;
          vertical.style("left", mousex + "px")
        })
        .on("mouseover", function () {
          mousex = d3version4.mouse(this);
          mousex = mousex[0] + 5;
          vertical.style("left", mousex + "px")
        });
    });
  }
}
