import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
// import { data } from './data'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
function InitialManday() {
    const navigate=useNavigate();
    const [data,setData]=useState([]);

    const fetchData=async()=>{
      const resp=await axios.get("http://localhost:8000/api/audit-calculation/one");
      console.log("initial manday",resp);
      setData(resp.data);

    }
    useEffect(()=>{
     
      fetchData();
    },[])
    const handleClick=()=>{
        navigate("/business/contract/review")
    }
  return (
    <>
     <Table striped bordered hover>
            <thead>
              <tr>
                <th>Employees From</th>
                <th>Employees To</th>
                <th>Audit Man Days</th>
                <th>Surveillance Audit Mandays</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.employeesFrom}</td>
                  <td>{row.employeesTo || 'Above'}</td>
                  <td>{row.auditManDays}</td>
                  <td>{row.surveillanceAuditMandays}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className='text-end'>
            <Button style={{background:'#152238'}} onClick={handleClick} className='p-2'>
                Back
            </Button>

          </div>


    
    
    
    </>
  )
}

export default InitialManday
