	d3.select("#selected-dropdown").text("first");

		d3.select("select")
		  .on("change",function(d){
		    var selected = d3.select("#d3-dropdown").node().value;
		    console.log( selected );
		    d3.select("#selected-dropdown").text(selected);
		})

	function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
		return "<h4>"+n+"</h4><table>"+
			// "<tr><td>Low</td><td>"+(d.low)+"</td></tr>"+
			"<tr><td>Average</td><td>"+(d.avg)+"</td></tr>"+
			// "<tr><td>High</td><td>"+(d.high)+"</td></tr>"+
			"</table>";
		}
		function tooltipHtmlOtherStates(n, d){	/* function to create html content string in tooltip div. */
		return "<h4>"+n+"</h4>";
	}

	var dataset ;
	var sampleData;
	d3.json("offering.json",function(data)
	{
				var nest = d3.nest()
				.key(function(d) { return d.address.region;})
				.rollup(function(d) { 
				return d3.mean(d, function(g) {return g.hotel_class; });
				}).entries(data);
				console.log("Nest variable")
				console.log(nest)
				dataset = data;
				sampleData ={};	/* Sample random data. */	
				["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
				"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
				"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
				"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
				"WI", "MO", "AR", "OK", "KS", "LS", "VA"]
					.forEach(function(d,i){ 
						var c ;
						
								var data_filter = nest.filter(element => element.key == d);
								if(data_filter[0] !=null)
								{
									c = data_filter[0].values;
								}
								else
								{
									c = 0.0
								}
								
					
						sampleData[d]={avg:c, color:d3.interpolate("#e8f4ee", "#006b37")(c/2.5)}; 
						
								
	
						
				
					}); 
					/* draw states on id #statesvg */	
						uStates.draw("#statesvg", sampleData, tooltipHtml,tooltipHtmlOtherStates);
						
						d3.select(self.frameElement).style("height", "70%");

	});
