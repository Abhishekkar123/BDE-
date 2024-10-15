import HeaderWithButton from '../components/Header/HeaderWithButton';
import Popup from './Modal/Popup';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import TableComponent from '../components/Tables/TableTwo';
const Profile = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const columns = [
    { header: 'Opportunity Title', accessor: 'opportunitytitle' },
    { header: 'Client Name', accessor: 'clientname' },
    { header: 'Associated Lead', accessor: 'associatedlead' },
    { header: 'Status', accessor: 'status' },
    { header: 'Esti. Quotation Amount', accessor: 'estiquotationamount' },
    { header: 'Created By', accessor: 'createdby' },
    { header: 'Created Date', accessor: 'createddate' },
    { header: 'Modified Date', accessor: 'modifieddate' }
  ];

  const [leadData,setLeadData] =useState([
    {
      opportunitytitle: 'abc',
      clientname: 'Tata',
      associatedlead: 'IRQSE/L-27',
      status: 'Won',
      estiquotationamount: '111111',
      createdby: 'Megha',
      createddate: '24/10/2017',
      modifieddate: '24/10/2017'
    },
    {
      opportunitytitle: 'kjhgf',
      clientname: 'eeeeeer3',
      associatedlead: 'IRQSE/L-4',
      status: 'Open',
      estiquotationamount: '4444444',
      createdby: 'Megha',
      createddate: '05/10/2017',
      modifieddate: '24/10/2017'
    },
    {
      opportunitytitle: 'EXTENDED TS',
      clientname: 'kalpataru india pvt ltd 4',
      associatedlead: 'IRQSE/L-23',
      status: 'Won',
      estiquotationamount: '55555555',
      createdby: 'Megha',
      createddate: '01/10/2017',
      modifieddate: '01/10/2017'
    },
    {
      opportunitytitle: 'extended',
      clientname: 'kalpataru india pvt ltd',
      associatedlead: 'IRQSE/L-15',
      status: 'Follow up',
      estiquotationamount: '140000',
      createdby: 'Megha',
      createddate: '01/10/2017',
      modifieddate: '01/10/2017'
    }
    // Add more rows as needed
  ]);


  const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(leadData);
  
    const handleSearch = () => {
      if (searchTerm.trim() === '') {
        setFilteredData(leadData);
      } else {
        const filtered = leadData.filter(item =>
          item.clientname.toLowerCase().includes(searchTerm.toLowerCase())
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
  
    const handleDelete = (index) => {
      const newData = leadData.filter((a, i) => i !== index);
      console.log(newData)
      setLeadData(newData);
      setFilteredData(newData); // Update filtered data if search is active
    };

  return (
    <>
    <HeaderWithButton
        title="Opportunities"
        buttonLabel="Create New Opportunities"
        onButtonClick={showPopup}
      />

{isPopupVisible && <Popup onClose={hidePopup} />}

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
                columns={columns} onDelete={handleDelete} type="profile"/>
            </div>

     
    </>
  );
};

export default Profile;
