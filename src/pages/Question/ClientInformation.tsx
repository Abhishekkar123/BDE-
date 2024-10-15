import React, { useEffect, useState } from "react";
import { Form, Button, Table, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable"
const ClientInformation = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    certificationBody: "",
    standardStatus: "",
    contractDetailsCB: "",
    scopeActivity:'',
    certifiedActivitiesScope:'',
    certificateIssuedByAccreditedBody:'',
    validCertificateCopy:'',
    certificationCycleStage:'',
    ncrStatus:'',
    auditPlanReview:'',
    siteTransferStatus:'',
    siteSupportLocationCovered:'',
    complaintsReceivedActionTaken:'',
    regulatoryEngagement:'',
    transferReason:'',
    previousCertificationBodyCommunication:'',
    clientVisitVerification:'',
    bodyCommunication:'',
    preTransferInfoSatisfactory:'',
    recommendation:'',
    markDisplayVerified:'', 
    preparedBy:'',
    preparedSignature:'',
    preparedDate:'',
    approvedBy:'',
    approvedSignature:'',
    approvedDate:'',
    
  });


  useEffect(()=>{
   const fetchInfo=async()=>{

    try{
        const resp= await axios.get("http://localhost:8000/api/certification-transfers/");
    //  navigate("/dashboard")
    setFormData(resp.data[0])
    console.log(resp.data[0])
    }catch(err){
        console.log(err)

    }

   };
    fetchInfo();
  },[])
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic here

    try{
    await axios.put("http://localhost:8000/api/certification-transfers/",formData);
    //  navigate("/dashboard")
    // console.log(resp)

      // console.log("res waka",resp)

    }catch(err){

      console.log(err)
    }
  };


  const generatePDF = () => {
    const doc = new jsPDF("p", "mm", "a4");
    doc.setFontSize(16); // Increase the font size for the title

// Title
doc.text("Certificate Transfer Verification Checklist", 105, 20, null, null, "center");

// Reset font size for the rest of the document
doc.setFontSize(12);

// Create a table for Basic Information
doc.autoTable({
  startY: 30, // Position of the table
  head: [['Field', 'Details']], // Table headers
  body: [
    ['Organization Name', formData.organizationName],
    ['Issuing Certification Body', formData.certificationBody],
    ['Standard / Status', formData.standardStatus],
    ['Contact Details of CB', formData.contractDetailsCB],
    ['Scope / Activity', formData.scopeActivity],
  ],
  headStyles: {
    fillColor: [21, 51, 136], // Apply header background color (same as title color)
    // textColor: [255, 255, 255], // White text for the header
  }, 
});
    // Add a section header
    doc.setFontSize(12);
    doc.text("Verification Details", 10, 80);

    // Verification Details in tabular format
    doc.autoTable({
      startY: 85,
      head: [
        [
          "Sr. No.",
          "Particulars",
          "Reference Documents",
          "Verification Comments",
        ],
      ],
      body: [
        [
          "01",
          "Check client’s certified activities fall within the accredited scope of IRQS",
          "Accreditation Schedule",
          formData.certifiedActivitiesScope,
        ],
        [
          "02",
          "Valid certificate copy attached",
          "Certificate Copy",
          formData.validCertificateCopy,
        ],
        [
          "03",
          "Stage of certification cycle identified",
          "Certification Cycle Details",
          formData.certificationCycleStage,
        ],
        [
          "04",
          "NCR Status",
          "NCR Reports",
          formData.ncrStatus,
        ],
        [
          "05",
          "Audit Plan Reviewed",
          "Audit Plan Document",
          formData.auditPlanReview,
        ],
        [
          "06",
          "Site Transfer Status",
          "Transfer Details",
          formData.siteTransferStatus,
        ],
        [
          "07",
          "Support location of the site covered",
          "Site Support Documents",
          formData.siteSupportLocationCovered,
        ],
        [
          "08",
          "Complaints received / actions taken",
          "Complaints Log",
          formData.complaintsReceivedActionTaken,
        ],
        [
          "09",
          "Regulatory / Statutory Engagement",
          "Regulatory Documents",
          formData.regulatoryEngagement,
        ],
        [
          "10",
          "Reason for transfer",
          "Transfer Request Document",
          formData.transferReason,
        ],
        [
          "11",
          "Communication with previous certification body",
          "Correspondence",
          formData.previousCertificationBodyCommunication,
        ],
        [
          "12",
          "Client Visit / Verification",
          "Visit Reports",
          formData.clientVisitVerification,
        ],
        [
          "13",
          "Communication with body",
          "Correspondence",
          formData.bodyCommunication,
        ],
        [
          "14",
          "Pre-transfer information satisfactory",
          "Pre-transfer Checklist",
          formData.preTransferInfoSatisfactory,
        ],
        [
          "15",
          "Recommendation",
          "Recommendation Documents",
          formData.recommendation,
        ],
        [
          "16",
          "Mark Display Verified",
          "Verification Records",
          formData.markDisplayVerified,
        ],
      ],
    });
    const finalCommentsY = doc.lastAutoTable.finalY + 20;

    // Recommendations and Final Comments
    doc.autoTable({
      startY: finalCommentsY, // Position of the new table
      head: [['Prepared By', 'Prepared Date', 'Approved By', 'Approved Date']], // Table headers
      body: [
        [
          formData.preparedBy,
          formData.preparedDate.split("T")[0],
          formData.approvedBy, // Extract the date from approvedBy
          formData.approvedDate.split("T")[0], // Extract the date from approvedDate
        ]
      ],
      headStyles: {
        fillColor: [21, 51, 136], // Same color as title and previous headers
        // White text for headers
      },
    });
    doc.save("certificate_transfer_checklist.pdf");
  };


  return (
    <div >
      <div className="d-flex justify-content-between mb-4">
      <h2 className="font-bold text-black  p-2 fs-4">Annexure-2 Certificate transfer Verification CheckList</h2>
      <Button  onClick={generatePDF} className="bg-success" >
          Download PDF
        </Button>
      </div>
      <Form onSubmit={handleSubmit} className="fw-normal text-black mx-2">
        <Row className="mb-2">
          <Col md={6}>
            <Form.Group controlId="organizationName">
              <Form.Label>Organization's Name</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                placeholder="Enter organization name"
                value={formData.organizationName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="certificationBody">
              <Form.Label>Name of the Issuing Certification Body</Form.Label>
              <Form.Control
                type="text"
                name="certificationBody"
                placeholder="Enter certification body"
                value={formData.certificationBody}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col md={6}>
            <Form.Group controlId="standardStatus">
              <Form.Label>Standard / Status</Form.Label>
              <Form.Control
                type="text"
                name="standardStatus"
                placeholder="Enter standard or status"
                value={formData.standardStatus}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="contractDetailsCB">
              <Form.Label>Contact Details of CB</Form.Label>
              <Form.Control
                type="text"
                name="contractDetailsCB"
                placeholder="Enter contact details"
                value={formData.contractDetailsCB}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="scopeActivity">
              <Form.Label>Scope/Activity</Form.Label>
              <Form.Control
                type="text"
                name="scopeActivity"
                placeholder="Enter Scope"
                value={formData.scopeActivity}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          </Row>

      <div className=" mt-5">
      <h2>Receipt of Request to Transfer</h2>
      <Table bordered>
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Particulars</th>
            <th>Reference Documents</th>
            <th>Verification Comments</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Check client’s certified activities fall within the accredited scope of IRQS</td>
            <td>Accreditation Schedule</td>
            <td >
                    <Form.Control
                      type="text"
                      name="certifiedActivitiesScope"
                      placeholder="Enter comments"
                      value={formData.certifiedActivitiesScope}
                      onChange={handleChange}
                    />
                  </td >
          </tr>
          <tr>
            <td>02</td>
            <td>Check current certificate is issued by an accredited certification body (Certification body’s association with accreditation forums such as PAC, ILAAC, IAF MLA, etc.)</td>
            <td>Website of Accreditation Body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="certificateIssuedByAccreditedBody"
                      placeholder="Enter comments"
                      value={formData.certificateIssuedByAccreditedBody}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>03</td>
            <td>Copy of the current and valid certificate</td>
            <td>Certificate issued by the previous certifying body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="validCertificateCopy"
                      placeholder="Enter comments"
                      value={formData.validCertificateCopy}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>04</td>
            <td>
              Current stage in the certification cycle:
              <ul>
                <li>Date of Last Audit conducted</li>
                <li>Last audit type [Stage 2, SA1, SA2, etc.]</li>
                <li>To collect the Audit Reports & findings of the last 3 Audits conducted</li>
              </ul>
            </td>
            <td>Audit report issued by the previous certifying body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="certificationCycleStage"
                      placeholder="Enter comments"
                      value={formData.certificationCycleStage}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>05</td>
            <td>
              Open or Closed out NCR where applicable (copy)
              <ul>
                <li>If open, plan a pre-transfer visit to confirm the validity of the certification</li>
              </ul>
            </td>
            <td>NC report issued by the previous certifying body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="ncrStatus"
                      placeholder="Enter comments"
                      value={formData.ncrStatus}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>06</td>
            <td>Review the Audit plan and Audit programme in the previous audit report</td>
            <td>Audit Plan & Programme issued by the previous certifying body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="auditPlanReview"
                      placeholder="Enter comments"
                      value={formData.auditPlanReview}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>07</td>
            <td>Check whether the sites wishing to transfer certification hold a valid accredited certification</td>
            <td>Certificate issued by the previous certifying body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="siteTransferStatus"
                      placeholder="Enter comments"
                      value={formData.siteTransferStatus}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>08</td>
            <td>Do all the site(s) support locations and HO covered under certification of previous certification body?</td>
            <td>Audit report issued by the previous certifying body</td>
            <td >
                    <Form.Control
                      type="text"
                      name="siteSupportLocationCovered"
                      placeholder="Enter comments"
                      value={formData.siteSupportLocationCovered}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>09</td>
            <td>Complaints received and action taken</td>
            <td>Complaint Log maintained, evidence of communication with the complainee</td>
            <td >
                    <Form.Control
                      type="text"
                      name="complaintsReceivedActionTaken"
                      placeholder="Enter comments"
                      value={formData.complaintsReceivedActionTaken}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>10</td>
            <td>Any current engagement by the organization with the regulatory bodies in respect of legal compliance</td>
            <td>Declaration by the client</td>
            <td >
                    <Form.Control
                      type="text"
                      name="regulatoryEngagement"
                      placeholder="Enter comments"
                      value={formData.regulatoryEngagement}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>11</td>
            <td>Details of the reason(s) for seeking transfer</td>
            <td>Letter from client</td>
            <td >
                    <Form.Control
                      type="text"
                      name="transferReason"
                      placeholder="Enter comments"
                      value={formData.transferReason}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>12</td>
            <td>
              Details of communication with the previous issuing Certification Body (CB):
              <ul>
                <li>Date and mode of communication</li>
                <li>Person communicated</li>
                <li>Any outstanding payment</li>
                <li>Outcome of communication</li>
              </ul>
              If it is not possible to communicate with the previous CB, the reasons shall be recorded.
            </td>
            <td>Correspondence with previous CB</td>
            <td >
                    <Form.Control
                      type="text"
                      name="previousCertificationBodyCommunication"
                      placeholder="Enter comments"
                      value={formData.previousCertificationBodyCommunication}
                      onChange={handleChange}
                    />
                  </td>
          </tr>
          <tr>
            <td>13</td>
            <td>
              Whether the verification has been done through a visit to the client? If not, the justification for the same.
            </td>
            <td>Not applicable</td>
            <td>
              <input type="checkbox" id="yes" name="clientVisitVerification" value="yes" /> Yes
              <input type="checkbox" id="no" name="clientVisitVerification" value="no" className="ml-3"/> No
            </td>
          </tr>
          <tr>
            <td>14</td>
            <td>Whether any communication has been made up with the certifying body? If not, the reasons thereof.</td>
            <td>E-mail communication or Telephonic conversion</td>
            <td>
              <input type="checkbox" id="yes" name="bodyCommunication" value="yes" /> Yes
              <input type="checkbox" id="no" name="bodyCommunication" value="no" className="ml-3"/> No
            </td>
          </tr>
          <tr>
            <td>15</td>
            <td>
              Is the available pre-transfer information satisfactory? If not, the client organization shall be treated as a new client.
            </td>
            <td >
                    {/* <Form.Control
                      type="text"
                      name="preTransferInfoSatisfactory"
                      placeholder="Enter comments"
                      value={formData.preTransferInfoSatisfactory}
                      onChange={handleChange}
                    /> */}
                  </td>
            <td>
              <input type="checkbox" id="yes" name="preTransferSatisfactory" value="yes" /> Yes
              <input type="checkbox" id="no" name="preTransferSatisfactory" value="no" className="ml-3"/> No
            </td>
          </tr>
          <tr>
            <td>16</td>
            <td>Based on the above information, the reviewer recommends:</td>
            <td >
                    {/* <Form.Control
                      type="text"
                      name="recommendation"
                      placeholder="Enter comments"
                      value={formData.recommendation}
                      onChange={handleChange}
                    /> */}
                  </td>
            <td>
              <input type="checkbox" id="transferCertification" name="transferCertification" value="yes" /> Transfer of Certification
              <input type="checkbox" id="newClient" name="newClient" value="no" className="ml-3"/> Treated as a New Client
            </td>
          </tr>
          <tr>
            <td>17</td>
            <td>Usage of Logo / Mark Display of Certificate to be verified by using the Client’s website</td>
            <td>Client's website</td>
            <td>
              <input type="checkbox" id="logoVerified" name="logoVerified" value="yes" /> Yes
              <input type="checkbox" id="logoNotVerified" name="logoNotVerified" value="no" className="ml-3"/> No
            </td>
          </tr>
            <tr>
            <td>Prepared by</td>
                <td>
                  <Form.Group controlId="preparedBy">
                    <Form.Control
                      type="text"
                      name="preparedBy"
                      placeholder="Enter name"
                      value={formData.preparedBy}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group controlId="preparedSignature">
                    <Form.Control
                      type="text"
                      name="preparedSignature"
                      placeholder="Enter signature"
                      value={formData.preparedSignature}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group controlId="preparedDate">
                    <Form.Control
                      type="date"
                      name="preparedDate"
                      value={formData.preparedDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
              </tr>

            <tr>
                <td>Approved by</td>
                <td>
                  <Form.Group controlId="approvedBy">
                    <Form.Control
                      type="text"
                      name="approvedBy"
                      placeholder="Enter name"
                      value={formData.approvedBy}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group controlId="approvedSignature">
                    <Form.Control
                      type="text"
                      name="approvedSignature"
                      placeholder="Enter signature"
                      value={formData.approvedSignature}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group controlId="approvedDate">
                    <Form.Control
                      type="date"
                      name="approvedDate"
                      value={formData.approvedDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>

    <div  className="d-flex justify-content-end mx-2">
        <Button style={{background:'#002d62'}} type="submit" >
          Submit
        </Button>
        
        </div>
      </Form>
    </div>
  );
};

export default ClientInformation;