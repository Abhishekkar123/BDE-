import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'
// import { data1 } from './data'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
function Recertificate() {
  const [data1,setData1]=useState([])

  const fetchData=async()=>{
    const resp=await axios.get("http://localhost:8000/api/audit-calculation/two");
    console.log(resp)
    setData1(resp.data);
  }

    const navigate=useNavigate();



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
               
              </tr>
            </thead>
            <tbody>
              {data1.map((row, index) => (
                <tr key={index}>
                  <td>{row.employeesFrom}</td>
                  <td>{row.employeesTo || 'Above'}</td>
                  <td>{row.auditManDays}</td>
                 
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

export default Recertificate

