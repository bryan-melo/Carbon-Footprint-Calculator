const bar_char_data = [
    ["Average Person's Consumption", 'My Resource Consumption', "Average Person's Resource Consumption"],
    ['Monthly Electricity Usage (kWh)', 1020, 800],
    ['Monthly Fuel Consumption (liters):', 52, 100],
    ['Waste Generated (kg per month)', 67, 50],
    ['Monthly Water Usage (liters)', 207, 300],
];

// Global variables
let chart;
let options;
let dataTable;

function initializeBarChart() {
    dataTable = google.visualization.arrayToDataTable(bar_char_data);
}

function drawBarChart() {
    chart = new google.charts.Bar(document.getElementById('chart-container'));

    options = {
      chart: {
          title: 'Personal Resource Consumption',
          subtitle: 'Comparison of Personal and Average Usage'
        },
        hAxis: {
          title: 'Resource Consumption'
        },
        vAxis: {
          title: 'Resource Type'
        },
        bars: 'horizontal',
    };

    chart.draw(dataTable, options);
}

function calculateCarbonFootprint() {
    //user input values
    const electricityUsage = parseFloat(document.getElementById('electricityUsage').value);
    const fuelConsumption = parseFloat(document.getElementById('fuelConsumption').value);
    const wasteGenerated = parseFloat(document.getElementById('wasteGenerated').value);
    const waterUsage = parseFloat(document.getElementById('waterUsage').value);

    if (isNaN(electricityUsage) || isNaN(fuelConsumption) || isNaN(wasteGenerated) || isNaN(waterUsage)) {
        document.getElementById('result').textContent = 'Please enter valid numerical values for all inputs.';
        return;
    }

    //emission factors (kg CO2 per unit)
    const CO2_PER_KWH = 0.527;
    const CO2_PER_LITER_FUEL = 2.31;
    const CO2_PER_KG_WASTE = 0.8;
    const CO2_PER_LITER_WATER = 0.0003;

    //calc emissions for each activity
    const electricityEmissions = electricityUsage * CO2_PER_KWH;
    const fuelEmissions = fuelConsumption * CO2_PER_LITER_FUEL;
    const wasteEmissions = wasteGenerated * CO2_PER_KG_WASTE;
    const waterEmissions = waterUsage * CO2_PER_LITER_WATER;

    //total emissions
    const totalEmissions = electricityEmissions + fuelEmissions + wasteEmissions + waterEmissions;
    //results
    document.getElementById('result-text').style.display = 'block';
    document.getElementById('result').textContent = `Your total monthly carbon footprint is: ${totalEmissions.toFixed(2)} kg CO2 equivalent.`;
    document.getElementById("chart-container").style.display = "block";

    // Draw the chart after calculation
    drawBarChart();
}

document.addEventListener("DOMContentLoaded", function () {
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(initializeBarChart); // Initialize only once on page load
});

window.addEventListener('resize', () => {
    if (chart) {
        chart.draw(dataTable, options);
    }
});