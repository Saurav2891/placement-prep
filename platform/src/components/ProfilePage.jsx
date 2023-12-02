import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './ProfilePage.css';

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
        const response = await axios.get('http://localhost:3000/api/test-records');
        setTestRecords(response.data);
      } catch (error) {
        console.error('Error fetching test records:', error);
      }
    };

    fetchTestRecords();
  }, []);

  // Extracting labels (dates) and data (scores) for the chart
  const labels = testRecords.map((record) => record.date);
  const data = testRecords.map((record) => record.score);
  // console.log(userData);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Test Scores Over Time',
        data: data,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
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
          {/* <Line data={chartData} /> */}
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
              <tr key={record.test_record_id} className="test-history-item">
                <td>{record.test_record_id}</td>
                <td>{record.name}</td>
                <td>{record.level}</td>
                <td>{record.topic}</td>
                <td>{record.start_time}</td>
                <td>{record.end_time}</td>
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