import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Row, Col, Button } from 'react-bootstrap';

const EditLeadTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  
  const [lead, setLead] = useState({
    leadTypeId: '',
    leadStatusId: '',
    sourceOfLeadId: '',
    requirementFor: '',
    leadQualification: '',
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    mobile: '',
    email: '',
    password: '',
    designation: '',
    country: '',
    State: '',
    city: '',
    remarks: '',
    assignTo: ''
  });

  const [leadStatusOptions, setLeadStatusOptions] = useState([]);
  const [leadTypeOptions, setLeadTypeOptions] = useState([]);
  const [sourceOfLeadOptions, setSourceOfLeadOptions] = useState([]);
  const [qualify,setQualify]=useState([]);
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/lead/seed-lead');
        const resp= await axios.get("http://localhost:8000/api/lead/qualify");
        console.log("resp",resp.data.data.qualify)
        setQualify(resp.data.data.qualify);
        setLeadStatusOptions(response.data.data.leadStatuses);
        setLeadTypeOptions(response.data.data.leadTypes);
        setSourceOfLeadOptions(response.data.data.sourceOfLeads);

        const usersResponse = await axios.get('http://localhost:8000/users');
        setUsers(usersResponse.data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/lead/leads/${id}`);
        console.log( response.data.lead)
        const leadData = response.data.lead;
        setLead({
          leadTypeId: leadData.leadTypeId,
          leadStatusId: leadData.leadStatusId,
          sourceOfLeadId: leadData.sourceOfLeadId,
          requirementFor: leadData.requirementFor,
          leadQualification: leadData.leadQualification,
          companyName: leadData.companyName,
          firstName: leadData.firstName,
          lastName: leadData.lastName,
          phone: leadData.phone,
          mobile: leadData.mobile,
          email: leadData.email,
          password: leadData.password,
          designation: leadData.designation,
          country: leadData.country,
          State: leadData.State,
          city: leadData.city,
          remarks: leadData.remarks,
          assignTo: leadData.assignTo
        });
      } catch (error) {
        console.error('Failed to fetch lead data.', error);
      }
    };
    fetchLead();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLead({
      ...lead,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const formData = new FormData();
    // Object.keys(lead).forEach(key => {
    //   formData.append(key, lead[key]);
    // });

    try {
      await axios.put(`http://localhost:8000/api/lead/leads/${id}`,lead);
      navigate('/business/lead'); // Redirect to the leads list or another appropriate page
    } catch (error) {
      console.error('Failed to update lead data.', error);
    }
  };

  return (
    <>
       <div className='mb-4'>
                <h4 className='text-black font-semibold' style={{ fontSize: '30px' }}>View/Edit Lead</h4>
            </div>
            <Form onSubmit={handleSubmit} className='text-black'>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="companyName">
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="companyName"
                                value={lead.companyName}
                                onChange={handleChange}
                                placeholder="Enter Company Name"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="sourceOfLeadId">
                            <Form.Label>Source Of Lead</Form.Label>
                            <Form.Select
                                name="sourceOfLeadId"
                                value={lead.sourceOfLeadId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Source Of Lead</option>
                                {sourceOfLeadOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="leadTypeId">
                            <Form.Label>Lead Type</Form.Label>
                            <Form.Select
                                name="leadTypeId"
                                value={lead.leadTypeId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Lead Type</option>
                                {leadTypeOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="leadStatusId">
                            <Form.Label>Lead Status</Form.Label>
                            <Form.Select
                                name="leadStatusId"
                                value={lead.leadStatusId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Lead Status</option>
                                {leadStatusOptions.map(option => (
                                    <option key={option.id} value={option.id}>{option.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="remarks">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                type="text"
                                name="remarks"
                                value={lead.remarks}
                                onChange={handleChange}
                                placeholder="Enter Remarks"
                                required
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="remarks">
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control
                                type="text"
                                name="remarks"
                                value={lead.requirementFor}
                                onChange={handleChange}
                                placeholder="Enter Remarks"
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="assignTo">
                            <Form.Label>Assign To</Form.Label>
                            <Form.Select
                                name="assignTo"
                                value={lead.assignTo}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select User</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="leadQualification">
                            <Form.Label>Lead Qualification</Form.Label>
                            <Form.Select
                                name="leadQualification"
                                value={lead.leadQualification}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select qualify</option>
                                {qualify.map(status => (
                    <option key={status.name} value={status.name}>{status.name}</option>
                  ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
                <Button className='bg-black mt-4' type="submit">Save Changes</Button>
            </Form>
        </>
  );
};

export default EditLeadTable;
