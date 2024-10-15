// import React from 'react'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import TableComponent from '../../components/Tables/TableTwo';
import { useEffect, useState } from 'react';
import HeaderWithButton from '../../components/Header/HeaderWithButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Contract() {



  

  const navigate=useNavigate();
  const columns = [
    { header: 'File No.', accessor: 'leadId' },
    { header: 'Client Name', accessor: 'clientName' },
    { header: 'CR Status', accessor: 'crStatus' },
    { header: 'Certification Type', accessor: 'certificationType' },
    { header: 'Standards', accessor: 'standards' },
    { header: 'Zone', accessor: 'zone' },
    { header: 'Questionnaire Received Date', accessor: 'questionnaireNo' },
    { header: 'certification Type', accessor: 'certificationType' },
    { header: 'CR Approved Date', accessor: 'crApprovedDate' },
    { header: 'CR Prepared By', accessor: 'crPreparedBy' },
    { header: 'CR Approved By', accessor: 'crApprovedBy' },
    { header: 'Quotation Submission Date', accessor: 'quotationSubmissionDate' },
    { header: 'Order Received Date', accessor: 'orderReceivedDate' },
    { header: 'CR Modified By', accessor: 'crModifiedBy' },
  ];
  
    const [leadData, setLeadData] = useState([]);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(leadData);


    const fetchQuest=async ()=>{
      try{
        const response = await axios.get("http://localhost:8000/api/contract/gets")
        console.log(response.data)
        setLeadData(response.data);
        setFilteredData(response.data)
      }catch(err){
        console.error('Error fetching lead data:', err);
      }

    }

    useEffect(()=>{
      fetchQuest();
    },[])
  
    const handleSearch = () => {
      if (searchTerm.trim() === '') {
        setFilteredData(leadData);
      } else {
        const filtered = leadData.filter(item =>
          item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(filtered);
      }
    };
  
    const handleInputChange = (e) => {
      setSearchTerm(e.target.value);
      if (e.target.value.trim() === '') {
        setFilteredData(leadData);
      }
    };
  
    const handleDelete =async (index) => {
      await axios.delete(`http://localhost:8000/api/contract/delete/${index}`)
      const newData = leadData.filter((contract) => contract.id !== index);
      console.log(newData)
      setLeadData(newData);
      setFilteredData(newData); // Update filtered data if search is active
    };
    const handleRoute=()=>{
        navigate("/business/contract/create")
    }
  
    return (
      <>
        {/* <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Contract View
          </h2>
        </div> */}
        <HeaderWithButton
          title="Contract View"
          buttonLabel="Create New Contract"
          onButtonClick={handleRoute}

        />
        <div className="container mt-4">
          <div className="d-flex mb-3">
            <FormControl
              placeholder="Search by Name"
              className="p-3 me-2 flex-grow-1"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <Button variant="outline-secondary" onClick={handleSearch}>Search</Button>
          </div>
          <TableComponent data={filteredData} columns={columns} onDelete={handleDelete} type="contract"/>
        </div>
      </>
    );
  }
  
  export default Contract;