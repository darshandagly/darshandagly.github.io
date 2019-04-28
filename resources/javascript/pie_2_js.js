
function display_pie(localityValue, factorValue) {
	d3.select(".star_table").remove();
	d3.select(".pie_chart").remove();
	document.getElementById("hotel_name").innerHTML = "";
	d3.json("./resources/data/aggregated_star_data.json", function (dataset) {
		var classes = ['one', 'two', 'three', 'four', 'five'];

		var width = 300;
		var height = 300;
		var radius = 100;

		for (var i = 0; i < dataset.length; i++) {
			if (dataset[i].locality == localityValue) {
				apnaHotel = dataset[i];
				break;

			}
		}
		console.log("let's print apnaHotel");
		console.log(apnaHotel);


		var starSvg = d3.select(".navigation").append("table").attr("class", "star_table").append("tbody").append("tr").append("td").append("span").attr("class", "rating big-red");
		create_stars();
		var svg = d3.select(".navigation").append("svg")
			.attr("width", width)
			.attr("height", height)
			.attr("class", "pie_chart")
			.append("g")
			.attr("transform", "translate(" + (width + 100) / 2 + "," + height / 2 + ")")
			.attr("style", function (d) { return "float:right" });

		var arc = d3.svg.arc()
			.outerRadius(radius)
			.innerRadius(0);

		var pie = d3.layout.pie()
			.sort(null)
			.value(function (d) { return d.value; });

		function mouseover(d) {
			// d3.selectAll(".fan").style("cursor", "pointer");
			// console.log("mouse over gets triggered?");
		}
		function mouseout(d) {
			d3.selectAll(".fan").style("cursor", "default");
			// console.log("mouse out gets triggered?");
		}

		function call_stacked_bar(d) {
			d3.select(".time").remove()
			d3.selectAll(".remove").remove();

			hotels = []
			localityValue = d3.select(".select_locality").property('value');
			stacked_bar(d, localityValue, hotels, factorValue);
		}

		colors = ["#C14242", "#BF7F3F", "#BFBF3F", "#7FBF3F", "#3FBF7F"]

		var g = svg.selectAll(".fan")
			.data(pie(apnaHotel.count))
			.enter()
			.append("g")
			.attr("class", "fan")

		g.append("path")
			.attr("d", arc)
			.attr("class", function (d, i) { return classes[i]; })
			.attr("fill", function (d, i) { return colors[i]; });

		d3.selectAll(".fan")
			.on("mouseover", mouseover)
			.on("mouseout", mouseout)
		// .on("click",call_stacked_bar);


		// g.append("text")
		// 	.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
		// 	.style("text-anchor", "middle")
		// 	.text(function(d) { return d.data.rating; });

		var bar_legend = d3.select('.pie_chart').append("svg").attr("id", "bar_legend").attr("style", function (d) { return "float:left" });
		var svg = d3.select("#bar_legend");
		svg.attr("transform", "translate(50,50)");

		var colorScale = d3.scale.ordinal()
			.domain(["1 Star", "2 Star", "3 Star", "4 Star", "5 Star"])
			.range(["#C14242", "#BF7F3F", "#BFBF3F", "#7FBF3F", "#3FBF7F"]);

		var colorLegend = d3.legend.color()
			.scale(colorScale)
			.shapePadding(1)
			.shapeWidth(50)
			.shapeHeight(15)
			.labelOffset(5);

		svg.append("g")
			.attr("transform", "translate(-10, 100)")
			.call(colorLegend);

	});
}
