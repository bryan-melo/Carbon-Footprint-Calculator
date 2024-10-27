// DOM manipulation logic (event listeners, updates)

export function getFormData() {
    const formData = document.getElementById('car-form');

    const year = [];
    const manufacturer = [];
    const model = [];
    const mileage = [];
    const mpg = [];

    for (let i = 0; i < formData.elements.length; i++) {
        let element = formData.elements[i];

        if (element.name == "year") {
            year.push(parseInt(element.value));
        } else if (element.name == "manufacturer") {
            manufacturer.push(element.value);
        } else if (element.name == "model") {
            model.push(element.value);
        } else if (element.name == "mileage") {
            mileage.push(parseFloat(element.value));
        } else if (element.name == "mpg") {
            mpg.push(parseFloat(element.value));
        }
    }
    
    const carData = {
        year: year,
        manufacturer: manufacturer,
        model: model,
        mileage: mileage,
        mpg: mpg
    };1

    return carData;
}

export function updateTotalElement(totalEmissions) {
    let totalElement = document.getElementById('total-emissions');
    totalElement.textContent = totalEmissions.toFixed(2);
}

export function drawPieChart(userData) {
    const pieCharData = processDataForPieChart(userData);
    
    // Create the data table.
    var data = new google.visualization.arrayToDataTable([
        ['Vehicle', 'Emissions'],
        ...Object.values(pieCharData)
    ]);
   
    // Set chart options
    var options = {
        'title':'Annual Carbon Emissions per Vehicle (fixed at 15,000 annual miles)',
        'is3D': true
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('pie_chart_div'));
    chart.draw(data, options);
}

export function drawLineChart(userData) {
    const lineChartData = processDataForLineChart(userData);

    var data = new google.visualization.DataTable();
      data.addColumn('number', 'X');
      data.addColumn('number', 'Carbon Emissions');

      data.addRows([...Object.values(lineChartData)]);

      var options = {
        hAxis: {
          title: 'Day'
        },
        vAxis: {
          title: 'Carbon Emissions'
        },
        backgroundColor: '#f1f8e9'
      };

      var chart = new google.visualization.LineChart(document.getElementById('line_chart_div'));
      chart.draw(data, options);
}

export function drawGeoMap(userData) {
   const geoMapData = processDataForGeoMap(userData);

    var data = google.visualization.arrayToDataTable([
        ['Country', 'Vehicle Polution'],
        ...Object.values(geoMapData)
      ]);

    var options = {
        colorAxis: {
            colors: ['#c8e6c9', '#a5d6a7', '#ffe082', '#ffb74d', '#ef5350']
        }
    }
    
    var chart = new google.visualization.GeoChart(document.getElementById('geo_chart_div'));
    chart.draw(data, options);
}

export function processDataForPieChart(data) {
    const vehiclesEmissionsObj = [];

    for (let i = 0; i < data.year.length; i++) {
        vehiclesEmissionsObj[i] = [data.year[i] + " " + data.manufacturer[i] + " " + data.model[i], data.emissionsPerVehicle[i]];
    }

    return vehiclesEmissionsObj;
}

export function processDataForLineChart(data) {
    const vehiclesEmissionsObj = {}

    for (let i = 0; i < data.year.length; i++) {
        vehiclesEmissionsObj[i] = [i, data.emissionsPerVehicle[i]];
    }

    return vehiclesEmissionsObj;
}

export function processDataForGeoMap(data) {
    const countries = ['Germany', 'Ukraine', 'Brazil', 'Canada', 'France', 'RU', 'India', 'Mexico', 'Australia', 'United States'];
    const vehicleEmissionsObj = {};

    for (let i = 0; i < data.year.length; i++) {
        vehicleEmissionsObj[i] = [countries[i], data.emissionsPerVehicle[i]];
    }

    return vehicleEmissionsObj;
}