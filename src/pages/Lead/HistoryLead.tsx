import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';

function LeadHistory() {
    const [historyData, setHistoryData] = useState([]);

    const fetchLeadHistory = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/lead/history');
            setHistoryData(response.data.leadHistory);
        } catch (error) {
            console.error('Error fetching lead history:', error);
        }
    };

    useEffect(() => {
        fetchLeadHistory();
    }, []);

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      };

    return (
        <div className="container mt-4">
            <h2>Lead History</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                      
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Created By</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {historyData.map((lead, index) => (
                        <tr key={index}>
                            
                            <td>{lead.firstName}</td>
                            <td>{lead.lastName}</td>
                            <td>{formatTime(lead.createdBy)}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default LeadHistory;
