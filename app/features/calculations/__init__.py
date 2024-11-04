def calculate_carbon_footprint(electricity_usage_kwh, fuel_consumption_liters, waste_kg, water_usage_liters):
    """
    Calculate the carbon footprint based on electricity, fuel, waste, and water usage.
    """
    # emission factors (kg CO2 per unit)
    CO2_PER_KWH = 0.527  # kg CO2 per kWh (electricity)
    CO2_PER_LITER_FUEL = 2.31  # kg CO2 per liter (gasoline fuel)
    CO2_PER_KG_WASTE = 0.8  # kg CO2 per kg waste (general household waste)
    CO2_PER_LITER_WATER = 0.0003  # kg CO2 per liter (water usage)

    # calculations of the carbon emissions for each activity
    electricity_emissions = electricity_usage_kwh * CO2_PER_KWH
    fuel_emissions = fuel_consumption_liters * CO2_PER_LITER_FUEL
    waste_emissions = waste_kg * CO2_PER_KG_WASTE
    water_emissions = water_usage_liters * CO2_PER_LITER_WATER

    # total carbon footprint
    total_emissions = electricity_emissions + fuel_emissions + waste_emissions + water_emissions
    return total_emissions


try:
    electricity_usage_kwh = float(input("Enter your monthly electricity usage in kWh: "))
    fuel_consumption_liters = float(input("Enter your monthly fuel consumption in liters: "))
    waste_kg = float(input("Enter the amount of waste generated in kg per month: "))
    water_usage_liters = float(input("Enter your monthly water usage in liters: "))

    carbon_footprint = calculate_carbon_footprint(electricity_usage_kwh, fuel_consumption_liters, waste_kg, water_usage_liters)
    print(f"\nYour total monthly carbon footprint is: {carbon_footprint:.2f} kg CO2 equivalent")
except ValueError:
    print("Please enter valid numerical values for all inputs.")
