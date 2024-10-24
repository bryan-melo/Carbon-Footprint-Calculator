// Main entry point for JS

import { getFormData, updateTotalElement, drawPieChart, drawLineChart, drawGeoMap } from "./dom.js";
import { calculateEmissions } from "./core.js";

function main() {
  // Set up form submission handler
  document.getElementById("car-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get form data from the DOM
    const formData = getFormData();

    // Calculate total emissions
    const totalEmissions = calculateEmissions(formData);
        
    // Update Annual Carbon Footprint on the DOM
    updateTotalElement(totalEmissions);

    // Generate Graphs on the DOM
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart', 'geochart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(() => drawPieChart(formData));
    google.charts.setOnLoadCallback(() => drawLineChart(formData));
    google.charts.setOnLoadCallback(() => drawGeoMap(formData));
  });
}

// Initialize
main();