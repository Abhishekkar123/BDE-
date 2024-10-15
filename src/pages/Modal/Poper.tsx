import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Form, Container } from 'react-bootstrap';
const PopupForm = ({ onClose ,onSuccess,index}) => {
  console.log(index)
  const [formData, setFormData] = useState({
    questionnaireNo: '',
    clientName: '',
    zone: '',
    certificationType: '',
    surveillanceType: '',
    readinessDate: '',
    selectSites: '',
    standard: '',
    selectedStandard: '',
    accreditation: '',
    selectedAccreditation: '',
    businessActivity: '',
    requestScope: '',
    additionalInformation: '',
    anyOtherServices: '',
    systemImplementationPeriod: '',
    irsServiceProvided: '',
    consultantName: '',
    otherConsultant: '',
    consultancyFirmName: '',
    faxNumber:'',
    contactNumber: '',
    email: '',
    managementOfChanges: '',
    supplierFor: '',
    desiredScopeOfCertification: '',
    productDesignResponsibility: '',
    qmsSingleManufacturingSite: '',
    qmsSingleExtendedSites: '',
    qmsCorporateScheme: '',
    leadId: ''
  });

  formData.leadId=index



  //zone
  const [zone,setZone]=useState([]);
  const [surv,setSurv]=useState([]);
  const [cert,setCert]=useState([]);



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
        //  console.log(resp3.data.data);
         setCert(resp3.data.data)
     };
     fetchdata();

  },[])
  const [select,setSelect]=useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        questionnaireNo: formData.questionnaireNo,
        clientName: formData.clientName,
        zone:(formData.zone),
        certificationType: (formData.certificationType),
        surveillanceType:(formData.surveillanceType),
        readinessDate: formData.readinessDate,
        // selectedSites: formData.selectSites,  // assuming this holds comma-separated site names
        leadId: Number(formData.leadId),  // convert leadId to number
      };
      // console.log('Data to submit:', dataToSubmit); 
     await axios.post('http://localhost:8000/api/questionnaire/create', dataToSubmit);
      // console.log('Form Data Submitted:', response.data);
      onSuccess();  
      onClose(); // Close the popup after successful submission
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
    
    // console.log('Form Data Submitted:', formData);
  };

  const handleFill=()=>{
    console.log("hello")
    setSelect(true)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white dark:bg-boxdark  w-full max-w-6xl relative overflow-auto" style={{ maxHeight: '90vh', height: '80%' }}>
        <div className="mb-4 flex justify-between items-center text-white p-4" style={{ backgroundColor: '#152238' }}>
          <div>
            <h1 className="text-2xl font-semibold">Questionnaire Information</h1>
            <h5>Selected Opportunity: STS MARINE PTE LTD QMS 2024</h5>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md hover:bg-white-700 transition-colors ml-auto"
          >
            X
          </button>
        </div>

        <div className="flex mt-6  text-black" style={{ padding: '0 30px' }}>
          {/* General Information */}
          <div className="w-1/10 flex-none flex flex-col pr-4 mb-4 ">
            <h2 className="text-lg font-semibold">General Information</h2>
            <div className="flex flex-col space-y-4 mt-2">
              <div>
                <label htmlFor="leadId" className="block text-sm font-medium text-gray-700">Lead ID</label>
                <input
                  id="leadId"
                  name="leadId"
                  value={formData.leadId}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                  placeholder="Enter Lead ID"
                />
              </div>
              <div>
                <label htmlFor="questionnaireNo" className="block text-sm font-medium text-gray-700">Questionnaire No</label>
                <input
                  id="questionnaireNo"
                  name="questionnaireNo"
                  value={formData.questionnaireNo}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="selectSite" className="block text-sm font-medium text-gray-700">Select sites</label>
                <select
                  id="selectSite"
                  name="selectedSites"
                  value={formData.selectSites}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                >
                  <option value="" disabled>Select a Site</option>
                  <option value="site1">Site 1</option>
                  <option value="site2">Site 2</option>
                  <option value="site3">Site 3</option>
                  <option value="site4">Site 4</option>
                </select>
              </div>
              {!select && <div className="mt-4">
                <button className="border-2 border-black px-4 py-2 rounded-md" onClick={handleFill}>
                  Proceed to Fill Std Info
                </button>
              </div>}
            </div>
          </div>

          {/* Certification Information */}
          <div className="w-9/10 flex flex-col ml-2">
            <h2 className="text-lg text-center font-semibold">Certification Information</h2>
            <div className="flex space-x-4 mt-2">
              <div className="flex-1">
                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
                <input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="zone" className="block text-sm font-medium text-gray-700">Zone</label>
                <select
                  id="zone"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 bg-white shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                >
                  <option value="" disabled>Select a Zone</option>
                  {zone.map(src => (
                    <option key={src.id} value={src.name}>{src.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label htmlFor="certificationType" className="block text-sm font-medium text-gray-700">Certification Type</label>
               
                <select
                  id="certificationType"
                  name="certificationType"
                  value={formData.certificationType}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                >
                <option value="" disabled>Please select</option>
                {cert.map(src => (
                    <option key={src.id} value={src.name}>{src.name}</option>
                  ))}

                  </select>
              </div>
              <div className="flex-1">
                <label htmlFor="surveillanceType" className="block text-sm font-medium text-gray-700">Surveillance Type</label>
                <select
                  id="surveillanceType"
                  name="surveillanceType"
                  value={formData.surveillanceType}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                >
                  <option value="" disabled>Please select</option>
                  {surv.map(src => (
                    <option key={src.id} value={src.name}>{src.name}</option>
                  ))}

                  </select>
              </div>
              <div className="flex-1">
                <label htmlFor="readinessDate" className="block text-sm font-medium text-gray-700">Readiness Date</label>
                <input
                  type="date"
                  id="readinessDate"
                  name="readinessDate"
                  value={formData.readinessDate}
                  onChange={handleChange}
                  className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
                />
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="selectSiteText" className="block text-sm font-medium text-gray-700">Select Sites</label>
              <textarea
                id="selectSiteText"
                name="selectedSitesText"
                // value={formData.selectedSitesText}
                // onChange={handleChange}
                rows={4}
                className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"
              />
            </div>
          </div>
        </div>
       {select && <div className=" text-black" style={{ padding:'0 30px' }}>
                <h2 className="text-lg font-semibold">Standard Information</h2>
                
                <Form>
        {/* Select Standard and Selected Standard */}
        <Row className="mb-4">
          <Col md={3}>
            <Form.Group controlId="Standard">
              <Form.Label className="text-sm font-medium text-gray-700">Select Standard</Form.Label>
              <Form.Control as="select" name="standard" value={formData.standard} onChange={handleChange} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                {/* Add your options here */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group controlId="selectedStandard">
              <Form.Label className="text-sm font-medium text-gray-700">Selected Standard</Form.Label>
              <Form.Control type="text" name="selectedStandard" value={formData.selectedStandard} onChange={handleChange} placeholder="Selected Standard" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2" />
            </Form.Group>
          </Col>
        </Row>

        {/* Select Accreditation and Selected Accreditation */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group controlId="selectAccreditation">
              <Form.Label className="text-sm font-medium text-gray-700">Select Accreditation</Form.Label>
              <Form.Control as="select" name="accreditation" value={formData.accreditation} onChange={handleChange}className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                {/* Add your options here */}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={9}>
            <Form.Group controlId="selectedAccreditation">
              <Form.Label className="text-sm font-medium text-gray-700">Selected Accreditation</Form.Label>
              <Form.Control type="text" name="selectedAccreditation" value={formData.selectedAccreditation} onChange={handleChange} placeholder="Selected Accreditation" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2" />
            </Form.Group>
          </Col>
        </Row>

        {/* Business Activity and Request Scope */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="businessActivity">
              <Form.Label className="text-sm font-medium text-gray-700">Business Activity</Form.Label>
              <Form.Control as="textarea" rows={3} name="businessActivity" value={formData.businessActivity} onChange={handleChange} placeholder="Business Activity" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="requestScope">
              <Form.Label className="text-sm font-medium text-gray-700">Request Scope</Form.Label>
              <Form.Control as="textarea" rows={3} name="requestScope" value={formData.requestScope} placeholder="Request Scope" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"/>
            </Form.Group>
          </Col>
        </Row>
      </Form>

      <h2 className="text-lg font-semibold">Other Information</h2>
      <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="additionalInformation">
              <Form.Label className="text-sm font-medium text-gray-700">Aditional Information</Form.Label>
              <Form.Control as="textarea" rows={3} name="additionalInformation" value={formData.additionalInformation} placeholder="additional Information" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"/>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="anyOtherServices">
              <Form.Label className="text-sm font-medium text-gray-700">Any other Services</Form.Label>
              <Form.Control as="textarea" rows={3} name="anyOtherServices" value={formData.anyOtherServices} placeholder="Request Scope" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"/>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
          <Form.Group controlId="systemImplementationPeriod">
              <Form.Label className="text-sm font-medium text-gray-700">System implementation period</Form.Label>
              <Form.Control as="select" name="systemImplementationPeriod" value={formData.systemImplementationPeriod} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
          <Form.Group controlId="irsServiceProvided">
              <Form.Label className="text-sm font-medium text-gray-700">Any other IRS service Provided?</Form.Label>
              <Form.Control as="select"  name="irsServiceProvided" value={formData.irsServiceProvided} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <h2 className="text-lg font-semibold">Consultant Information</h2>
      <Container>
      <Row>
        <Col md={3}>
          <Form.Group controlId="consultantName">
              <Form.Label className="text-sm font-medium text-gray-700">Select Existing consultant Name</Form.Label>
              <Form.Control as="select" name="consultantName" value={formData.consultantName} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
          <Form.Group controlId="otherConsultant">
              <Form.Label className="text-sm font-medium text-gray-700">Mention here if other consultant</Form.Label>
              <Form.Control as="select" name="otherConsultant" value={formData.otherConsultant}className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Row className='mt-3'>
            <Col md={3}>
            <Form.Group controlId="consultancyFirmName">
              <Form.Label className="text-sm font-medium text-gray-700">Consultancy Firm Name</Form.Label>
              <Form.Control type="text" name="consultancyFirmName" value={formData.consultancyFirmName} placeholder="Consultancy Firm Name" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2" />
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group controlId="contactNumber">
              <Form.Label className="text-sm font-medium text-gray-700">Contact Number</Form.Label>
              <Form.Control type="text" name="contactNumber" value={formData.contactNumber} placeholder="contactNumber" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2" />
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group controlId="faxNumber">
              <Form.Label className="text-sm font-medium text-gray-700">Fax No</Form.Label>
              <Form.Control type="text" name="faxNumber" value={formData.faxNumber} placeholder="faxno" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2" />
            </Form.Group>
            </Col>
            <Col md={3}>
            <Form.Group controlId="email">
              <Form.Label className="text-sm font-medium text-gray-700">E-mail</Form.Label>
              <Form.Control type="email" name='email' value={formData.email} placeholder="email" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2" />
            </Form.Group>

            </Col>

        </Row>
         <Row className='mt-2'>
          <Col md={6}>
          <Form.Group controlId="managementOfChanges">
              <Form.Label className="text-sm font-medium text-gray-700">Management of Changes</Form.Label>
              <Form.Control as="textarea" rows={3} name="managementOfChanges" value={formData.managementOfChanges} placeholder="" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"/>
            </Form.Group>
          </Col>

         </Row>

        </Container>


        <div className='mt-3'>
          <h2 className="text-lg font-semibold">TS Related Information</h2>
          <Container>
            <Row>
              <Col md={5}>
              <Form.Group controlId="supplierFor">
              <Form.Label className="text-sm font-medium text-gray-700">Supplier For</Form.Label>
              <Form.Control as="select" name="supplierFor" value={formData.supplierFor} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
              
              </Col>
              
            </Row>  

            <Row>
              <Col md={12}>
                  <Form.Group controlId="desiredScopeOfCertification">
                  <Form.Label className="text-sm font-medium text-gray-700">Desired Scope of Certification</Form.Label>
                  <Form.Control as="textarea" name='desiredScopeOfCertification' value={formData.desiredScopeOfCertification} rows={3} placeholder="" className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2"/>
                  </Form.Group>
              </Col>


            </Row>

          </Container>
        </div>

        <div className='mt-3'>
        {/* <h2 className="text-lg font-semibold">Product Design responsibilities</h2> */}
        <Container>
        <Row>
          <Col md={12}>
            <Form.Group controlId="productDesignResponsibility">
              <Form.Label className="text-sm font-bold text-gray-700">
                Product design responsibility
              </Form.Label>
              <div className="d-flex mt-2">
                <Form.Check
                  type="radio"
                  label="Organization responsible OR Outsourced"
                  name="productDesignResponsibility"
                  value={formData.productDesignResponsibility}
                
                  className="mr-3"
                />
                <Form.Check
                  type="radio"
                  label="Customer Responsible"
                  name="designResponsibility"
                  value="customer"
                  
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
    

        </Container>

        </div>


        <div className='mt-4'>
        <h2 className="text-lg font-semibold">QMS Structure</h2>
        <Container>
          <Row>
            <Col md={4}>
            <Form.Group controlId="qmsSingleManufacturingSite">
              <Form.Label className="text-sm font-medium text-gray-700">Single Manufacturing Site</Form.Label>
              <Form.Control as="select" name="qmsSingleManufacturingSite" value={formData.qmsSingleManufacturingSite}className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
    <option value="scheme2">Scheme 2</option>
    <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group controlId="qmsSingleExtendedSites">
              <Form.Label className="text-sm font-medium text-gray-700">Single site with Extended Sites</Form.Label>
              <Form.Control as="select" name="qmsSingleExtendedSites" value={formData.qmsSingleExtendedSites} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
                  <option value="scheme2">Scheme 2</option>
                  <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
            </Col>
            <Col md={4}>
            <Form.Group controlId="qmsCorporateScheme">
              <Form.Label className="text-sm font-medium text-gray-700">Corporate Scheme</Form.Label>
              <Form.Control as="select" name="qmsCorporateScheme" value={formData.qmsCorporateScheme} className="mt-1 border block w-full bg-white-200 bg-white border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50 sm:text-sm p-2">
                <option value="">Select...</option>
                <option value="scheme1">Scheme 1</option>
                <option value="scheme2">Scheme 2</option>
                <option value="scheme3">Scheme 3</option>
                </Form.Control>
            </Form.Group>
            </Col>

        


          </Row>


        </Container>
         

        </div>

      






              </div>}


        <div className="flex justify-end sticky bottom-0 p-3" >
          <button
            onClick={onClose}
            className="px-4 py-2 text-black dark:bg-meta-4 bg-white border border-gray-300 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md text-white"
            style={{backgroundColor: '#152238'}}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupForm;
