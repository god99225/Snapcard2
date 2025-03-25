import React, { useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import '../style/Analytics.css'; // Ensure you have this CSS file
import Sidebar from './Sidebar';

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const chartRef = useRef(null);
  const [showModal, setShowModal] = useState(true); // State for modal visibility

  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Total Share',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Visit',
        data: [45, 49, 70, 71, 46, 35, 30],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Share and Counts Data',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const chartInstance = chartRef.current;

    return () => {
      // Clean up the chart instance on component unmount
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [chartRef]);

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <Sidebar />
      <div className="analytics-container">
        <h2>Analytics Dashboard</h2>
          {showModal && (
              <div className="modal">
                  <div className="modal-content">
                      <div className="modal-header">
                          <h2 className="modal-title">Subscription Details</h2>
                          <button className="modal-close" onClick={handleCloseModal}>
                              &times;
                          </button>
                      </div>
                      <div className="modal-body">
                          <p>Plan: Premium</p>
                          <p>Start Date: January 1, 2024</p>
                          <p>Renewal Date: January 1, 2025</p>
                          <p>Features:</p>
                          <ul>
                              <li>Unlimited access to all features</li>
                              <li>Priority customer support</li>
                              <li>Customizable templates</li>
                              <li>Analytics dashboard</li>
                              <li>Regular updates</li>
                          </ul>
                          <button className="modal-button" onClick={handleCloseModal}>
                              Close
                          </button>
                      </div>
                  </div>
              </div>
          )}


        <div className="chart-wrapper">
          <Bar ref={chartRef} data={data} options={options} />
        </div>

        <div className="progress-section">
          <h2>Progress Indicators</h2>
          <div className="progress-cards">
            <div className="progress-card">
              <h3>Total Peoples</h3>
              <div className="progress-bar" style={{ width: '75%' }}></div>
              <p>75% of target achieved</p>
            </div>
            <div className="progress-card">
              <h3>New Peoples</h3>
              <div className="progress-bar" style={{ width: '60%' }}></div>
              <p>60% of target achieved</p>
            </div>
            <div className="progress-card">
              <h3>Website Traffic</h3>
              <div className="progress-bar" style={{ width: '90%' }}></div>
              <p>90% of target achieved</p>
            </div>
          </div>
        </div>

        <div className="statistics-section">
          <h2>Key Statistics</h2>
          <div className="stats-cards">
            <div className="stats-card">
              <h4>Total Revenue</h4>
              <p>$150,000</p>
            </div>
            <div className="stats-card">
              <h4>Total Orders</h4>
              <p>1,200</p>
            </div>
            <div className="stats-card">
              <h4>Average Order Value</h4>
              <p>$125</p>
            </div>
            <div className="stats-card">
              <h4>Customer Satisfaction</h4>
              <p>95%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
