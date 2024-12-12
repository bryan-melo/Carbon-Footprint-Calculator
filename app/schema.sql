-- schema.sql

-- Create Users Table
CREATE TABLE IF NOT EXISTS accounts (
    account_id INTEGER PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL 
);

-- Create Calculations Table
CREATE TABLE IF NOT EXISTS calculations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,   
    accountId INTEGER NOT NULL,              
    date DATETIME NOT NULL,             
    electricityUsage REAL,      
    fuelConsumption REAL,        
    wasteGenerated REAL,     
    waterUsage REAL,           
    totalEmissions REAL,        
    FOREIGN KEY (accountId) REFERENCES accounts(account_id)  
);

-- Create Timeline Posts Table
CREATE TABLE IF NOT EXISTS posts (
    post_id INTEGER PRIMARY KEY AUTOINCREMENT,  
    account_id INTEGER NOT NULL,                   
    post_title TEXT NOT NULL,                  
    post_date DATETIME NOT NULL,           
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)  
);
