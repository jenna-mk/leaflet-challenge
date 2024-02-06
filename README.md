# Module 15 Challenge: Visualizing Daily Earthquakes Using Leaflet
The purpose of this challenge is to use the Leaflet.js library to visualize earthquake data gathered by the United States Geological Survey (USGS). The visualization will display the location, time, magnitude, and depth of earthquakes that occurred over the past day.

## Part 1: Create the Earthquake Visualization
The first step in creating the visualization is to connect to the dataset by accessing the USGS site at https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php. I selected the dataset for all earthquakes from the past day, and used this URL to pull the data.
Using Leaflet, I created a map that plotted each earthquake occurence by its latitude and longitude. In order to provide a clear picture of each occurence, the size of each earthquake is scaled based on its magnitude and the color of each earthquake is based on its depth. When an occurence is clicked, a popup will appear with the location, time, exact magnitude, and exact depth of the earthquake. A legend on the bottom right of the map displays the colors and ranges for the earthquake depths.

## References 
Dataset created by the United States Geological Survey.
