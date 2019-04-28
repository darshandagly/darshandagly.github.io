
function show_dropdown(state_id,buttonId)
{
	var selectValue;
	var selection = "valid";
d3.json("./resources/data/regionLocality.json",function(file_data)
{
		reset_hotels();
		var data = ["Option 1", "Option 2", "Option 3"];

		for(var i=0;i<file_data.length;i++)
		{
			// data = ["Choose a locality"];
			// console.log("State Id");
			// console.log(state_id);
			if(state_id==file_data[i]._id)
			{
			// console.log("reached here?");
			// console.log("id");
			// console.log(file_data[i]._id);
			// console.log(file_data[i].locality);
			data = file_data[i].locality;

			data.unshift("Choose a locality");
			break;
			}

		}


		console.log("The value of data hotel");
		console.log(data);
		console.log("Value of buttonId is ");
		console.log(buttonId);

		d3.select('.select_locality').selectAll('option').remove();
		var select = d3.select('.select_locality')

		// var options = select
		//   .selectAll('option')
		// 	.data(data).enter()
		// 	.append('option')
		// 	.text(function (d) { return d; })
		// 	onchange(onchange);

		var options = select
		  .selectAll('option')
			.data(data).enter()
			.append('option')
			.text(function (d) { return d; })
			.attr("class","locality_options")
			// .setAttribute("onchange",onchange);

			d3.select('.select_locality')
		  	.on('change', onchange);



function reset_hotels()
{
	d3.select('.select_hotel').selectAll('option').remove();
	var select = d3.select('.select_hotel');

	data_hotel = [""]
	var options = select
	  .selectAll('option')
		.data(data_hotel).enter()
		.append('option')
		.text(function (d) { return d; });
}


function onchange() {

	console.log("Does it enter the onchange function?");
	selectValue = d3.select('.select_locality').property('value')

	// d3.select('body')
	// 	.append('p')
	// 	.text(selectValue + ' is the last selected option.')
		d3.json("./resources/data/localityHotel.json",function(hotel_data)
		{

				d3.select('.select_hotel')
			  	.on('change', onchangehotel);

			  	function onchangehotel()
			  	{
			  		console.log("Does on change hotel get called?");
			  		console.log("Let's try to append a button");
					d3.select(".go").on("click",function (d,i){
						factorValue = d3.select(".select_quality").property('value');
						localityValue = d3.select(".select_locality").property('value');

						d3.select(".select_hotel").attr("id","select_hotel_id")
						var h = document.getElementById('select_hotel_id');
									var hotelValues = [];
									for (var i = 0; i < h.options.length; i++) {
									  if (h.options[i].selected) {
									    hotelValues.push(h.options[i].value);
									  }
									}


						d3.select(".stacked_bar").remove();
						d3.select(".star_table").remove();
						d3.select(".pie_chart").remove();
						d3.select(".time").remove()
						d3.selectAll(".remove").remove();
						document.getElementById("hotel_name").innerHTML = data.n;
						console.log("The value of factor is ");
						console.log(factorValue);
						console.log("The value of hotels is");
						console.log(hotelValues);
						stacked_bar(d,localityValue,hotelValues,factorValue);
					});
					d3.select(".go").style({visibility:"visible"}).attr("id","goId");
					document.getElementById("navigationId").appendChild(document.getElementById('goId'));
			  	}

					var data_hotel = ["Hotel 1", "Hotel 2", "Hotel 3"];

					console.log("The value of data_hotel before the loop!");
					console.log(data_hotel);
					for(var i=0;i<hotel_data.length;i++)
					{
						if(selectValue=="Choose a locality")
							{
								data_hotel = [""];
								selection = "invalid";
								d3.select(".star_table").remove();
								d3.select(".pie_chart").remove();
								document.getElementById("hotel_name").innerHTML = "";
								break;
							}
							selection="valid";
							if(buttonId == "system" && selection == "valid")
								{
												d3.select(".go").on("click",function (d,i){
												factorValue = d3.select(".select_quality").property('value');
												d3.select(".stacked_bar").remove();
												d3.select(".star_table").remove();
												d3.select(".pie_chart").remove();
												d3.select(".time").remove()
												d3.selectAll(".remove").remove();
												document.getElementById("hotel_name").innerHTML = "";
												console.log("The value of factor is ");
												console.log(factorValue);
												// stacked_bar(d,factorValue);

												localityValue = d3.select(".select_locality").property('value');
												display_pie(localityValue,factorValue);
											});
									d3.select(".go").style({visibility:"visible"}).attr("id","goId");
									document.getElementById("navigationId").appendChild(document.getElementById('goId'));

									// display_pie(state_id);
								}
								else
								{
									d3.select(".star_table").remove();
									d3.select(".pie_chart").remove();
									document.getElementById("hotel_name").innerHTML ="";
								}
									// console.log("Let's try to append a button");
									// d3.select(".go").remove();
									// buttonNames = ["go"]
									// d3.select("body").selectAll("input").data(buttonNames).enter().append("input").attr("type","button").attr("class","go").attr("value", function (d){return d;})
						if(selectValue==hotel_data[i]._id)
						{
						// console.log("reached here?");
						// console.log("id");
						// console.log(file_data[i]._id);
						// console.log(file_data[i].locality);
							data_hotel = [];
							for(var j=0;j<hotel_data[i].hotel.length;j++)
							{
								data_hotel.push(hotel_data[i].hotel[j].name);
							}
							// data_hotel.unshift("Choose a hotel");
							break;
						}

					}

					// console.log("The value of data_hotel!");
					// console.log(data_hotel);
					d3.select('.select_hotel').selectAll('option').remove();
					var select = d3.select('.select_hotel');

					var options = select
					  .selectAll('option')
						.data(data_hotel).enter()
						.append('option')
						.text(function (d) { return d; });



});

}
if(buttonId == "user")
	{
		d3.select(".pie_chart").remove();
		document.getElementById("hotel_name").innerHTML = "";
	}


});
};
