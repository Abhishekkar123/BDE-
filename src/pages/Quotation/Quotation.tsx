import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import TableComponent from '../../components/Tables/TableTwo';
import { useState } from 'react';
import HeaderWithButton from '../../components/Header/HeaderWithButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
function Contract() {

  const navigate=useNavigate();
  const columns = [
    { header: 'File No.', accessor: 'quotationNo' },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Any Discount', accessor: 'isDiscountGiven' },
    { header: 'Discount', accessor: 'discount' },
    { header: 'Quotation Status', accessor: 'quotationStatus' },
    { header: 'Final Quotation Amount', accessor: 'finalQuotationAmount' },
    { header: 'Standards', accessor: 'standards' },
    { header: 'Certificate Type', accessor: 'certificationType' },
    { header: 'Zone', accessor: 'zone' },
    { header: 'First Year Value', accessor: 'firstYearValue' },
    { header: 'Questionnaire Received Date', accessor: 'questionnaireReceivedDate' },
    { header: 'Contract Review Approval Date', accessor: 'contractReviewApprovalDate' },
  ];

  const [leadData, setLeadData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(leadData);
const fetchQuot=async()=>{
  try{
    const response = await axios.get("http://localhost:8000/api/quotation/get")
    console.log(response.data)
    setLeadData(response.data);
    setFilteredData(response.data)
  }catch(err){
    console.error('Error fetching lead data:', err);
  }


}
useEffect(()=>{
  fetchQuot();
},[])



  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      setFilteredData(leadData);
    } else {
      const filtered = leadData.filter(item =>
        item.client.toLowerCase().includes(searchTerm.toLowerCase())
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

  const handleDelete = async(index) => {
    await axios.delete(`http://localhost:8000/api/quotation/quotations/${index}`)
    const newData = leadData.filter((quot) =>quot.id !== index);
    console.log(newData);
    setLeadData(newData);
    setFilteredData(newData); // Update filtered data if search is active
  };
  const handleRoute=()=>{
    // console.log("Quotation")
    navigate("/business/quotation/form")


  }

  return (
    <>
      <HeaderWithButton
      title="Quotation"
      buttonLabel="Create New Quotation"
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
        <TableComponent data={filteredData} columns={columns} onDelete={handleDelete} type="quotation" />
      </div>
    </>
  );
}

export default Contract;

