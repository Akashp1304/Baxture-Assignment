import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerCard from './components/CustomerCard';
import './App.css';

const App = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  const handleFollow = (customerId) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, following: !customer.following } : customer
      )
    );
  };

  const handleDelete = (customerId) => {
    setCustomers((prevCustomers) => prevCustomers.filter((customer) => customer.id !== customerId));
  };

  return (
    <div className="App mantine-Grid-inner">
      {customers.map((customer) => (
        <CustomerCard className="app-1"
          key={customer.id}
          customer={customer}
          onFollow={handleFollow}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default App;
