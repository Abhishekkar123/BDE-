import React, { useState,useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useLocation } from 'react-router-dom';

function CreateContract() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state?.leadId;
  console.log(id)
  
  // State to manage form data
  const [formData, setFormData] = useState({
    leadId:'',
    clientName: '',
    questionnaireNumber: '',
    certificationType: '',
    contractReviewType: '',
    surveillanceType: '',
    zone: '',
    businessActivity: '',
    requestedScope: '',
    certificationAudit: '',
    surveillanceAudit1: '',
    surveillanceAudit2: '',
    consultants: '',
    topMgtBoardDetails: '',
    trainingInfluenceDetails: '',
    consultantDetailsConfirmationText: '',
    conflictReviewDetails: '',
    certificationAccepted: '',
    conclusionVerification: '',
    significantChanges: '',
    externalSources: '',
    comments: '',
  });
  formData.leadId=id

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const [zone,setZone]=useState([]);
  const [surv,setSurv]=useState([]);
  const [cert,setCert]=useState([]);
  const [contract,setContract]=useState([]);



  useEffect(()=>{
     const fetchdata=async ()=>{
 
        //zonal data
        const resp1=await axios.get('http://localhost:8000/api/questionnaire/zone')
        // console.log('resp',resp1.data.data)
        setZone(resp1.data.data)
        //survillence data
        const resp2=await axios.get('http://localhost:8000/api/questionnaire/surveillance');
        // console.log('resp',resp2.data.data);
        setSurv(resp2.data.data)
        //certification data
        const resp3=await axios.get('http://localhost:8000/api/questionnaire/certification');
          
         setCert(resp3.data.data)

         const resp4=await axios.get('http://localhost:8000/api/questionnaire/contractreview');
         console.log(resp4.data.data)
         setContract(resp4.data.data)
     };
     fetchdata();

  },[])



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit={
        leadId:Number(formData.leadId),
        clientName:formData.clientName,
        questionnaireNo:formData.questionnaireNumber,
        certificationType:formData.certificationType,
        surveillanceType:formData.surveillanceType,
        contractRevewType:formData.contractReviewType,
        zone:formData.zone,
        businessActivity:formData.businessActivity,
        requestedScope:formData.requestedScope,
        certificationAudit:formData.certificationAudit,
        certificationAudit1:formData.surveillanceAudit1,
        certificationAudit2:formData.surveillanceAudit2,
        consultant:formData.consultants,
        organizations:formData.topMgtBoardDetails,
        influence:formData.trainingInfluenceDetails,
        nameOfConsultant:formData.consultantDetailsConfirmationText,
        reviewOfConflict:formData.conflictReviewDetails,
        certificationAccepted:Number(formData.certificationAccepted),
        conclusion:formData.conclusionVerification,
        significantChanges:formData.significantChanges,
        externalSources:formData.externalSources,
        comment:formData.comments
      }
      await axios.post('http://localhost:8000/api/contract/create', dataToSubmit); // Adjust the URL based on your backend route
      // console.log('Contract created:', response.data);
      navigate("/business/contract")
      // Optionally, reset form or redirect
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  // Handle route navigation
  const handleRoute = () => {
    navigate("/business/contract");
  };

  const handleRoute1=()=>{
    navigate("/business/contract/review")
  }

  return (
    <Container >
      {/* Header */}
      <h2 className="mb-4 p-4 text-black font-bold" style={{ fontSize: '2rem' }} >
        Contract Review Details
      </h2>

      {/* General Information Section */}
      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5 mb-2'>General Information</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="clientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="IRQS"
                name="clientName"
                value={formData.clientName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="questionnaireNumber">
              <Form.Label>Associated Questionnaire Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="IRQS\QU-000070"
                name="questionnaireNumber"
                value={formData.questionnaireNumber}
                onChange={handleChange}
              
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="leadId">
              <Form.Label>Lead ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lead ID"
                name="leadId"
                value={formData.leadId}
                onChange={handleChange}
                
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Certification Information Section */}
      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5 mb-2'>Certification Information</h5>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="certificationType">
              <Form.Label>Certification Type</Form.Label>
              <Form.Control
                as="select"
                name="certificationType"
                value={formData.certificationType}
                onChange={handleChange}
              >
                <option value="" disabled>Please select</option>
                {cert.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractReviewType">
            <Form.Label>Contract Type</Form.Label>
              <Form.Control
                as="select"
                name="contractReviewType"
                value={formData.contractReviewType}
                onChange={handleChange}
              >
                <option value="" disabled>Please select</option>
                {contract.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control>
              
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="surveillanceType">
              <Form.Label>Surveillance Type</Form.Label>
              <Form.Control
                as="select"
                name="surveillanceType"
                value={formData.surveillanceType}
                onChange={handleChange}
              >
               <option value="" disabled>Please select</option>
                  {surv.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="zone">
              <Form.Label>Zone</Form.Label>
              <Form.Control
                as="select"
                name="zone"
                value={formData.zone}
                onChange={handleChange}
              >
                 <option value="" disabled>Select a Zone</option>
                  {zone.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="businessActivity">
              <Form.Label>Business Activity</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="businessActivity"
                value={formData.businessActivity}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="requestedScope">
              <Form.Label>Requested Scope</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="requestedScope"
                value={formData.requestedScope}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Multisite Information Section */}
      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5 mb-2'>Multisite Information</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="certificationAudit">
              <Form.Label>Certification Audit</Form.Label>
              <Form.Control
                as="select"
                name="certificationAudit"
                value={formData.certificationAudit}
                onChange={handleChange}
              >
                <option value="option1">Option 1</option>
                <option value="IRS">IRS</option>
                <option value="IRCLASS">IRCLASS</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="surveillanceAudit1">
              <Form.Label>Surveillance Audit 1</Form.Label>
              <Form.Control
                as="select"
                name="surveillanceAudit1"
                value={formData.surveillanceAudit1}
                onChange={handleChange}
              >
                <option value="option1">Option 1</option>
                <option value="IRS">IRS</option>
                <option value="IRCLASS">IRCLASS</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="surveillanceAudit2">
              <Form.Label>Surveillance Audit 2</Form.Label>
              <Form.Control
                as="select"
                name="surveillanceAudit2"
                value={formData.surveillanceAudit2}
                onChange={handleChange}
              >
                <option value="option1">Option 1</option>
                <option value="IRS">IRS</option>
                <option value="IRCLASS">IRCLASS</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Standards wise Information Section */}
      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5 mb-2'>Standards wise Information</h5>
        <Button className="mb-3" style={{ background: '#152238' }}>Refresh</Button>
        <Table bordered>
          <thead>
            <tr>
              <th>Standard</th>
              <th>Accreditation Provided</th>
              <th>Total Stage1 OnSite Mandays</th>
              <th>Total Stage2 OnSite Mandays</th>
              <th>Sur.1 OnSite Mandays</th>
              <th>Sur.2 OnSite Mandays</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Button style={{ background: '#152238' }} onClick={handleRoute1}>IATF</Button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5 mb-2'>Impartiality Assessments</h5>
        <p>(Please fill below mandatory information)</p>
        <Table bordered>
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Value</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Consultant to the firm</td>
              <td>
                <Form.Control
                  as="select"
                  name="consultant"
                  // value={formData.consultant}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="consultants"
                  value={formData.consultants}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Organization’s Top Mgt part of IRS board</td>
              <td>
                <Form.Control
                  as="select"
                  name="topMgtBoard"
                  // value={formData.topMgtBoard}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="topMgtBoardDetails"
                  value={formData.topMgtBoardDetails}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Influence through any training provided</td>
              <td>
                <Form.Control
                  as="select"
                  name="trainingInfluence"
                  // value={formData.trainingInfluence}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="trainingInfluenceDetails"
                  value={formData.trainingInfluenceDetails}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Name and details of the consultant to be confirmed</td>
              <td>
                <Form.Control
                  as="select"
                  name="consultantDetailsConfirmation"
                  // value={formData.consultantDetailsConfirmation}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="consultantDetailsConfirmationText"
                  value={formData.consultantDetailsConfirmationText}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Review on Conflict of Interest</td>
              <td>
                <Form.Control
                  as="select"
                  name="conflictReview"
                  // value={formData.conflictReview}
                  onChange={handleChange}
                >
                  <option>Select</option>
                  <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="conflictReviewDetails"
                  value={formData.conflictReviewDetails}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Audit Performance Review Section */}
      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5'>Audit Performance Review</h5>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Whether application for certification accepted?</Form.Label>
            <div>
              <Form.Check
                inline
                label="yes"
                type="radio"
                name="certificationAccepted"
                value='true'
                checked={formData.certificationAccepted === 'true'}
                onChange={handleChange}
              />
              <Form.Check
                inline
                label="No"
                type="radio"
                name="certificationAccepted"
                value='false'
                checked={formData.certificationAccepted === 'false'}
                onChange={handleChange}
              />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Verification Of conclusion made by Team Leader of Last Surveillance Audit</Form.Label>
            <Form.Control
              type="text"
              name="conclusionVerification"
              value={formData.conclusionVerification}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Any significant changes in the management system/Operation/Production Line/Location of Last Audit</Form.Label>
            <Form.Control
              type="text"
              name="significantChanges"
              value={formData.significantChanges}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>The Information from "External Sources" (public Information) if any</Form.Label>
            <Form.Control
              type="text"
              name="externalSources"
              value={formData.externalSources}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comments / Remarks if any</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
            />
          </Form.Group>
          <Button type="submit" style={{ background: '#152238' }}>Update</Button>
        </Form>
      </div>

      {/* Save and Close Buttons */}
      <div className="text-end p-4">
        <Button className="me-2 border-black" onClick={handleRoute}>Close</Button>
        <Button style={{ background: "#152238" }} onClick={handleSubmit}>Save Changes</Button>
      </div>
    </Container>
  );
}

export default CreateContract;
