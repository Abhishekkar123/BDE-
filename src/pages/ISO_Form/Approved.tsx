import React from 'react'
import { Form, Row, Col, Button,Table} from 'react-bootstrap';
import { useState,useEffect } from 'react';
// import { fontWeight } from 'html2canvas/dist/types/css/property-descriptors/font-weight';
// import {data,data1} from './data.ts'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function Approved() {
    const navigate=useNavigate()
  const [data,setData]=useState(false)
  const [mandays,setMandays]=useState('')
  const [survillance,setSurvillance]=useState('')
  const [count,setCount]=useState(0);
  const [round,setRound]=useState('')
  const [nodesign,SetNoDesign]=useState('')
  const [formData, setFormData] = useState({
    organizationName: '',
    address: '',
    scopeActivity: '',
    status: '',
    certificationType: '',
    standard: '',
    justificationForExclusion: '',
    comment: '',
    isMultisiteOrganization: '',
    isUnderCorporateScheme: '',
    corporateHeaderName: '',
    remarks: '',
    iafEAcode: '',
    naceRev2: '',
    naceRev11: '',
    accreditationToBeGranted: '',
    applicationStatus: '',
    preparedByName: '',
    preparedBySignature: '',
    preparedByDate: '',
    approvedByName: null,
    approvedBySignature: null,
    approvedByDate: null,
    managementSystem: '',
    certificateNumber: '',
    certificateExpiryDate: '',
    certificationBody: '',
    // usiCodesForSiteExtension: [],
    usiSiteExtension:'',
    // usiCodesForSRSL: [],
    surveillance1Onsite: '',
    surveillance1Offsite: '',
    surveillance2Onsite: '',
    surveillance2Offsite: '',
    surveillance3Onsite: '',
    surveillance3Offsite: '',
    surveillance4Onsite: '',
    surveillance4Offsite: '',
    surveillance5Onsite: '',
    surveillance5Offsite: '',
    consultantToFirm: '',
    consultantDetails: '',
    isTopManagementPartOfBoard: false,
    trainingInfluence: '',
    conflictOfInterestReview: '',
    totalMandays:'',
    stage1Mandays:'',
    stage1Onsite:'',
    stage1Offsite:'',
    stage2RenewalMandays:'',
    stage2RenewalOnsite:'',
    stage2RenewalOffsite:'',
    increasingFactor:null,
    decreasingFactor:null,
    increaseMandaysCriteria:null,
    decreaseMandaysCriteria:null,
    increaseStandard:null,
    IncsiteName:null,
    decreaseStandard:null,
    DecsiteName:null,
    manpowerAtSite:'',
    manpowerAtSiteExtension:null,
    manpowerAtSRSL:null,
    markUsageComment:'',
    siteExtensionManPower:null,
    siteExtensionManday:null,
    siteExtensionStage1:null,
    siteExtensionStage2:null,
    siteExtensionSpecialAudit:null,
    siteExtensionSA1:null,
    siteExtensionSA2:null,
    siteExtensionTransfer:null,
    mainSiteManPower:'',
    mainSiteManday:'',
    mainSiteStage1: null, 
    mainSiteStage2: null,
    mainSiteSpecialAudit: null,
    mainSiteSA1: null,
    mainSiteSA2: null,
    mainSiteTransfer: null
  });
  const [naceCode1,setNaceCode1]=useState([]);
  const [contractData,setCOntractData]=useState();
  const [naceCode2,setNaceCod2]=useState([]);
  const [iaf,setIaf]=useState([])

  const [recretification,setRecertification]=useState('');

  // const fetchNace=async()=>{
  //   try{
  //     const resp=await axios.get("http://localhost:8000/api/auditor/naceCodeRev1");
  //     console.log("nace1",resp.data)
  //     setNaceCode1(resp.data)

  //   }catch(err){
  //     console.log(err)
  //   }
  // }
  
  useEffect(()=>{
    const data=async()=>{
      try{
      const data1= await axios.get("http://localhost:8000/api/formsIATF/certification-forms");
   console.log(data1.data)

   const abc=data1.data[0].manufacturingSites[0].nonApplicableClauses
  //  console.log("abc",abc)
     SetNoDesign(abc);

   
      }catch(err){
        console.log(err)
      }
    };

    data();
  },[])

  useEffect(()=>{
    const fetchNace=async()=>{
      try{
        const resp=await axios.get("http://localhost:8000/api/auditor/naceCodeRev1");
        const response=await axios.get("http://localhost:8000/api/auditor/auditorNaceRev2")
        const resp1=await axios.get("http://localhost:8000/api/auditor/auditorIAFCodes")

        // console.log("nace1",resp.data)
        // console.log("nace2",response.data)
        // console.log("resp1",resp1.data)
        setNaceCode1(resp.data)
        setNaceCod2(response.data)
        setIaf(resp1.data)
  
      }catch(err){
        console.log(err)
      }
    };
    fetchNace()

  },[])



  // naceCode1.map((data)=>{
  //   console.log(data.name)
  //   return(
  //     <>
  //     {data.name}
  //     </>
  //   )
  // })
  const [rows, setRows] = useState([
    { site: "Site Calculation", mainSiteManPower: '', mainSiteManday: '', mainSiteStage1: '', mainSiteStage2: '',  mainSiteSpecialAudit: '', mainSiteSA1: '', mainSiteSA2: '',  mainSiteTransfer: '' },
    // { site: "Site Extension", siteExtensionManPower: '', manday: '', stage1: '', stage2: '', specialAudit: '', sa1: '', sa2: '',  transfer: '' },
    // { site: "Standalone Remote Support Location (SRSL)", manpower: '', manday: '', stage1: '', stage2: '', specialAudit: '', sa1: '', sa2: '', transfer: '' }
  ]);
  const [usiCodesForSiteExtension,setUsi]=useState([
    { site: "Site Extension",noOfShifts: '',	shiftName: '', fullTimeEmp:'',partTimeEmp:'',contractEmp:''  },

  ])

  // const [usiCodesForSRSL,setUsiCode]=useState([
  //   { site: "Standalone Remote Support Location (SRSL)",noOfShifts: '',	shiftName: '', fullTimeEmp:'',partTimeEmp:'',contractEmp:''  }
  // ])

  const [ro, setRo] = useState([
    { site: "Main Site",noOfShifts: '',	shiftName: '', fullTimeEmp:'',partTimeEmp:'',contractEmp:'' },
    // { site: "Site Extension",noOfShifts: '',	shiftName: '', fullTimeEmp:'',partTimeEmp:'',contractEmp:''  },
    // { site: "Standalone Remote Support Location (SRSL)",noOfShifts: '',	shiftName: '', fullTimeEmp:'',partTimeEmp:'',contractEmp:''  }
  ]);


  const [revisionHistory,setRevision]=useState([
    {
      revisionDate:'',
      revisionNo:'',
      reason:'',
      details:''
    }
  ])
  const [usiCodesForSRSL, setSrsRows] = useState([
    {
      srsl: "Standalone SRSL",
      noOfShifts: '',
      shiftName: '',
      fullTimeEmp: '',
      partTimeEmp: '',
      contractEmp: '',
    },
  ]);

const handleInputChange = (event) => {
  const { name, value, type } = event.target;
  if (type === 'radio') {
    setFormData({ ...formData, [name]: type === 'radio' ? (value === 'true') : value});
  } else {
    console.log(name,value)
    setFormData({ ...formData, [name]: value });
  }
};


  // const handleRowChange = (index, field, value) => {
  //   const updatedRows = [...rows];
  //   updatedRows[index][field] = value;
  //   setRows(updatedRows);
  // };

  

//   console.log(data1)
  // const [showModal, setShowModal] = useState(false);
  // const [showModal1,setShowModal1]=useState(false);

  // const handleData = () => {
  //   setShowModal(true);
  // };

  // const handleClose = () => setShowModal(false);

    // const [rows, setRows] = useState([
    //     { site: "Main Site", manpower: '', manday: '', stage1: '', stage2: '', specialAudit: '', sa1: '', sa2: '', sa3: '', sa4: '', sa5: '', transfer: '' },
    //     { site: "Site Extension", manpower: '', manday: '', stage1: '', stage2: '', specialAudit: '', sa1: '', sa2: '', sa3: '', sa4: '', sa5: '', transfer: '' },
    //     { site: "Standalone Remote Support Location (SRSL)", manpower: '', manday: '', stage1: '', stage2: '', specialAudit: '', sa1: '', sa2: '', sa3: '', sa4: '', sa5: '', transfer: '' }
    //   ]);
    
      // Handle input changes to update the respective row and column
      const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
        
        // Update formData with the modified rows
        setFormData(prevFormData => ({
            ...prevFormData,
            rows: updatedRows
        }));
    };
    const handleSiteChange = (index, field, value) => {
      const updatedRows = [...usiCodesForSiteExtension];
      updatedRows[index][field] = value;
      setUsi(updatedRows);
      
      // Update formData with the modified rows
      setFormData(prevFormData => ({
          ...prevFormData,
          usiCodesForSiteExtension: updatedRows
      }));
  };
    const handleChange1 = (index, field, value) => {
        const updatedRo = [...ro];
        updatedRo[index][field] = value;
        setRo(updatedRo);
        
        // Update formData with the modified ro
        setFormData(prevFormData => ({
            ...prevFormData,
            ro: updatedRo
        }));
    };
    
    const handleSrslRowChange = (index, field, value) => {
        const updatedSrsRows = [...usiCodesForSRSL];
        console.log(updatedSrsRows)
        updatedSrsRows[index][field] = value;
        setSrsRows(updatedSrsRows);
        // Update formData with the modified srsRows
        setFormData(prevFormData => ({
            ...prevFormData,
            usiCodesForSRSL: updatedSrsRows
        }));
    };
    
    const handleHistory = (index, field, value) => {
        const updatedRevisionHistory = [...revisionHistory];
        updatedRevisionHistory[index][field] = value;
        setRevision(updatedRevisionHistory);
        
        // Update formData with the modified revision history
        setFormData(prevFormData => ({
            ...prevFormData,
            revisionHistory: updatedRevisionHistory
        }));
    };

      const handleData=()=>{
        navigate("/business/contract/manday")

      }

      const handleData1=()=>{
        navigate("/business/contract/recertification")

      }

      const calculateEmployeeCount = () => {
        const rowTotal= ro.reduce((total, row) => {
          const fullTime = parseInt(row.fullTimeEmp || 0);
          const partTime = parseInt(row.partTimeEmp || 0);
          const contract = parseInt(row.contractEmp || 0);
          return total + fullTime + partTime + contract
        }, 0);

        const extended=usiCodesForSiteExtension.reduce((total, row) => {
          const fullTime = parseInt(row.fullTimeEmp || 0);
          const partTime = parseInt(row.partTimeEmp || 0);
          const contract = parseInt(row.contractEmp || 0);
          return total + fullTime + partTime + contract
        }, 0);

        const srsl=usiCodesForSRSL.reduce((total,row)=>{
          const fullTime = parseInt(row.fullTimeEmp || 0);
          const partTime = parseInt(row.partTimeEmp || 0);
          const contract = parseInt(row.contractEmp || 0);
          return total + fullTime + partTime + contract
        },0)

        return rowTotal+extended+srsl;


      };
      

      // const employeeCount=154
      // const [employeeCount,setEmployeeCount]=useState('')

      // const abc=async()=>{
      //   setData(!data)
        
      //  const employeeCount=calculateEmployeeCount();
      //  setCount(employeeCount)
      //   try{
      //     const resp=await axios.post("http://localhost:8000/api/audit-calculation/calculate",{employeeCount:employeeCount})
      //     console.log("cal",resp)
      //     setMandays(resp.data.auditManDays);
      //     setSurvillance(resp.data.surveillanceAuditMandays)
      //     setRecertification(resp.data.recertificationAuditManDays)
      //   }catch(err){
      //     console.log("err",err.message)
      //   }

      // }


      const dataCalculate=async()=>{
        const employeeCount=calculateEmployeeCount();
        setCount(employeeCount)
         try{
           const resp=await axios.post("http://localhost:8000/api/audit-calculation/calculate",{employeeCount:employeeCount})
           console.log("cal",resp.data)

           setMandays(resp.data.auditManDays)
           setSurvillance(resp.data.roundedSurveillanceDays)
           setRecertification(resp.data.recertificationAuditManDays);
           setRound(resp.data.roundedRecertificationDays)
          //  auditManDays: 7.5,
          //  calculatedAuditDays: "6.38",
          //  calculatedRecertificationDays: "4.25",
          //  calculatedSurveillanceDays: "3.19",
          //  employeeCount: 200,
          //  recertificationAuditManDays: 5,
          //  roundedAuditDays: 7,
          //  roundedRecertificationDays: 5,
          //  roundedSurveillanceDays: 4,
          //  surveillanceAuditMandays: 3.75

          //  setMandays(resp.data.auditManDays);
          //  setSurvillance(resp.data.surveillanceAuditMandays)
         }catch(err){
           console.log("err",err.message)
         }

      }
      // dataCalculate();
  
    const fetchContract=async ()=>{
      // /contract-reviews
      try{
      const resp=await axios.get("http://localhost:8000/api/contract-reviews/contract-reviews");
      // console.log(resp)
      // contractData(resp.data[0])
      console.log("resp-1",resp.data)
      setRevision(resp.data[0].revisionHistory);

      setFormData(resp.data[0])

      }catch(err){
        console.log(err)
      }
    }


      useEffect(()=>{
       fetchContract();
       dataCalculate()
      },[])

      const handleSubmit =async (event) => {
        event.preventDefault();
       
        const submissionData = {
          ...formData,
          mainSiteStage1:parseFloat(formData.mainSiteStage1),
          mainSiteStage2:parseFloat(formData.mainSiteStage2),
        //   mainSiteManPower:count,
        // mainSiteManday: mandays,
        // mainSiteSA1: survillance,
        // mainSiteSA2: survillance,
        // manpowerAtSite:count
          // rows: updatedRows, // Use updated rows with calculated values
          
        };
        console.log(submissionData);
    
        try{
        //   await axios.post("http://localhost:8000/api/contract-reviews/contract-reviews",submissionData)
        //   navigate("/dashboard")
      await axios.put(`http://localhost:8000/api/contract-reviews/contract-reviews/${1}`,submissionData)
        navigate("/dashboard")
        }catch(err){
          console.log("err",err)
        }
      };
    // abc();
      // const handleData1=()=>{
      //   setShowModal1(true)
      // }

      // const handleClose1=()=>{setShowModal1(false);}
  return (
    <>
    <Form className='text-black' onSubmit={handleSubmit}>
      {/* General Information Section */}
      <div className='d-flex justify-content-between'>
      <h4 className="font-bold fs-4 mb-3">Contract Review/Application Review</h4>
      <div className='d-flex'>
      <Button className='mr-3 p-3' style={{background:'#152238'}} onClick={handleData}>View Audit Manday(Initial Stage 2) </Button>
      <Button className='p-3' style={{background:'#152238'}} onClick={handleData1}>Recertification audit Manday(after 2Yrs)</Button>
      </div>
      </div>
      <h4 className='mb-3' style={{fontSize:'18px',fontWeight:'500'}}>General Information</h4>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="organizationName">
          <Form.Label>Organization's Name</Form.Label>
          <Form.Control type="text" placeholder="Enter organization name" name="organizationName" value={formData.organizationName}
            onChange={handleInputChange}
             />
        </Form.Group>

        <Form.Group as={Col} controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={formData.address} name="address"
            onChange={handleInputChange}
            placeholder="Enter address" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="scopeActivity">
          <Form.Label>Scope / Activity</Form.Label>
          <Form.Control type="text" value={formData.scopeActivity} name="scopeActivity"
            onChange={handleInputChange}
            placeholder="Enter scope or activity" />
        </Form.Group>

        <Form.Group as={Col} controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control type="text"  value={formData.status} name="status"
            onChange={handleInputChange}
            placeholder="Enter status" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="certificationType">
        <Form.Label>Certification Type</Form.Label>
        <Form.Control type="text" placeholder="Enter certification type" name="certificationType" value={formData.certificationType}  onChange={handleInputChange}/>
      </Form.Group>

      {/* Standard Section */}
      <div>
      <h4 className='mb-2'>Standard</h4>
      <Form.Group className="mb-3" controlId="standard">
        <Form.Select value={formData.standard} onChange={handleInputChange} name="standard">
          <option value="">Select a Standard</option>
          <option value="IATF_16949_2016">IATF 16949:2016</option>
          <option value="IATF_LOC">IATF - LOC</option>
          <option value="Other_Standard">Other Standard</option>
          {/* Add more options as needed */}
        </Form.Select>
      </Form.Group>
    </div>

      <Form.Group className="mb-3" controlId="justificationForExclusion">
        <Form.Label>Justification for exclusion, specifically for Design & Development</Form.Label>
        <Form.Control as="textarea" rows={3} value={formData.justificationForExclusion} name="justificationForExclusion" onChange={handleInputChange}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="commentOnUsage">
        <Form.Label>Comment on usage of Mark / Logo, display of certificate for its appropriateness and validity on the Client’s website</Form.Label>
        <Form.Control as="textarea" rows={3} value={formData.comment}  name="comment" onChange={handleInputChange} />
      </Form.Group>

      {/* Multisite & Corporate Scheme */}
    <Row className="mb-3">
    <Form.Label>Is Multisite Organisation?</Form.Label>
    <Form.Check
    type="radio"
    label="Yes"
    name="isMultisiteOrganization"
    checked={formData.isMultisiteOrganization===true}
    value="true"
    onChange={handleInputChange}
  />
  <Form.Check
    type="radio"
    label="No"
    name="isMultisiteOrganization"
    checked={formData.isMultisiteOrganization===false}
    value="false"
    onChange={handleInputChange}
  />

<Form.Group as={Col} controlId="isCorporateScheme">
  <Form.Label>Is it under Corporate Scheme?</Form.Label>
  <Form.Check
    type="radio"
    label="Yes"
    name="isUnderCorporateScheme"
    value="true"
    checked={formData.isUnderCorporateScheme === true}
    onChange={handleInputChange}
  />
  <Form.Check
    type="radio"
    label="No"
    name="isUnderCorporateScheme"
    value="false"
    checked={formData.isUnderCorporateScheme === false}
    onChange={handleInputChange}
  />
</Form.Group>
      </Row>


   
      {formData.isUnderCorporateScheme && (
        <>
      <Form.Group className="mb-3" controlId="corporateHeaderName">
        <Form.Label>If ‘Yes’, name of ‘Corporate Header’</Form.Label>
        <Form.Control
          type="text"
          value={formData.corporateHeaderName}
          onChange={handleInputChange}
          placeholder="Enter corporate header name"
          name="corporateHeaderName"
        />
      </Form.Group>

    <Form.Group className="mb-3" controlId="remarks">
      <Form.Label>Remarks:</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={formData.remarks}
        onChange={handleInputChange}
        name="remarks"
      />
    </Form.Group>
    </>
)}




<h4 className='mb-3'>Particulars w.r.t. IAF Code(s), NACE Code(s) For IATF 16949:2016 / IATF - LOC</h4>
<Table bordered>
  <tbody>
    <tr>
      <td>IAF/EA Code</td>
      <td>
        <Form.Control
           as="select"
          value={formData.iafEAcode}
          onChange={handleInputChange}
          name="iafEAcode"
          
        >
           <option value="">IAF/EA</option>
       { iaf.map((data)=>{
          // console.log("data1",data.name)
          return(
            <>
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
            </>
          )
        })
      }
          


          </Form.Control>
      </td>
    </tr>
    <tr>
      <td>NACE (Rev.2)</td>
      <td>
      <Form.Control
        as="select"
        value={formData.naceRev2}
        onChange={handleInputChange}
        name="naceRev2"
      >
        <option value="">Select NACE (Rev.2)</option>
       { naceCode1.map((data)=>{
          // console.log("data",data.name)
          return(
            <>
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
            </>
          )
        })
      }
            
      </Form.Control>
      </td>
    </tr>
    <tr>
      <td>NACE (Rev.1.1)</td>
      <td>
       <Form.Control
        as="select"
        value={formData.naceRev11}
        onChange={handleInputChange}
        name="naceRev11"
      >
        <option value="">Select NACE (Rev.1.1)</option>
       { naceCode2.map((data)=>{
          // console.log(data.name)
          return(
            <>
            <option key={data.id} value={data.name}>
              {data.name}
            </option>
            </>
          )
        })
      }
            
      </Form.Control>
      </td>
    </tr>
  </tbody>
</Table>
<h4 className='mb-3'>Information about the Accreditation</h4>
<Table bordered>
  <tbody>
    <tr>
      <td>Accreditation To Be Granted</td>
      <td>
        <Form.Control
          type="text"
          value={formData.accreditationToBeGranted}
          onChange={handleInputChange}
          name="accreditationToBeGranted"
          placeholder="Enter accreditation details"
        />
      </td>
    </tr>
  </tbody>
</Table>
<h4 className='mb-3'>Status of the Application</h4>
<Table bordered>
  <tbody>
    <tr>
      <td>Whether application for certification accepted or declined?</td>
      <td>
        <Form.Select
          value={formData.applicationStatus}
          onChange={handleInputChange}
          name="applicationStatus"
        >
          <option value="">Select</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
        </Form.Select>
      </td>
    </tr>
    {formData.applicationStatus === "Declined" && (
      <tr>
        <td>If declined, reasons for declining</td>
        <td>
          <Form.Control
            as="textarea"
            rows={2}
            value={formData.justificationForExclusion}
            onChange={handleInputChange}
            name="justificationForExclusion"
            placeholder="Enter reasons for declining"
          />
        </td>
      </tr>
    )}
    {formData.applicationStatus === "Declined" && (
      <tr>
        <td>Date of communication to applicant, if declined</td>
        <td>
          <Form.Control
            type="date"
          
            onChange={handleInputChange}
            // name="preparedByDate"
          />
        </td>
      </tr>
    )}
  </tbody>
</Table>
{/* <h4 className='mb-3'>Sites Name Information</h4>
<Table bordered>
  <thead>
    <tr>
      <th>Sites Name</th>
      <th>No. of Shifts</th>
      <th>Shifts Name</th>
      <th>Full-time Emp.</th>
      <th>Part-time Emp.</th>
      <th>Contract Emp.</th>
      {/* <th>Total </th> */}
  {/*  </tr>
  </thead>
  <tbody>
    {ro.map((row, index) => (
      <tr key={index}>
        <td>{row.site}</td>
        <td>
          <Form.Control
            type="number"
            name="noOfShifts"
            value={row.noOfShifts}
            onChange={(e) => handleChange1(index, 'noOfShifts', e.target.value)}
            placeholder="Enter No. of Shifts"
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="shiftName"
            value={row.shiftName}
            onChange={(e) => handleChange1(index, 'shiftName', e.target.value)}
            placeholder="Enter Shift Name"
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name="fullTimeEmp"
            value={row.fullTimeEmp}
            onChange={(e) => handleChange1(index, 'fullTimeEmp', e.target.value)}
            placeholder="Enter Full-time Emp."
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name="partTimeEmp"
            value={row.partTimeEmp}
            onChange={(e) => handleChange1(index, 'partTimeEmp', e.target.value)}
            placeholder="Enter Part-time Emp."
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name="contractEmp"
            value={row.contractEmp}
            onChange={(e) => handleChange1(index, 'contractEmp', e.target.value)}
            placeholder="Enter Contract Emp."
          />
        </td>*/}
        {/* <td>
          <Form.Control
            type="number"
            name="contractEmp"
            value={row.contractEmp}
            onChange={(e) => handleChange1(index, 'contractEmp', e.target.value)}
            placeholder="Enter Contract Emp."
          />
        </td> */}

    {/*  </tr>
    ))}
    {
      usiCodesForSiteExtension.map((row,index)=>(
        <tr key={index}>
        <td>{row.site}</td>
        <td>
          <Form.Control
            type="number"
            name="noOfShifts"
            value={row.noOfShifts}
            onChange={(e) => handleSiteChange(index, 'noOfShifts', e.target.value)}
            placeholder="Enter No. of Shifts"
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="shiftName"
            value={row.shiftName}
            onChange={(e) => handleSiteChange(index, 'shiftName', e.target.value)}
            placeholder="Enter Shift Name"
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name="fullTimeEmp"
            value={row.fullTimeEmp}
            onChange={(e) => handleSiteChange(index, 'fullTimeEmp', e.target.value)}
            placeholder="Enter Full-time Emp."
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name="partTimeEmp"
            value={row.partTimeEmp}
            onChange={(e) => handleSiteChange(index, 'partTimeEmp', e.target.value)}
            placeholder="Enter Part-time Emp."
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name="contractEmp"
            value={row.contractEmp}
            onChange={(e) => handleSiteChange(index, 'contractEmp', e.target.value)}
            placeholder="Enter Contract Emp."
          />
        </td>*/}
        {/* <td>
          <Form.Control
            type="number"
            name="contractEmp"
            value={row.contractEmp}
            onChange={(e) => handleSiteChange(index, 'contractEmp', e.target.value)}
            placeholder="Enter Contract Emp."
          />
        </td> */}

     {/* </tr>
      ))}
  </tbody>
</Table> */}

      {/* Standalone Remote Support Location Section */}
      {/* <h4 className='mb-3'>Standalone Remote Support Location (SRSL)</h4>
<Table bordered>
  <thead>
    <tr>
      <th>SRSL</th>
      <th>No. of Shifts</th>
      <th>Shifts Name</th>
      <th>Full-time Emp.</th>
      <th>Part-time Emp.</th>
      <th>Contract Emp.</th>
    </tr>
  </thead>
  <tbody>
    {usiCodesForSRSL.map((row, index) => (
      <tr key={index}>
        <td>{row.srsl}</td>
        <td>
          <Form.Control
            type="number"
            name="noOfShifts"
            value={row.noOfShifts}
            onChange={(e) => handleSrslRowChange(index, 'noOfShifts', e.target.value)}
            placeholder="Enter No. of Shifts"
          />
        </td>
        <td>
          <Form.Control
            type="text"
            name="shiftName"
            value={row.shiftName}
            onChange={(e) => handleSrslRowChange(index, 'shiftName', e.target.value)}
            placeholder="Enter Shift Name"
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name='fullTimeEmp'
            value={row.fullTimeEmp}
            onChange={(e) => handleSrslRowChange(index, 'fullTimeEmp', e.target.value)}
            placeholder="Enter Full-time Emp."
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name='partTimeEmp'
            value={row.partTimeEmp}
            onChange={(e) => handleSrslRowChange(index, 'partTimeEmp', e.target.value)}
            placeholder="Enter Part-time Emp."
          />
        </td>
        <td>
          <Form.Control
            type="number"
            name='contractEmp'
            value={row.contractEmp}
            onChange={(e) => handleSrslRowChange(index, 'contractEmp', e.target.value)}
            placeholder="Enter Contract Emp."
          />
        </td>
      </tr>
    ))}
  </tbody>
</Table> */}

{/* <Button onClick={abc} className='mb-2 p-2 ' style={{background:'#152238'}}>
  Calculate Mandays
</Button> */}


      <h4 className='mb-3'>Calculation of Mandays [Refer Annexure 1]</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>SITENAME - ADDRESS</th>
            <th>Total Man Power</th>
            <th>Manday</th>
            <th>Stage 1</th>
            <th>Stage 2 / Renewal</th>
            <th>Special Audit</th>
            <th>SA1</th>
            <th>SA2</th>
            {/* <th>SA3</th>
            <th>SA4</th>
            <th>SA5</th> */}
            <th>Transfer</th>
          </tr>
        </thead>
        <tbody>
          
            <tr>
              <td>Site Calculation</td>
              <td>
                <Form.Control
                  type="number"
                  name="mainSiteManPower"
                  value={formData.mainSiteManPower}
                  onChange={handleInputChange}
                  placeholder="Man Power"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="mainSiteManday"
                  value={formData.mainSiteManday}
                  onChange={handleInputChange}
                  placeholder="Manday"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="mainSiteStage1"
                  value={formData.mainSiteStage1|| ''}
                  onChange={handleInputChange}
                  placeholder="Stage 1"
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  name="mainSiteStage2"
                  value={formData.mainSiteStage2 ||''}
                  onChange={handleInputChange}
                  placeholder="Stage 2"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="mainSiteSpecialAudit"
                  value={formData.mainSiteSpecialAudit|| ''}
                  onChange={handleInputChange}
                  placeholder="Special Audit"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="mainSiteSA1"
                  value={formData.mainSiteSA1|| ''}
                  onChange={handleInputChange}
                  placeholder="SA1"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  name="mainSiteSA2"
                  value={formData.mainSiteSA2|| ''}
                  onChange={handleInputChange}
                  placeholder="SA2"
                />
              </td>
              {/* <td>
                <Form.Control
                  type="number"
                  value={row.sa3}
                  onChange={(e) => handleInputChange(index, 'sa3', e.target.value)}
                  placeholder="SA3"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={row.sa4}
                  onChange={(e) => handleInputChange(index, 'sa4', e.target.value)}
                  placeholder="SA4"
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={row.sa5}
                  onChange={(e) => handleInputChange(index, 'sa5', e.target.value)}
                  placeholder="SA5"
                />
              </td> */}
              <td>
                <Form.Control
                  type="number"
                  name="mainSiteTransfer"
                  value={formData.mainSiteTransfer|| ''}
                  onChange={handleInputChange}
                  placeholder="Transfer"
                />
              </td>
            </tr>

          {/* <tr>
            <td>Site Extension</td>
            <td><Form.Control
                  type="number"
                  name="mainSiteTransfer"
                  value={count}
                  onChange={ handleInputChange}
                  placeholder="Man Power"
                /></td>
                <td><Form.Control
                  type="number"
                  name="siteExtensionManday"
                  value={formData.siteExtensionManday}
                  onChange={handleInputChange}
                   placeholder="Manday"
                  
                /></td>
               <td><Form.Control
                  type="number"
                  name="siteExtensionStage1"
                  value={formData.siteExtensionStage1}
                  onChange={handleInputChange}
                    placeholder="Stage 1"
                  
                /></td>
                <td><Form.Control
                  type="number"
                  name="siteExtensionStage2"
                  value={formData.siteExtensionStage2}
                  onChange={handleInputChange}
                   placeholder="Stage 2"
                  
                /></td>
                  <td><Form.Control
                  type="number"
                  name="siteExtensionSpecialAudit"
                  value={formData.siteExtensionSpecialAudit}
                  onChange={handleInputChange}
                  placeholder="Special Audit"
                  
                /></td>
                 <td><Form.Control
                  type="number"
                  name="siteExtensionSA1"
                  value={formData.siteExtensionSA1}
                  onChange={handleInputChange}
                   placeholder="SA1"
                  
                /></td>
                <td><Form.Control
                  type="number"
                  name="siteExtensionSA2"
                  value={formData.siteExtensionSA2}
                  onChange={handleInputChange}
                  placeholder="SA2"
                  
                /></td>
                <td><Form.Control
                  type="number"
                  name="siteExtensionTransfer"
                  value={formData.siteExtensionTransfer}
                  onChange={handleInputChange}
                  placeholder="Transfer"
                  
                /></td>



                
          </tr> */}
        </tbody>
      </Table>

      <h4 className='mb-3'>Manpower Information</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Manpower Information</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Manpower at site</td>
            <td>
              <Form.Control
                type="number"
                name="manpowerAtSite"
                value={formData.manpowerAtSite}
                onChange={handleInputChange}
                
              />
            </td>
          </tr>
          <tr>
            <td>
              Manpower at site extension <br />
              (if site extension is more than 1 then add rows)
            </td>
            <td>
              <Form.Control
                type="number"
                name='manpowerAtSiteExtension'
                value={formData.manpowerAtSiteExtension}
                onChange={handleInputChange}

              />
            </td>
          </tr>
          <tr>
            <td>
              Manpower at Standalone Remote Support Location (SRSL) <br />
              (if SRSL is more than 1 then add rows)
            </td>
            <td>
              <Form.Control
                type="number"
                value={formData.manpowerAtSRSL}
                name="manpowerAtSRSL"
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Increase in Mandays Section */}
      <h4 className='mb-3'>Increase in Mandays</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Standard</th>
            <th>Site Name</th>
            <th>Criteria for Increase in audit time of management systems</th>
            <th>Increasing Factor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                type="text"
                value={formData.increaseStandard}
                name="increaseStandard"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                value={formData.IncsiteName}
                name="IncsiteName"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Form.Control
                type="text"
              name="increaseMandaysCriteria"
              value={formData.increaseMandaysCriteria}
              onChange={handleInputChange}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                name="increasingFactor"
                value={formData.increasingFactor}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Control
                type="text"
                value="IATF 16949" // Static value
                readOnly
              />
            </td>
            <td>
              <Form.Control
                type="text"
                // Static value
                readOnly
              />
            </td>
            <td>
              <Form.Control
                type="text"
                 // Static value
                readOnly
              />
            </td>
            <td>
              <Form.Control
                type="number"
                 // Static value
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <h4 className='mb-3'>Decrease in Mandays</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Standard</th>
            <th>Site Name</th>
            <th>Standard	Site Name	Criteria for Decrease in audit time of management systems
(Max. 50 % discount)
Decreasing Factor
</th>
            <th>Decreasing Factor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Form.Control
                type="text"
                value={formData.decreaseStandard}
                name="decreaseStandard"
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Form.Control
                type="text"
                 value={formData.DecsiteName}
                 name="DecsiteName"
                 onChange={handleInputChange}
                
              />
            </td>
            <td>
              <Form.Control
                type="text"
                 name="decreaseMandaysCriteria"
                 value={formData.decreaseMandaysCriteria}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                name="decreasingFactor"
                value={formData.decreasingFactor}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Form.Control
                type="text"
                 // Static value
                readOnly
              />
            </td>
            <td>
              <Form.Control
                type="text"
                // Static value
                readOnly
              />
            </td>
            <td>
              <Form.Control
                type="text"
                 // Static value
                readOnly
              />
            </td>
            <td>
              <Form.Control
                type="number"
                // Static value
                readOnly
              />
            </td>
          </tr>
        </tbody>
      </Table>

      {/* <h4 className='mb-3'>Mandays Information</h4> */}
      <Table bordered>
        <thead>
          <tr>
            <th>Decreasing Factors</th>
            <td>
              <Form.Control
                type="number"
                // Static value
                readOnly
              />
            </td>
            <th>Increasing Factors</th>
            <td>
              <Form.Control
                type="number"
                // Static value
                readOnly
              />
            </td>
          </tr>

        </thead>
        <tbody>

          <tr>
          <td>Mandays Information</td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
          <tr>
            <td>Total mandays</td>
            <td>
              <Form.Control
                type="number"
                name="totalMandays"
                value={formData.totalMandays}
                onChange={handleInputChange}
              />
            </td>
            <td>Stage 2/Renewal Mandays</td>
            <td>
              {/* <Form.Control
                type="number"
                name='stage2RenewalMandays'
                value={formData.stage2RenewalMandays}
                
              /> */}
            </td>
          </tr>
          <tr>
            <td>Stage 1 Manday(s)</td>
            <td>
              <Form.Control
                type="number"
               name="stage1Mandays"
               value={formData.stage1Mandays}
               onChange={handleInputChange}
              />
            </td>
            <td>Stage 2 / Renewal Manday(s)</td>
            <td>
              <Form.Control
                type="number"
                name='stage2RenewalMandays'
                value={formData.stage2RenewalMandays}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Stage 1 Onsite</td>
            <td>
              <Form.Control
                type="number"
                name='stage1Onsite'
                value={formData.stage1Onsite}
                onChange={handleInputChange}
              />
            </td>
            <td>Stage 2 / Renewal Onsite</td>
            <td>
              <Form.Control
                type="number"
                name='stage2RenewalOnsite'
                value={formData.stage2RenewalOnsite}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          <tr>
            <td>Stage 1 Offsite</td>
            <td>
              <Form.Control
                type="number"
               name='stage1Offsite'
               value={formData.stage1Offsite}
               onChange={handleInputChange}
              />
            </td>
            <td>Stage 2 / Renewal Offsite</td>
            <td>
              <Form.Control
                type="number"
                name="stage2RenewalOffsite"
                value={formData.stage2RenewalOffsite}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </Table>


       {/* <h4 className='mb-3'>Mandays Information</h4> */}

      <h4 className='mb-3'> Surveillance Mandays</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Surveillance Manday(s) (Overall)</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td> Surveillance 1 Onsite </td>
            <td><Form.Control
                type="number"
                // Static value
                name="surveillance1Onsite"
                value={formData.surveillance1Onsite}
                onChange={handleInputChange}
              /></td>
            <td>Surveillance 1 Offsite</td>
            <td>
              <Form.Control
                type="number"
                name='surveillance1Offsite'
                value={formData.surveillance1Offsite}
                onChange={handleInputChange}
              /></td>
          </tr>
          <tr>
            <td>Surveillance 2 Onsite</td>
            <td><Form.Control
                type="number"
                name="surveillance2Onsite"
                value={formData.surveillance2Onsite}
                onChange={handleInputChange}
              /></td>
            <td>Surveillance 2 Offsite</td>
            <td><Form.Control
                type="number"
                name="surveillance2Offsite"
                value={formData.surveillance2Offsite}
                onChange={handleInputChange}
              /></td>
          </tr>
          <tr>
            <td>Surveillance 3 Onsite</td>
            <td><Form.Control
                type="number"
                name="surveillance3Onsite"
                value={formData.surveillance3Onsite}
                onChange={handleInputChange}
              /></td>
            <td>Surveillance 3 Offsite</td>
            <td><Form.Control
                type="number"
                name="surveillance3Offsite"
                value={formData.surveillance3Offsite}
                onChange={handleInputChange}
              /></td>
          </tr>
          <tr>
            <td>Survillance 4 Onsite</td>
            <td><Form.Control
                type="number"
                name="surveillance4Onsite"
                value={formData.surveillance4Onsite}
                onChange={handleInputChange}
              /></td>
            <td>Survillance 4  OffSite</td>
            <td><Form.Control
                type="number"
                name="surveillance4Offsite"
                value={formData.surveillance4Offsite}
                onChange={handleInputChange}
              /></td>
          </tr>
          <tr>
            <td>Survillance 5 Onsite</td>
            <td><Form.Control
                type="number"
                name="surveillance5Onsite"
                value={formData.surveillance5Onsite}
                onChange={handleInputChange}
              /></td>
            <td>Survillance 5 Offsite</td>
            <td><Form.Control
                type="number"
                name="surveillance5Offsite"
                value={formData.surveillance5Offsite}
                onChange={handleInputChange}
              /></td>


            </tr>
        </tbody>
      </Table>

      <div>
      {/* Impartiality Assessments Table */}
      <h4 className='mb-3'>Impartiality Assessments</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Possible Risk</th>
            {/* <th>Value (Yes/No)</th> */}
            <th>Assessment / Mention Name of Resources</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Consultant to the firm</td>
            {/* <td> <Form.Control as="select">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control></td> */}
            <td>
               <Form.Control
            type="text"
            name="consultantToFirm"
            value={formData.consultantToFirm}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>Name and details of the consultant to be confirmed</td>
            {/* <td> <Form.Control as="select">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control></td> */}
            <td><Form.Control
            type="text"
            name="consultantDetails"
            value={formData.consultantDetails}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>Organization’s Top Mgt part of IRS/ISSPL board</td>
            {/* <td> <Form.Control as="select">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control></td> */}
            <td> <Form.Control as="select" name="isTopManagementPartOfBoard" value={formData.isTopManagementPartOfBoard}>
                    <option value="">Select</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </Form.Control></td>
          </tr>
          <tr>
            <td>Influence through any training provided</td>
            {/* <td> <Form.Control as="select">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control></td> */}
            <td><Form.Control
            type="text"
            name="trainingInfluence"
            value={formData.trainingInfluence}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>Review on Conflict of Interest</td>
            {/* <td> <Form.Control as="select">
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Form.Control></td> */}
            <td><Form.Control
            type="text"
            name="conflictOfInterestReview"
            value={formData.conflictOfInterestReview}
            onChange={handleInputChange}
          /></td>
          </tr>
        </tbody>
      </Table>

      {/* Existing Certification Status Table */}
      <h4 className='mb-3'>Existing Certification Status</h4>
      <Table bordered>
        <thead>
          <tr>
            <th colSpan="2" style={{ backgroundColor: '#e9ecef', textAlign: 'center' }}>
              Existing Certification Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{width:'50%'}}>Management System</td>
            <td> <Form.Control
            type="text"
            name="managementSystem"
            value={formData.managementSystem}
            onChange={handleInputChange}
          /> </td>
          </tr>
          <tr>
            <td>Certificate No. of Site with USI Code</td>
            <td><Form.Control
            type="text"
            name="certificateNumber"
            value={formData.certificateNumber}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>Certificate expiry date</td>
            <td><Form.Control
            type="date"
            name="certificateExpiryDate"
            value={formData.certificateExpiryDate}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>Certification Body</td>
            <td><Form.Control
            type="text"
            name="certificationBody"
            value={formData.certificationBody}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>USI Code(s) for Site extension (if site extension is more than 1 then add rows)</td>
            <td><Form.Control
            type="text"
            name="usiSiteExtension"
            value={formData.usiSiteExtension}
            onChange={handleInputChange}
          /></td>
          </tr>
          <tr>
            <td>USI Code(s) for Standalone Remote Support Location (SRSL) (if SRSL is more than 1 then add rows)</td>
            <td><Form.Control
            type="text"
            name="usiCodesForSRSL"
            value={formData.usiCodesForSRSL}
            onChange={handleInputChange}
          /></td>
          </tr>
        </tbody>
      </Table>

      {/* Comments / Remarks Section */}
      <h4 className='mb-3'>Comments / Remarks</h4>
      <Table bordered>
      
          
            <td style={{ height: '100px' }}> 
               <Form.Control as="textarea" rows={3}  name="markUsageComment" value={formData.markUsageComment} onChange={handleInputChange}/></td>
        
      </Table>
    </div>
    <Row className="mb-4">
        <Col md={6}>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: '#e9ecef' }}>
                  Prepared by
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name:</td>
                <td><Form.Control
            type="text"
            name="preparedByName"
            value={formData.preparedByName}
            onChange={handleInputChange}
          /> </td>
              </tr>
              <tr>
                <td>Signature:</td>
                <td><Form.Control
            type="text"
            name="preparedBySignature"
            value={formData.preparedBySignature}
            onChange={handleInputChange}
          /> </td>
              </tr>
              <tr>
                <td>Initial Date:</td>
                <td><Form.Control
            type="date"
            name="preparedByDate"
            value={formData.preparedByDate}
            onChange={handleInputChange}
          /> </td>
              </tr>
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Table bordered>
            <thead>
              <tr>
                <th colSpan="2" style={{ backgroundColor: '#e9ecef' }}>
                  Approved by
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name:</td>
                <td><Form.Control
            type="text"
            name="approvedByName"
            value={formData.approvedByName|| ''}
            onChange={handleInputChange}
          /></td>
              </tr>
              <tr>
                <td>Signature:</td>
                <td><Form.Control
            type="text"
            name="approvedBySignature"
            value={formData.approvedBySignature|| ''}
            onChange={handleInputChange}
          /></td>
              </tr>
              <tr>
                <td>Initial Date:</td>
                <td><Form.Control
            type="date"
            name="approvedByDate"
            value={formData.approvedByDate || ''}
            onChange={handleInputChange}
          /></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Revision History Section */}
      <h4 className='mb-3'>Revision History</h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Revision Date</th>
            <th>Revision No.</th>
            <th>Reason</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
        {revisionHistory.map((row, index) => {
      console.log("data", row);

      return (
        <tr key={index}>
          <td>
            <Form.Control
              type="text"
              value={row.revisionDate}
              onChange={(e) => handleHistory(index, 'revisionDate', e.target.value)}
              placeholder="Enter revision date"
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={row.revisionNo}
              onChange={(e) => handleHistory(index, 'revisionNo', e.target.value)}
              placeholder="Enter revision number"
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={row.reason}
              onChange={(e) => handleHistory(index, 'reason', e.target.value)}
              placeholder="Enter reason"
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={row.details}
              onChange={(e) => handleHistory(index, 'details', e.target.value)}
              placeholder="Enter details"
            />
          </td>
        </tr>
      );
    })}
        </tbody>
      </Table>

      {/* Submit Button */}
      <div className='text-end'>
      <Button  style={{background:'#152238'}} type="submit">
        Submit
      </Button>
      </div>
    </Form>
    </>
  )
}

export default Approved
