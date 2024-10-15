// import { Table, Dropdown } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import HeaderWithButton from '../../components/Header/HeaderWithButton';
import LeadFormPopup from '../Modal/LeadPop';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import './lead.css'
import TableComponent from '../../components/Tables/TableTwo';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Lead() {
    const [showPopup, setShowPopup] = useState(false);
    const navigate=useNavigate();
   
    const handleOpenPopup = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const [leadData, setLeadData] = useState([]);

  
    const columns = [
      { header: 'Lead Ref No.', accessor: 'leadReferenceNumber' }, // Example accessor, adjust based on your actual date
      {header:'Requirement For',accessor:'requirementFor'},
      { header: 'Company Name', accessor: 'companyName' },
      { header: 'Source Of Lead', accessor: 'SourceOFLead.name' }, // Accessing nested property
      { header: 'Lead Type', accessor: 'LeadType.name' }, // Accessing nested property
      { header: 'Lead Status', accessor: 'LeadStatus.name' }, // Accessing nested property
      // { header: 'Followup Reminder Date', accessor: 'followUp' },
      {header:'Designation',accessor:'designation'},
      {header:'Email',accessor:'email'},
      {header:'Country',accessor:'country'},
      {header:'State',accessor:'state'},
      {header:'City',accessor:'city'},
      { header: 'BD Executive Name', accessor: 'User.firstName' },
      {header:'Zone',accessor:'zone'},
      { header: 'Created Date', accessor: 'createdAt' },
      { header: 'Modified Date', accessor: 'updatedAt' }
  ];
  
      const [searchTerm, setSearchTerm] = useState('');
      const [filteredData, setFilteredData] = useState(leadData);
      const userRole = localStorage.getItem('role'); // 'admin' or 'bde'
      const userId = localStorage.getItem('id');
      const fetchLeads = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/lead/leads');
            console.log(response)
            const leads = response.data.leads;
            if (userRole === 'Administrator') {
              setLeadData(leads);
              setFilteredData(leads);
              console.log(leads)
          } else if (userRole === 'Business Development Executive') {
              // Filter leads where assignTo matches the user's ID
              const filteredLeads = leads.filter(lead => lead.User.id === parseInt(userId));
              setLeadData(filteredLeads);
              setFilteredData(filteredLeads);
              console.log(leads)
          }
            
            // setLeadData(response.data.leads);
            // setFilteredData(response.data.leads);
            // console.log(response.data.leads)
        } catch (error) {
            console.error('Error fetching lead data:', error);
        }
    };
      useEffect(() => {
        console.log("lead useEffect")
        fetchLeads();
    }, []);
      const handleSearch = () => {
        if (searchTerm.trim() === '') {
          setFilteredData(leadData);
        } else {
          const filtered = leadData.filter(item =>
            item.companyName.toLowerCase().includes(searchTerm.toLowerCase())
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
      const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/lead/leads/${id}`);
            const newData = leadData.filter((lead) => lead.id !== id);
            setLeadData(newData);
            setFilteredData(newData);
        } catch (error) {
            console.error('Error deleting lead:', error);
        }
    };

    const handleHistoryClick = () => {
       navigate("/detail")

  };

       

    return (
        <>
            <HeaderWithButton  
                title="Active Enquiry Leads"
                buttonLabel="Create New Lead"
                onButtonClick={handleOpenPopup}
            />

            {showPopup && <LeadFormPopup onClose={handleClosePopup}  onSuccess={fetchLeads} />}
            {/* <Button className='bg-black' onClick={handleHistoryClick}>View Lead History</Button> */}
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
                <TableComponent data={filteredData}
                columns={columns} onDelete={handleDelete} type="lead"/>
            </div>
        </>
    );
}

export default Lead;
