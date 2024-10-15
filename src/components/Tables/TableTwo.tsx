import { BsThreeDotsVertical } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './table.css'; // Import the CSS file for additional styles
import { Table, Dropdown, Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';


const TableComponent = ({ data, columns, onDelete, type }) => {
    const navigate = useNavigate();
    const [permissions, setPermissions] = useState([]);
    const [leadStatuses, setLeadStatuses] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [tableData, setTableData] = useState(data);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [leading,setLeading]=useState('');
    const [form,setForm]=useState([]);
    // console.log("started",tableData)
    useEffect(() => {
        const fetchLeadStatuses = async () => {
            try {
                const resp = await axios.get("http://localhost:8000/api/lead/seed-lead");
                setLeadStatuses(resp.data.data.leadStatuses);
            } catch (error) {
                console.error('Error fetching lead statuses:', error);
            }
        };

        fetchLeadStatuses();
    }, []);
    useEffect(()=>{
      setTableData(data)
    },[data])

    // useEffect(() => {
    //     const fetchTableData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:8000/api/lead/leads');
    //             // console.log(response.data.leads)
    //             setTableData(response.data.leads);
    //             // setLeading(response.data.leads)
    //         } catch (error) {
    //             console.error('Error fetching table data:', error);
    //         }
    //     };

    //     fetchTableData();

    //     const intervalId = setInterval(fetchTableData, 1000); // Update every 10 seconds

        
    //     return () => clearInterval(intervalId);
    // }, [ ]);
    // console.log("midd",tableData)

    const refreshData = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/lead/leads');
            console.log("Data refreshed successfully:", response.data.leads);
            setTableData(response.data.leads);
        } catch (error) {
            console.error('Error refreshing table data:', error);
        }
    };
//   console.log("2 midd" ,tableData)
    const handleDelete = (id) => {
        onDelete(id);
    };

    const handleEdit = (id) => {
        navigate(`/${type}/edit-user/${id}`);
    };

    const handleViewDetails = (id) => {
        navigate(`/${type}/detail/${id}`);
    };

    const getForm=async()=>{
        try{
           const resp=await axios.get("http://localhost:8000/api/leadForms/forms")
          console.log("foem",resp.data.data)
          setForm(resp.data.data)

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        getForm();
    },[])

    useEffect(() => {
        const storedPermissions = localStorage.getItem('permission');
        if (storedPermissions) {
            setPermissions(JSON.parse(storedPermissions));
        }
    }, []);

    const handleStatusChange = async (leadId, statusId) => {
        try {
            const resp = await axios.get(`http://localhost:8000/api/lead/leads/${leadId}`);
            // console.log("resp wala",resp.data.lead.id)
            setLeading(resp.data.lead.id)
            await axios.put(`http://localhost:8000/api/lead/leads/${leadId}`, {
                ...resp.data.lead,
                leadStatusId: statusId
            });

            // Show popup if statusId is "2" or 2
            if (statusId === '2' || statusId === 2) {
                setShowPopup(true);
                localStorage.setItem('showPopup', JSON.stringify(true));
            }

            refreshData();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };
    // console.log("end",tableData)

    const canMenu = permissions[0]?.lead?.menu;
    const canEdit = permissions[0]?.lead?.update;
    const canDelete = permissions[0]?.lead?.delete;
    const canView = permissions[0]?.lead?.view;

    const handlePopupSubmit = async () => {
        try {
            const abc=await axios.post('http://localhost:8000/api/leadForms/', {leadId: leading, email,form: selectedOption });
           console.log("abc",abc)
            setShowPopup(false);
            setEmail('');
            setPassword('');
            refreshData();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='table-wrapper'>
            <div className="table-container">
                <Table striped bordered hover className="custom-table">
                    <thead>
                        <tr>
                            {columns.map((col, index) => (
                                <th key={index}>{col.header}</th>
                            ))}
                            {canMenu && <th>Action</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((item) => (
                            <tr key={item.id} className="table-row">
                                {columns.map((col, index) => (
                                    <td key={index}>
                                        {col.accessor === 'LeadStatus.name' ? (
                                            <Dropdown onSelect={(statusId) => handleStatusChange(item.id, statusId)}>
                                                <Dropdown.Toggle variant="light">
                                                    {item.LeadStatus?.name || 'Select Status'}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    {leadStatuses.map(status => (
                                                        <Dropdown.Item key={status.id} eventKey={status.id.toString()}>
                                                            {status.name}
                                                        </Dropdown.Item>
                                                    ))}
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        ) : col.accessor.includes('.')
                                            ? col.accessor.split('.').reduce((o, i) => o?.[i] || 'N/A', item)
                                            : item[col.accessor] || 'N/A'}
                                    </td>
                                ))}
                                {canMenu && (
                                    <td className='action-container'>
                                        <Dropdown>
                                            <Dropdown.Toggle as="div" className="dropdown-toggle-custom">
                                                <BsThreeDotsVertical />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-custom">
                                                {canEdit && <Dropdown.Item onClick={() => handleEdit(item.id)}>Edit</Dropdown.Item>}
                                                {canDelete && <Dropdown.Item onClick={() => handleDelete(item.id)}>Delete</Dropdown.Item>}
                                                {canView && <Dropdown.Item onClick={() => handleViewDetails(item.id)}>View Details</Dropdown.Item>}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {showPopup && (
                <Modal show={showPopup} onHide={() => setShowPopup(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Application Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            {/* <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group> */}
                            <Form.Group controlId="formDropdown" className="mt-3">
                                <Form.Label>Form file</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    {form.map(status => (
                                        <option key={status.id} value={status.name}>
                                            {status.name}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button  className='bg-danger' onClick={() => setShowPopup(false)}>Close</Button>
                        <Button style={{background:'#152238'}} onClick={handlePopupSubmit}>Submit</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default TableComponent;
