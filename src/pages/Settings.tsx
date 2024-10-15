//import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import userThree from '../images/user/user-03.png';
import { Button } from 'react-bootstrap';
import PopupForm from './Modal/Poper';
import { useEffect, useState } from 'react';
import TableComponent from '../components/Tables/TableTwo';
import axios from 'axios';
const Settings = () => {

  const [isPopup, setIsPopup] = useState(false);
  const show=()=>{
    setIsPopup(true)

  }

  const hide=()=>{
    setIsPopup(false)

  }

  const columns = [
    { header: 'File No.', accessor: 'fileNo' },
    { header: 'Client', accessor: 'clientName' },
    { header: 'Any Discount', accessor: 'anyDiscount' },
    { header: 'Discount', accessor: 'discount' },
    { header: 'Quotation Status', accessor: 'quotationStatus' },
    { header: 'Final Quotation Amount', accessor: 'finalQuotationAmount' },
    { header: 'Standards', accessor: 'standards' },
    { header: 'Certificate Type', accessor: 'certificationType' },
    { header: 'Zone', accessor: 'zone' },
    { header: 'First Year Value', accessor: 'firstYearValue' },
    { header: 'Questionnaire Received Date', accessor: 'readinessDate' },
    { header: 'Contract Review Approval Date', accessor: 'contractReviewApprovalDate' },
  ];

    const [leadData, setLeadData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredData, setFilteredData] = useState(leadData);
  const fetchQuest = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/questionnaire/get");
     console.log(response.data)

      setLeadData(response.data);
      setFilteredData(response.data); // Initialize filteredData with fetched data
    } catch (error) {
      console.error('Error fetching lead data:', error);
    }
  };

  useEffect(() => {
    
    console.log("questionnaire")
    fetchQuest();
  }, []);

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
    await axios.delete(`http://localhost:8000/api/questionnaire/delete/${index}`)
    const newData = leadData.filter((quest) => quest.id !== index);
    console.log(newData);
    setLeadData(newData);
    setFilteredData(newData); // Update filtered data if search is active
  };
  return (
    <>
      <div className="mx-auto max-w-270">
        {/* <Breadcrumb pageName="Settings" /> */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Tables
        </h2>
     

        <nav>
          <div className="flex items-center gap-2">
          <Button className="bg-black text-white p-3 dark:bg-white dark:text-black" onClick={show}>
            questionnaire
          </Button>
          </div>
        </nav>
          </div>

       {isPopup &&   <PopupForm onClose={hide} onSuccess={fetchQuest}/>}

      </div>
 <TableComponent data={filteredData} columns={columns} onDelete={handleDelete}  type="questionnaire"/>
     
    </>
  );
};

export default Settings;
