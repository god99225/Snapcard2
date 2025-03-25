// src/components/Accounts.jsx
import React, { useEffect, useState } from 'react';
import API from '../api/axiosConfig.jsx';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        console.log('Fetching accounts...'); // Log message
        const response = await API.get('/odata/Accounts');
        console.log('Response data:', response.data); // Log response
        setAccounts(response.data.value);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchAccounts();
  }, []);

  return (
    <div>
      <h1>Accounts</h1>
      {accounts.length === 0 ? (
        <p>No accounts available.</p>
      ) : (
        <ul>
          {accounts.map(account => (
            <li key={account.Oid}>{account.Name} - {account.Email}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Accounts;
