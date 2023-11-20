document.addEventListener('DOMContentLoaded', function () {
    var chart = pack();
    var nodes = data2020;

    var selectedCountry;

    chart.nodes(nodes).render();

    function pack() {
      var _chart = {};
      var _width = window.innerWidth, _height = window.innerHeight,
        _svg,
        _r = _width,
        _x = d3.scale.linear().range([0, _r]),
        _y = d3.scale.linear().range([0, _r]),
        _nodes,
        _bodyG,
        tooltip,
        tooltipFlag;

      var zoomBehavior = d3.behavior.zoom()
        .scaleExtent([1, 30])
        .translate([0, 0]);

      _chart.render = function () {
        if (!_svg) {
          _svg = d3.select("#content").append("svg")
            .attr("height", _height)
            .attr("width", _width)
            .attr("fill", "lightgray")
            .call(zoomBehavior.on("zoom", redraw));

          tooltip = d3.select("#content").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
            tooltipFlag = d3.select("#content").append("img")
            .attr("class", "tooltipFlag")
            .style("opacity", 0);
        }

        renderBody(_svg);
      };

      function redraw() {
        _bodyG.attr("transform",
          "translate(" + d3.event.translate + ")"
          + " scale(" + d3.event.scale + ")");
      }

      function renderBody(svg) {
        if (!_bodyG) {
          _bodyG = svg.append("g")
            .attr("class", "body")
            .attr("transform", function (d) {
              return "translate(" + (0) + "," + (0) + ") scale(1)";
            });
        }

        var packLayout = d3.layout.pack()
          .size([_r, _r])
          .sort(null)
          .padding(10)
          .value(function (d) {
            return 1; // You can adjust this value based on your needs
          });

        _nodes = packLayout.nodes(_nodes);
        renderPaths(_nodes);
      }

      function renderPaths(nodes) {
        var paths = _bodyG.selectAll("path")
          .data(nodes);

        paths.enter().append("svg:path")
          .attr("d", function (d) {
            return d.d;
          })
          .on('mousemove', function (d) {    
            tooltip.html(d.title)
                .style("opacity", .9)
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px")
              .style("transform", "translate(-50%, -50%)");
            var tooltipWidth = tooltip.node().getBoundingClientRect().width;
            tooltipFlag.html(d.id)
            .style("opacity", .9)
            .attr("src", "https://raw.githubusercontent.com/hampusborgos/country-flags/ba2cf4101bf029d2ada26da2f95121de74581a4d/svg/"+d.id.toLowerCase()+".svg")
            .style("left", (d3.event.pageX + tooltipWidth/2 - 14) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .attr("width","20")
            .style("transform", "translate(-50%, -50%)");
            var tooltipFlagWidth = tooltipFlag.node().getBoundingClientRect().width;
            tooltip.html(d.title)
              .style("padding-right", (tooltipFlagWidth/2+12)+"px");
          })
          .on('mouseenter', function (d) {
            if(d != selectedCountry)
            {
              d3.select(this).attr("fill", "darkgray");
            }          
          })
          .on('mouseout', function (d) {
            tooltip.html(d.title)
              .style("opacity", 0);
            tooltipFlag.html(d.title)
            .style("opacity", 0);
            if(d != selectedCountry)
            {
              d3.select(this).attr("fill", "lightgray");
            }
          })
          .on("click", function(d) {
            if(selectedCountry != null)
            {
                //ownership
                var selectedOwnership = selectedCountry.ownership;
                if (selectedOwnership !== null) {
                  d3.selectAll("path")
                     .filter(function (country) {                     
                     return country.ownership === selectedOwnership && country.ownership !== "";
                     })
                     .attr("fill", "lightgray");     
                }      
                d3.selectAll("path")
                .filter(function (country) {                     
                return country === selectedCountry;
                })
                .attr("fill", "lightgray");
            }
             selectedCountry = d;
             var selectedOwnership = d.ownership;
                if (selectedOwnership !== null) {
                  d3.selectAll("path")
                     .filter(function (country) {                     
                     return country.ownership === selectedOwnership && country.ownership !== "";
                     })
                     .attr("fill", "lightblue");                
               }
               d3.select(this).attr("fill", "Blue");

               var myObject = document.getElementById("overlaypanel");
               myObject.style.width = "400px";
               myObject.style.visibility = "visible";
               
               var CountryImage = document.getElementById("CountryImage");
               CountryImage.src = "https://raw.githubusercontent.com/hampusborgos/country-flags/ba2cf4101bf029d2ada26da2f95121de74581a4d/svg/"+d.id.toLowerCase()+".svg";
               CountryImage.style.visibility = "visible";

               var CountryName = document.getElementById("CountryName");
               CountryName.textContent = d.title; 

               var CountryInformation = countryInfo2020[d.id];
               console.log(CountryInformation.capital)

          });
        paths.exit().remove();
      }

      _chart.nodes = function (n) {
        if (!arguments.length) return _nodes;
        _nodes = n;
        return _chart;
      };

      return _chart;
    }
  });
  function ShowQuizSelection()
  {
    document.getElementById("PlayQuizPanel").style.scale = 1;
  }
  