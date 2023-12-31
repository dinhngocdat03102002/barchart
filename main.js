//chart dimensions 
const margin ={top: 70, right:40, bottom:60, left: 175}
const width =600 - margin.left - margin.right
const height = 400 - margin.top -margin.bottom
// svg container
const svg = d3.select("#Grouped bar").append("svg")
.attr("width",width + margin.left + margin.right)
.attr("height", height+ margin.top + margin.bottom)
.append("g")
.attr("transform" , "translate( "+ margin.left + "'" + margin.top+")");
//Load data
d3.cssv("nhets file csv vo.csv").then (data =>{
    data.forEach(d=>{
        d.total =+d.total;
    });

// Sort data by total
    data.sort(funtion(a,b) {
        return d3.ascending(a.total, b.total); 
    });
//set x y scales
const x = d3.scaleLinear()
    .range([0,width])
    .domain([0, d3.max(data, function (d){return d.total; })]);

    const y = d3.scaleBand()
    .range([height, 0])
    .padding(0.1)
    .domain(data.map(function(d){ return d.Groupedbar_body_type}));
    //create axis
    const x Axis =d3.axisBottom(x)
    .tick(5)
    .tickSize(0); //remove ticks
    const y Axis =d3.axisLeft(y)
    .tickSize(0)
    .tickPadding(10);
    //add x y to the chart
    svg.append("g")
    .attr("class","x axis")
    .style("font-size","10px")
    .attr("transform","translate(0," + height +")")
    .call(xAxis)
    .call(g => g.select(".domain").remove());

    svg.append("g")
    .attr("class","y axis")
    .style("font-size","8px")
    .call(yAxis)
    .selectAll('path')
    .style('stroke-width','1.75px');
//Create bars for chart
svg.selectAll(".bar")
.data(data)
.enter().append("rect")
.attr("class","bar")
.attr("y",function (d){ return y(d.Groupedbar_body_type);})
.attr("height",y.bandwidth())
.attr("x",0)
.attr("width",function(d){return x(d.total);})
.style("fill",'skyblue')
// add vertical gridlines
svg.selectAll("line.vertical-grid")
.data(x.ticks(5))
.enter()
.append("line")
.attr("class", "vertical-grid")
.attr("x1",function (d) {return x(d); })
.attr("y1",0)
.attr("x2",function (d) {return x(d); })
.attr("y2",height)
.style("stroke","gray")
.style("stroke-width",0.5)
.style("stroke-dasharray","3 3");
//Add labels to each bar
svg.selectAll(".label")
.data(data)
.enter().append("text")
.attr("x", function (d){ return x(d.total)+5; })
.attr("y", function (d) { return y(d.Groupedbar_body_type)+ y.bandwidth() / 2;})
.attr("dy", ".35em")
.style("font-family","sans-serif")
.style("font-size","10px")
.style("font-weight", "bold")
.style('fill', '#3c3d28')
.text(function (d){ return d,total;});
// Add total label
svg.append("text")
.attr("transform", "translate(" +width /2 + "," + (height +margin.bottom))
.style("text-anchor","middle")
.style("font-size","10px")
.style("fill","black")
.style("font-family","sans-serif")
.attr("dy","1em")
.text("Total");
// Add chart title
svg.append("text")
.attr("x",margin.left -335)
.attr("y", margin.top - 110)
.style("font-size","14px")
.style("font-weight","bold")
.style("font-family","sans-serif")
.text("cai tieu de");

// Add the chart data source
svg.append("text")
.attr("transform","translate("+(margin.left - 335)+ "," +(height + margin.bottom))
.style("text-anchor","start")
.style("font-size","8px")
.style("fill","lightgray")
.style("font-family","san-serif")
.html("nhet cai link vo day")