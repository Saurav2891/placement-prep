import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfilePage.css';
import { Chart as ChartJS, CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
import {Bar} from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
export const options = {
  responsive:true,
  plugins:{
    legend:{
      position:"top",
    },
    title:{
      display:true,
      text:"Test Score Progress",
    },
    },
  };

const ProfilePage = () => {
  const authToken = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    name: '',
    college: '',
    domain: '',
    graduationYear: '',
    userid: '',
  });
  const [testRecords, setTestRecords] = useState([]);
  //const [testRecords, setTestRecords] = useState([]);
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const id = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/users/${id}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        // console.log(response.data.data);
        setUserData({
          name: response.data.data.first_name + ' ' + response.data.data.last_name,
          college: response.data.data.college,
          domain: response.data.data.domain,
          graduationYear: response.data.data.graduation_year,
          userid: response.data.data.user_id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (authToken) {
      fetchUserData();
    }
  }, [authToken]);
  useEffect(() => {
    const fetchTestRecords = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`http://localhost:3000/api/test/test-record?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });
        setTestRecords(response.data.data);
        // console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching test records:', error);
      }
    };

    fetchTestRecords();
  }, []);

  
  const formatDate = (dateString) => {
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
  
    return new Date(dateString).toLocaleString('en-US', options);
  };

    // Extracting labels (dates) and data (scores) for the chart
    const labels = testRecords.map((record) => formatDate(record.test_start_time));
    const data = testRecords.map((record) => record.score);
    // console.log(userData);
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Test Scores',
          data: data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
    
  return (
    <div className="profile-container">
      <div className="user-data-section">
        <div className="user-data-card">
          <center><h3>USER DATA</h3></center>
          {userData ? (
            <div>
              <h2>{userData.name}</h2>
              <p>College: {userData.college}</p>
              <p>Domain: {userData.domain}</p>
              <p>Graduation Year: {userData.graduationYear}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="graphical-view-card">
          <center><h3>Graphical view</h3></center>
          <h2>Test Score Progress</h2>
          <Bar options={options} data={chartData} />
        </div>
      </div>
      <div className="test-history-card">
        <center><h3>TEST HISTORY</h3></center>
        <table className="test-history-table">
          <thead>
            <tr>
              <th>Test Record ID</th>
              <th>Name</th>
              <th>Level</th>
              <th>Topic</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {testRecords.map((record) => (
              <tr key={record.record_id} className="test-history-item">
                <td>{record.record_id}</td>
                <td>{record.first_name + '' + record.last_name}</td>
                <td>{record.level_name}</td>
                <td>{record.topic_name.split('_')[1]}</td>
                <td>{formatDate(record.test_start_time)}</td>
                <td>{formatDate(record.test_end_time)}</td>
                <td>{record.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;