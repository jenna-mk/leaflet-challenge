// Create a variable to hold the data for all of the earthquakes over the last day
let dailyEarthquakesURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Perform a get request to pull the data from the url 
d3.json(dailyEarthquakesURL).then(data => {
    console.log(data.features);
    createFeatures(data.features);
});

// Create a function to add the features from the earthquake dataset
function createFeatures(earthquakeData) {
    // Create another function to run on each feature in the data, which will give
    // each feature a popup, color, and size 
    function  onEachFeature(feature, layer) {
        // Bind a popup with the location, magnitude, and time of each earthquake
        layer.bindPopup(`<strong>Location:</strong> ${feature.properties.place}<br><strong>Time:</strong> ${new Date(feature.properties.time)}<br><strong>Magnitude:</strong> ${feature.properties.mag}<br><strong>Depth:</strong> ${feature.geometry.coordinates[2]}`);
    }

    // Create a GeoJSON layer with the features array from the dataset
    // Save the earthquake data in a variable which takes the array and runs the onEachFeature function
    // on each feature in the array
    let earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                // Set the marker size based on the magnitude of the earthquake 
                radius: markerSize(feature.properties.mag),
                // Set the marker color based on the depth of the earthquake
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.75
            });
        },
        onEachFeature : onEachFeature
    });

    // Pass the earthquake data into our createMap function defined below
    createMap(earthquakes);
}

function createMap(earthquakes) {
  // Create the base layers
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlays object 
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create a new map
  let map = L.map("map", {
    center: [39.82, -98.58],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control that contains the baseMaps
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);

  // Create a legend for the map
  let legend = L.control({
    position: "bottomright"
  });

  // Add the features of the legend
  legend.onAdd = function(map) {
    let div = L.DomUtil.create("div", "legend");
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = [
      "#00b300",
      "#b3ff66",
      "#ffd633",
      "#ff8000",
      "#ff6600",
      "#cc2900"
    ];

    // Add a title for the legend
    div.innerHTML += "<h3 style='text-align: left'>Depth</h3>"
    
    // Loop through each element to pair the color with the correct range
    for (i = 0; i < depths.length; i++) {
  
      // Update the innerHTML of the div element 
      div.innerHTML += 
      // Create an HTML element with an inline style for background color
      `<i style='background: ${colors[i]}'></i>` +
      // Add the current depth to the innerHTML
      `${depths[i]}` +
      // Check if there is another depth in the array
      // If yes, add a string that indicates the depth range
      // If no, add a string that indicates the current depth with a plus sign following
      `${depths[i + 1] ? "&ndash;" + depths[i + 1] + "<br>" : "+"}`;
        
    }
    return div;
  };

  
  // Add the legend to the map
  legend.addTo(map);

}

// Create a function to obtain the marker size of each earthquake
function markerSize(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 5;
};

function markerColor(depth) {
    let green = "#00b300";
    let lightgreen = "#b3ff66";
    let yellow = "#ffd633";
    let orange = "#ff8000";
    let redorange = "#ff6600";
    let red ="#cc2900";
    if (depth < 10) return green;
    else if (depth < 30) return lightgreen;
    else if (depth < 50) return yellow;
    else if (depth < 70) return redorange
    else if (depth < 90) return orange;
    else return red;
};

