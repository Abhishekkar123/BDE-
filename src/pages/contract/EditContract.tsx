import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
function EditContract() {

  const {id }=useParams();
  const navigate=useNavigate()
  const handleRoute=()=>{
    navigate("/business/contract")
  }


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
  const [formData,setFormData]=useState({
    
        clientName:'',
        questionnaireNo:'',
        certificationType:'',
        surveillanceType:'',
        contractRevewType:'',
        zone:'',
        businessActivity:'',
        requestedScope:'',
        certificationAudit:'',
        certificationAudit1:'',
        certificationAudit2:'',
        consultant:'',
        organizations:'',
        influence:'',
        nameOfConsultant:'',
        reviewOfConflict:'',
        certificationAccepted:'',
        conclusion:'',
        significantChanges:'',
        externalSources:'',
        comment:''
  })
 

  useEffect(()=>{
    const getData=async()=>{
      try{
      const resp=await axios.get(`http://localhost:8000/api/contract/get/${id}`)
      console.log(resp.data)
      setFormData(resp.data)
      }catch(err){
        console.log('Error Fetching Data',err)
      }
      
    };
    getData();
  },[])


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };


  const handleSubmit=async(e)=>{
    e.preventDefault();

    try{
      
      await axios.put(`http://localhost:8000/api/contract/update/${id}`, formData);
      navigate('/business/contract')

    }catch(err){
      console.log('failed to update ',err)
    }


  }



  return (
    <div className="mt-4 ">
      {/* Header */}
      <h2 className="mb-4 p-4" style={{ backgroundColor: '#152238', color: 'white' }}>
        Contract Review Details
      </h2>

      {/* General Information Section */}
      <div className="p-3 mb-4" >
        <h5 className='text-black font-semibold fs-5 mb-2'>General Information</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="clientName">
              <Form.Label>Client Name</Form.Label>
              <Form.Control type="text" placeholder="IRQS"  value={formData.clientName}
                onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="questionnaireNumber">
              <Form.Label>Associated Questionnaire Number</Form.Label>
              <Form.Control type="text" placeholder="IRQS\QU-000070" value={formData.questionnaireNo}
                onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Certification Information Section */}
      <div className="p-3 mb-4" >
        <h5 className='text-black font-semibold fs-5 mb-2'>Certification Information</h5>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="certificationType">
              <Form.Label>Certification type </Form.Label>
              <Form.Control as="select" name="certificationType" value={formData.certificationType}
                onChange={handleChange}>
               <option value="" disabled>Please select</option>
                {cert.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="contractRevewType">
              <Form.Label>Contract Review Type</Form.Label>
              <Form.Control as="select"
                name="contractRevewType" value={formData.contractRevewType}
                onChange={handleChange} >
                   <option value="" disabled>Please select</option>
                {contract.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control> 

            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="surveillanceType">
              <Form.Label>Surveillance Type </Form.Label>
              <Form.Control as="select" name="surveillanceType"  value={formData.surveillanceType}
                onChange={handleChange}>
                 <option value="" disabled>Please select</option>
                  {surv.map(src => (
                    <option key={src.name} value={src.name}>{src.name}</option>
                  ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="zone">
              <Form.Label>Zone </Form.Label>
              <Form.Control as="select"  name="zone"value={formData.zone}
                onChange={handleChange}>
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
              <Form.Label>Business Activity </Form.Label>
              <Form.Control as="textarea" rows={2}  name="businessActivity"
                value={formData.businessActivity}
                onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="requestedScope">
              <Form.Label>Requested Scope</Form.Label>
              <Form.Control as="textarea" rows={2}  name="requestedScope" value={formData.requestedScope}
                onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Multisite Information Section */}
      <div className="p-3 mb-4" >
        <h5 className='text-black font-semibold fs-5 mb-2'>Multisite Information</h5>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="certificationAudit">
              <Form.Label>Certification Audit</Form.Label>
              <Form.Control as="select"   name="certificationAudit"
                value={formData.certificationAudit}
                onChange={handleChange}> 
                <option value="option1">Option 1</option>
                <option value="IRS">IRS</option>
                <option value="IRCLASS">IRCLASS</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="certificationAudit1">
              <Form.Label>Surveillance Audit 1</Form.Label>
              <Form.Control as="select"  name="certificationAudit1"
                value={formData.certificationAudit1}
                onChange={handleChange}>
               <option value="option1">Option 1</option>
                <option value="IRS">IRS</option>
                <option value="IRCLASS">IRCLASS</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="certificationAudit2">
              <Form.Label>Surveillance Audit 2</Form.Label>
              <Form.Control as="select"  name="certificationAudit2"
                value={formData.certificationAudit2}
                onChange={handleChange}>
                 <option value="option1">Option 1</option>
                <option value="IRS">IRS</option>
                <option value="IRCLASS">IRCLASS</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Standards wise Information Section */}
      <div className="p-3 mb-4" >
        <h5 className='text-black font-semibold fs-5 mb-2'>Standards wise Information</h5>
        <Button  className="mb-3 " style={{background:'#152238'}}>Refresh</Button>
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
                <Button style={{background:'#152238'}}>BRC FOOD</Button>
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
                <Form.Control as="select">
                  <option>Select</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control type="text" name="consultant"
                  value={formData.consultant}
                  onChange={handleChange} />
              </td>
            </tr>
            <tr>
              <td>Organization’s Top Mgt part of IRS board</td>
              <td>
                <Form.Control as="select">
                  <option>Select</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control type="text"   name="organizations"
                  value={formData.organizations}
                  onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>Influence through any training provided</td>
              <td>
                <Form.Control as="select">
                  <option>Select</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control type="text"  name="influence"
                  value={formData.influence}
                  onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>Name and details of the consultant to be confirmed</td>
              <td>
                <Form.Control as="select">
                  <option>Select</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control type="text"  name="nameOfConsultant"
                  value={formData.nameOfConsultant}
                  onChange={handleChange}/>
              </td>
            </tr>
            <tr>
              <td>Review on Conflict of Interest</td>
              <td>
                <Form.Control as="select">
                  <option>Select</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control type="text"  name="reviewOfConflict"
                  value={formData.reviewOfConflict}
                  onChange={handleChange} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* Audit Performance Review Section */}
      <div className="p-3 mb-4">
        <h5 className='text-black font-semibold fs-5'>Audit Performance Review</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Whether application for certification accepted?</Form.Label>
            <div>
              <Form.Check inline label="Yes" type="radio" name="certification" />
              <Form.Check inline label="No" type="radio" name="certification" />
            </div>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Verification Of conclusion made by Team Leader of Last Surveillance Audit</Form.Label>
            <Form.Control type="text"  name="conclusion"
              value={formData.conclusion}
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Any significant changes in the management system/Operation/Production Line/Location of Last Audit</Form.Label>
            <Form.Control type="text"   name="significantChanges"
              value={formData.significantChanges}
              onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>The Information from "External Sources" (public Information) if any</Form.Label>
            <Form.Control type="text"  name="externalSources"
              value={formData.externalSources}
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Comments / Remarks if any</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Comments"   name="comment"
              value={formData.comment}
              onChange={handleChange} />
          </Form.Group>
{/* <Button type="submit" style={{background:'#152238'}}>Update</Button> */}
        </Form>
      </div>


      {/* Save and Close Buttons */}
      <div className="text-end p-4">
        <Button  className="me-2 border-black  text-black" onClick={handleRoute} >Close</Button>
        <Button style={{background:"#152238"}} onClick={handleSubmit}>Save changes</Button>
      </div>
    </div>
  );
}

export default EditContract;
