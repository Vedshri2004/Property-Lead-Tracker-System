-- Create Database
CREATE DATABASE property_tracker;

\c property_tracker;

-- Buyers Table
CREATE TABLE buyers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL
);

-- Brokers Table
CREATE TABLE brokers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL
);

-- Leads Table
CREATE TABLE leads (
    id SERIAL PRIMARY KEY,
    buyer_id INT REFERENCES buyers(id),
    broker_id INT REFERENCES brokers(id),
    property_location VARCHAR(100),
    budget INT,
    status VARCHAR(50) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
