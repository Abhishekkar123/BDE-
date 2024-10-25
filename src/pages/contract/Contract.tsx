// import React from 'react'
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import TableComponent from '../../components/Tables/TableTwo';
import { useEffect, useState } from 'react';
import HeaderWithButton from '../../components/Header/HeaderWithButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
function Contract() {

  const [formData, setFormData] = useState({
    organizationName: '',
    address: '',
    scopeActivity: '',
    status: '',
    certificationType: '',
    standard: '',
    justificationForExclusion: '',
    commentOnUsage: '',
    MultisiteOrganization: '',
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
    approvedByName: '',
    approvedBySignature: '',
    approvedByDate: '',
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
    increasingFactor:'',
    decreasingFactor:'',
    increaseMandaysCriteria:'',
    decreaseMandaysCriteria:'',
    increaseStandard:'',
    IncsiteName:'',
    decreaseStandard:'',
    DecsiteName:'',
    manpowerAtSite:'',
    manpowerAtSiteExtension:'',
    manpowerAtSRSL:'',
    markUsageComment:'',
    // siteExtensionManPower:'',
    // siteExtensionManday:'',
    // siteExtensionStage1:'',
    // siteExtensionStage2:'',
    // siteExtensionSpecialAudit:'',
    // siteExtensionSA1:'',
    // siteExtensionSA2:'',
    // siteExtensionTransfer:'',
    mainSiteManPower:'',
    mainSiteManday:'',
    mainSiteStage1: '', 
    mainSiteStage2: '',
    mainSiteSpecialAudit: '',
    mainSiteSA1: '',
    mainSiteSA2: '',
    mainSiteTransfer: ''
  });

  const fetchContract=async ()=>{
    // /contract-reviews
    try{
    const resp=await axios.get("http://localhost:8000/api/contract-reviews/contract-reviews");
    // console.log("resp",resp)
    // contractData(resp.data[0])
    setFormData(resp.data[0])
    }catch(err){
      console.log(err)
    }
  }
console.log(formData)

    useEffect(()=>{
     fetchContract();
    },[])


   
  
  // generatePDF();



  

  const navigate=useNavigate();
  const columns = [
    { header: 'File No.', accessor: 'leadId' },
    { header: 'Client Name', accessor: 'clientName' },
    { header: 'CR Status', accessor: 'crStatus' },
    { header: 'Certification Type', accessor: 'certificationType' },
    { header: 'Standards', accessor: 'standards' },
    { header: 'Zone', accessor: 'zone' },
    { header: 'Questionnaire Received Date', accessor: 'questionnaireNo' },
    { header: 'certification Type', accessor: 'certificationType' },
    { header: 'CR Approved Date', accessor: 'crApprovedDate' },
    { header: 'CR Prepared By', accessor: 'crPreparedBy' },
    { header: 'CR Approved By', accessor: 'crApprovedBy' },
    { header: 'Quotation Submission Date', accessor: 'quotationSubmissionDate' },
    { header: 'Order Received Date', accessor: 'orderReceivedDate' },
    { header: 'CR Modified By', accessor: 'crModifiedBy' },
  ];
  
    const [leadData, setLeadData] = useState([]);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(leadData);


    const fetchQuest=async ()=>{
      try{
        const response = await axios.get("http://localhost:8000/api/contract/gets")
        console.log(response.data)
        setLeadData(response.data);
        setFilteredData(response.data)
      }catch(err){
        console.error('Error fetching lead data:', err);
      }

    }

    useEffect(()=>{
      fetchQuest();
    },[])
  
    const handleSearch = () => {
      if (searchTerm.trim() === '') {
        setFilteredData(leadData);
      } else {
        const filtered = leadData.filter(item =>
          item.clientName.toLowerCase().includes(searchTerm.toLowerCase())
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
  
    const handleDelete =async (index) => {
      await axios.delete(`http://localhost:8000/api/contract/delete/${index}`)
      const newData = leadData.filter((contract) => contract.id !== index);
      console.log(newData)
      setLeadData(newData);
      setFilteredData(newData); // Update filtered data if search is active
    };
    const handleRoute=()=>{
        navigate("/business/contract/create")
    }

    const generatePDF = () => {
      const doc = new jsPDF();
      doc.text('IATF Contract Review Form', 105, 10, null, null, 'center');
  
      // General Information Section
      doc.text('General Information', 105, 20, null, null, 'center');
      doc.autoTable({
          startY: 30,
          body: [
              ['Organization’s Name', formData.organizationName || 'N/A'],
              ['Address', formData.address || 'N/A'],
              ['Scope / Activity', formData.scopeActivity || 'N/A'],
              ['Status', formData.applicationStatus || 'N/A'],
              ['Certification Type', formData.certificationType || 'N/A'],
              ['Standard', formData.standard || 'N/A'],
              ['Justification for Exclusion', formData.justificationForExclusion || 'N/A'],
              ['Is it a multisite organization?', formData.MultisiteOrganization ? 'Yes' : 'No'],
              ['Is it under Corporate Scheme?', formData.isUnderCorporateScheme ? 'Yes' : 'No'],
              ['Remarks', formData.remarks || 'N/A'],
          ],
      });
  
      // Accreditation Information Section
      doc.text('Accreditation Information', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
          startY: doc.autoTable.previous.finalY + 20,
          body: [
              ['Accreditation To Be Granted', formData.accreditationToBeGranted || 'N/A'],
              ['Status of the Application', formData.applicationStatus || 'N/A'],
              ['Certification Body', formData.certificationBody || 'N/A'],
              ['Certificate Expiry Date', formData.certificateExpiryDate || 'N/A'],
              ['Certificate Number', formData.certificateNumber || 'N/A'],
          ],
      });
  
      // Site Information Section
      doc.text('Site Information', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
          startY: doc.autoTable.previous.finalY + 20,
          body: [
              ['Main Site', formData.mainSite || 'N/A'],
              ['Site Extension', formData.usiSiteExtension || 'N/A'], // Changed from siteExtension to usiSiteExtension
              ['Standalone Remote Support Location (SRSL)', formData.usiSiteExtension || 'N/A'], // Adjust accordingly if you have a specific SRSL variable
          ],
      });
  
      // Mandays Information Section
      doc.text('Mandays Information', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
          startY: doc.autoTable.previous.finalY + 20,
          head: [['Site Name', 'Total Man Power', 'Manday', 'Stage1', 'Stage2/Renewal']],
          body: [
              [formData.mainSite || 'N/A', formData.mainSiteManPower || 'N/A', formData.mainSiteManday || 'N/A', formData.mainSiteStage1 || 'N/A', formData.mainSiteStage2 || 'N/A'], // Main Site Info
              [formData.usiSiteExtension || 'N/A', formData.manpowerAtSiteExtension || 'N/A', formData.mainSiteManday || 'N/A', '', ''], // Site Extension Info, empty Stage1 and Stage2
              ['SRSL Name', formData.manpowerAtSRSL || 'N/A', '', '', ''], // Adjust as necessary for SRSL
          ],
      });
  
      // Surveillance Information
      doc.text('Surveillance Information', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
          startY: doc.autoTable.previous.finalY + 20,
          head: [['Surveillance #', 'Onsite', 'Offsite']],
          body: [
              ['1', formData.surveillance1Onsite || 'N/A', formData.surveillance1Offsite || 'N/A'],
              ['2', formData.surveillance2Onsite || 'N/A', formData.surveillance2Offsite || 'N/A'],
              ['3', formData.surveillance3Onsite || 'N/A', formData.surveillance3Offsite || 'N/A'],
              ['4', formData.surveillance4Onsite || 'N/A', formData.surveillance4Offsite || 'N/A'],
              ['5', formData.surveillance5Onsite || 'N/A', formData.surveillance5Offsite || 'N/A'],
          ],
      });
  
      // Impartiality Assessments
      doc.text('Impartiality Assessments', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
          startY: doc.autoTable.previous.finalY + 20,
          body: [
              ['Possible Risk', 'Value'],
              ['Consultant to the firm', formData.consultantToFirm ? 'Yes' : 'No'],
              ['Organization’s Top Management part of the Board', formData.isTopManagementPartOfBoard ? 'Yes' : 'No'],
              ['Review on Conflict of Interest', formData.conflictOfInterestReview || 'N/A'],
          ],
      });
  
      // Footer Information
      doc.text('Comments / Remarks', 14, doc.autoTable.previous.finalY + 10);
      doc.autoTable({
          startY: doc.autoTable.previous.finalY + 20,
          body: [
              ['Prepared by', formData.preparedByName || 'N/A'],
              ['Approved by', formData.approvedByName || 'N/A'],
              ['Mark Usage', formData.markUsageComment ||'N/A'], // Mark Usage value
          ],
      });
  
      // Save the PDF
      doc.save('IATF_Contract_Review_Form.pdf');
  };
  // generatePDF();
  
    return (
      <>
        {/* <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Contract View
          </h2>
        </div> */}
        <Button onClick={generatePDF}>Generate Pdf</Button>
        <HeaderWithButton
          title="Contract View"
          buttonLabel="Create New Contract"
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
          <TableComponent data={filteredData} columns={columns} onDelete={handleDelete} type="contract"/>
        </div>
      </>
    );
  }
  
  export default Contract;