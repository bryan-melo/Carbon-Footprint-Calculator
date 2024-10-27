// Functional logic (pure functions, calculations)

export function calculateEmissions(formData) {
    const emissionsPerGallon = 19.6;
    const mileage = formData.mileage;
    const mpg = formData.mpg;

    const emissionsPerVehicle = mileage.map((x, i) => x / mpg[i] * emissionsPerGallon);

    formData.emissionsPerVehicle = emissionsPerVehicle;

    const totalEmissions = emissionsPerVehicle.reduce((total, element) => total + element, 0);

    return totalEmissions;
}