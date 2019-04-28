function stacked_bar(d, input_locality, hotels, factor, rating) {
    d3.select(".stacked_bar").remove();
    document.getElementById("hotel_name").innerHTML = "";
    var margin = {
        top: 30,
        right: 10,
        bottom: 10,
        left: 10
    },
        width = 500 - margin.left - margin.right;

        // height = 500 - margin.top - margin.bottom;
        if(hotels.length == 0 )
        {
           height = 500 - margin.top - margin.bottom;
        }
        else {
          height = Math.min(500,50*hotels.length);
        }

        if(hotels.length>10)
        {
          hotels = hotels.slice(0,10);
        }
    var x = d3.scale.linear()
        .range([0, width])

    var y = d3.scale.ordinal()
        .rangeRoundBands([0, height], .2);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("top");

    d3.json("./resources/data/bar_chart_data_updated.json", function (data) {

        data = data.filter(function (obj, index) {
            console.log("The value of rating in this case is");
            console.log(rating);

            if (rating == undefined || rating == null)
            {
              console.log("does it come here?")
                return obj.locality == input_locality;

              }
            else
            {
              console.log("or here?")
                return obj.locality == input_locality && obj.class == rating;
              }
        });
        console.log("this is the data");
        console.log(data);
        if(data.length < 10 )
        {
          height = Math.min(500,50*data.length);
        }
        if (data == undefined || data.length == 0) {

            window.alert("No " + rating + " star hotels in this locality");
            console.log("does it come here?");
            return;
        }
        var filteredArray = data.filter(function (itm) {
            return hotels.indexOf(itm.name) > -1;
        });


        if (hotels == undefined || hotels.length == 0) {

            data = data;
        }
        else {
            // filteredArray = { filteredArray };
            console.log("filtered array");
            console.log(filteredArray);

            console.log("inka data");
            console.log(data);

            data = filteredArray;

        }
        console.log("data before sort");
        console.log(data);
        console.log("height");
        console.log(height);
        data.sort(function (a, b) {
            // console.log("We are sorting by the factor");
            // console.log(factor);
            return b[factor] - a[factor];
        });

        data = data.slice(0, 10)

        console.log("data before plus");
        console.log(data);

        // data["positive"] = +data["positive"];
        // data["negative"] = +data["negative"];

        console.log(data)
        var svg = d3.select("#BarChartDiv").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("class", "stacked_bar")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain([-1.1 * d3.max(data, function (d) { return d.negative }), 1.1 * d3.max(data, function (d) { return d.positive })])
        y.domain(data.map(function (d) {
            return d.name;
        }));


        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(Math.min(0, d.positive));
            })
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("width", function (d) {
                return Math.abs(x(d.positive) - x(0));
            })
            .attr("height", y.rangeBand())
            .on("click", function (d, i) {
                console.log("I just clicked the bar");
                console.log(d);
                show_time(d, d.locality, d.name,d.link)
            })

        svg.selectAll(".text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .attr("x", function (d) {
                return x(Math.min(0, d.positive) * 1.1);
            })
            .attr("y", function (d) {
                return y(d.name) + y.rangeBand() / 2;
            })
            .attr("dy", ".75em")
            .text(function (d) {
                return d.name.replace(/\w\S*/g, function (txt) {
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            });

        svg.selectAll(".bar2")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar2")
            .attr("x", function (d) {
                return x(Math.min(0, -d.negative));
            })
            .attr("y", function (d) {
                return y(d.name);
            })
            .attr("width", function (d) {
                return Math.abs(x(-d.negative) - x(0));
            })
            .attr("height", y.rangeBand())
            .on("click", function (d, i) {
          console.log("I just clicked the bar");
          console.log(d);
          show_time(d, d.locality, d.name,d.link)
      })


        svg.append("g")
            .attr("class", "x axis")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .append("line")
            .attr("x1", x(0))
            .attr("x2", x(0))
            .attr("y2", height);
    });
}
