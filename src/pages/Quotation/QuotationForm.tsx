import { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import {useLocation } from 'react-router-dom';
const QuotationForm = () => {
    // Initialize state for the form fields
    const location=useLocation();
    // console.log(location.state?.leadId)
    const id=location.state?.leadId
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        quotationNo: '',
        clientName: '',
        revisionNumber: '',
        leadId:'',
        standards: '',
        certificationType: '',
        surveillanceType: '',
        requestedScope: '',
        businessActivity: '',
        applicationFees: 0,
        accreditationFees: 0,
        surveillanceAudit1Fees: 0,
        surveillanceAudit2Fees: 0,
        surveillanceAudit3Fees: 0,
        surveillanceAudit4Fees: 0,
        surveillanceAudit5Fees: 0,
        stage1AuditFees: 0,
        stage2AuditFees: 0,
        totalFees: 0,
        currencyType: '',
        isDiscountGiven: 'No',
        approvedQuotationAmount: 0,
    });
    formData.leadId=id

    const [dat,setDat]=useState({
        mainSiteManday:0,
        mainSiteStage1:'',
            mainSiteStage2:'',
            mainSiteSA1:'',
            mainSiteSA2:''
    })

    const [zone, setZone] = useState([]);
    const [surv, setSurv] = useState([]);
    const [cert, setCert] = useState([]);
    const [contract, setContract] = useState([]);
    const [curr,setCurr]=useState([]);
    const [stand,setStand]=useState([]);
    const [stand1,setStand1]=useState([]);
    const [quotationData,setQuotationData]=useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                


                const resp1 = await axios.get('http://localhost:8000/api/questionnaire/zone');
                setZone(resp1.data.data);

                const resp2 = await axios.get('http://localhost:8000/api/questionnaire/surveillance');
                setSurv(resp2.data.data);

                const resp3 = await axios.get('http://localhost:8000/api/questionnaire/certification');
                setCert(resp3.data.data);

                const resp4 = await axios.get('http://localhost:8000/api/questionnaire/contractreview');
                setContract(resp4.data.data);

                const resp5=await axios.get('http://localhost:8000/api/quotation/currency')
                setCurr(resp5.data.data)

                const resp6=await axios.get('http://localhost:8000/api/auditor/auditorStandards');
                // console.log("data",resp6.data)
                setStand(resp6.data);

              

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []); 


    const getData=async()=>{
       try{
        const resp=await axios.get(`http://localhost:8000/api/contract-reviews/contract-reviews/${id}`);
        // console.log("response",resp.data);
       setDat(resp?.data)

       }catch(err){
        console.log(err)
       }
    }

    const getDummy=async()=>{
        try{
               const dummy=await axios.get("http://localhost:8000/api/formsIATF/dummy-price");
              console.log("dummy",dummy.data);
               setStand1(dummy?.data)
        }catch(err){
            console.log("dummy",err)

        }
    }

    const quotation=async()=>{
      try{
        const resp=await axios.post("http://localhost:8000/api/audit-calculation/calculateQuotation",{
            stage1auditManDays:(dat.mainSiteStage1||2), employeeCount:(dat.mainSiteManday || 154), standard:stand1[8]?.standard,stage2auditManDays:(dat.mainSiteStage2|| 5),surveillance1AuditMandays:(dat.mainSiteSA1|| 3.5), surveillance2AuditMandays:(dat.mainSiteSA2|| 3.5)
        })
        // stage1auditManDays:(dat.mainSiteStage1||2), employeeCount:(dat.mainSiteManday || 154), standard:stand1[8]?.standard,stage2auditManDays:(dat.mainSiteStage2|| 5),surveillance1AuditMandays:(dat.mainSiteSA1|| 3.5), surveillance2AuditMandays:(dat.mainSiteSA2|| 3.5)
        console.log("respQuotation",resp?.data)
        setQuotationData(resp?.data)


      }catch(err){
        console.log("error in Quoation",err)
      }

    }
    // console.log(stand1[8].standard)

    useEffect(()=>{
      
        getData();
        getDummy();
          
    },[])

    useEffect(()=>{
        quotation();
    },[])

    const getFeeCategory = () => {
        return dat.mainSiteManday < 65 ? "1-65" : "65+";
      };

    //  console.log( stand1[8]?.accreditationFees[getFeeCategory()]||0 )  
    //  console.log("DATA",(stand1[8]?.auditFeesPerManday[getFeeCategory()]*((dat?.mainSiteStage1 ||2)*(1/2))*(1/2)))
    //  console.log(((dat?.mainSiteStage1 ||2)*(1/2)))

    // Handle input change
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataToSubmit = {
                ...formData,
                leadId:Number(formData.leadId),
                revisionNumber:Number(formData.revisionNumber),
                applicationFees: parseFloat(formData.applicationFees),
                accreditationFees: parseFloat(formData.accreditationFees),
                surveillanceAudit1Fees: parseFloat(formData.surveillanceAudit1Fees),
                surveillanceAudit2Fees: parseFloat(formData.surveillanceAudit2Fees),
                surveillanceAudit3Fees: parseFloat(formData.surveillanceAudit3Fees),
                surveillanceAudit4Fees: parseFloat(formData.surveillanceAudit4Fees),
                surveillanceAudit5Fees: parseFloat(formData.surveillanceAudit5Fees),
                stage1AuditFees: parseFloat(formData.stage1AuditFees),
                stage2AuditFees: parseFloat(formData.stage2AuditFees),
                totalFees: parseFloat(formData.totalFees),
                approvedQuotationAmount: parseFloat(formData.approvedQuotationAmount),
            };
            await axios.post('http://localhost:8000/api/quotation/create', dataToSubmit);
            navigate("/business/quotation")
        } catch (error) {
            console.error('Error submitting quotation:', error);
        }
    };

    return (
        <Container>
            <h1 className="pb-4 text-black font-bold" style={{ fontSize: '2rem' }}>Quotation Information</h1>

            <h5 className="text-black pb-4" style={{ fontSize: '1.5rem', fontWeight: '500' }}>General Information</h5>
            <Form className="text-black font-bold" onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col md={4}>
                        <Form.Group controlId="quotationNo">
                            <Form.Label>Quotation No</Form.Label>
                            <Form.Control
                                type="text"
                                name="quotationNo"
                                placeholder="IRQS/QT-00035"
                                value={formData.quotationNo}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="clientName">
                            <Form.Label>Client Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="clientName"
                                placeholder="IRQS"
                                value={formData.clientName}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="revisionNumber">
                            <Form.Label>Revision Number</Form.Label>
                            <Form.Control
                                type="number"
                                name="revisionNumber"
                                placeholder="0"
                                value={formData.revisionNumber}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="leadId">
                            <Form.Label>Lead</Form.Label>
                            <Form.Control
                                type="text"
                                name="leadId"
                                placeholder=""
                                value={formData.leadId}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                    <Form.Group controlId="standards">
                    <Form.Label>Standards</Form.Label>
                    <Form.Select
                        name="standards"
                        value={formData.standards}
                        onChange={handleChange}
                    >
                        <option value="">Select a standard</option> {/* Placeholder option */}
                        {
                            stand.map(src =>(
                                <option key={src.name} value={src.name}>{src.name}</option>
                            ))
                        }
                        {/* Add more options as needed */}
                    </Form.Select>
                    </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="certificationType">
                            <Form.Label>Certification Type</Form.Label>
                            <Form.Select
                                
                                name="certificationType"
                                value={formData.certificationType}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Please select</option>
                                {cert.map(src => (
                                    <option key={src.name} value={src.name}>{src.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="surveillanceType">
                            <Form.Label>Surveillance Type</Form.Label>
                            <Form.Select
                                name="surveillanceType"
                                value={formData.surveillanceType}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Please select</option>
                                {surv.map(src => (
                                    <option key={src.name} value={src.name}>{src.name}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="requestedScope">
                            <Form.Label>Requested Scope</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="requestedScope"
                                rows={3}
                                value={formData.requestedScope}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="businessActivity">
                            <Form.Label>Business Activity</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="businessActivity"
                                rows={3}
                                value={formData.businessActivity}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <h5 className="text-black pb-4" style={{ fontSize: '1.5rem', fontWeight: '500' }}>Mandays Information</h5>
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
                            <td>BRC FOOD</td>
                            <td>IATF</td>
                            <td>{dat.mainSiteStage1 ||2}</td>
                            <td>{dat.mainSiteStage2|| 5}</td>
                            <td>{dat.mainSiteSA1|| 3.5}</td>
                            <td>{dat.mainSiteSA2|| 3.5}</td>
                        </tr>
                    </tbody>
                </Table>

                <h5 className="text-black pb-4" style={{ fontSize: '1.5rem', fontWeight: '500' }}>Payment Information</h5>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group controlId="applicationFees">
                            <Form.Label>Application Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="applicationFees"
                                placeholder="0"
                                value={ quotationData?.applicationFees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="accreditationFees">
                            <Form.Label>Accreditation Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="accreditationFees"
                                placeholder="0"
                                value={quotationData?.accreditationFees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    


                   
                </Row>
                <Row>
                <Col md={6}>
                        <Form.Group controlId="stage1AuditFees">
                            <Form.Label>Stage 1 Audit Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="stage1AuditFees"
                                placeholder="0"
                                value={quotationData?.stage1AuditFees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group controlId="stage2AuditFees">
                            <Form.Label>Stage 2/Renewal Audit Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="stage2AuditFees"
                                placeholder="0"
                                value={quotationData?.stage2AuditFees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                <Col md={4}>
                        <Form.Group controlId="surveillanceAudit1Fees">
                            <Form.Label>Surveillance Audit #1 Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="surveillanceAudit1Fees"
                                placeholder="0"
                                value={quotationData.surveillance1AuditFees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="surveillanceAudit2Fees">
                            <Form.Label>Surveillance Audit #2 Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="surveillanceAudit2Fees"
                                placeholder="0"
                                value={quotationData.surveillance2AuditFees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="surveillanceAudit3Fees">
                            <Form.Label>Surveillance Audit #3 Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="surveillanceAudit3Fees"
                                placeholder="0"
                                value={formData.surveillanceAudit3Fees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="surveillanceAudit4Fees">
                            <Form.Label>Surveillance Audit #4 Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="surveillanceAudit4Fees"
                                placeholder="0"
                                value={formData.surveillanceAudit4Fees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="surveillanceAudit5Fees">
                            <Form.Label>Surveillance Audit #5 Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="surveillanceAudit5Fees"
                                placeholder="0"
                                value={formData.surveillanceAudit5Fees}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    {/* <Col md={4}>
                        <Form.Group controlId="stage1AuditFees">
                            <Form.Label>Stage 1 Audit Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="stage1AuditFees"
                                placeholder="0"
                                value={(stand1[8]?.accreditationFees[getFeeCategory()]||0)*(dat.mainSiteStage1 ||2)}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="stage2AuditFees">
                            <Form.Label>Stage 2/Renewal Audit Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="stage2AuditFees"
                                placeholder="0"
                                value={(stand1[8]?.accreditationFees[getFeeCategory()]||0)*(dat.mainSiteStage2 ||5)}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col> */}
                    <Col md={4}>
                        <Form.Group controlId="totalFees">
                            <Form.Label>Total Fees</Form.Label>
                            <Form.Control
                                type="number"
                                name="totalFees"
                                placeholder="0"
                                 value={quotationData?.totalQuotation}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row className="mb-3">
                    <Col md={4}>
                    <Form.Group controlId="currencyType">
                    <Form.Label>Currency Type</Form.Label>
                    <Form.Control
                        as="select"
                        name="currencyType"
                        value={formData.currencyType}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Please select</option>
                        {curr.map(src => (
                            <option key={src.name} value={src.name}>{src.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group controlId="isDiscountGiven">
                            <Form.Label>Discount Given</Form.Label>
                            <Form.Check
                                type="radio"
                                label="Yes"
                                name="isDiscountGiven"
                                value="true"
                                checked={formData.isDiscountGiven === 'true'}
                                onChange={handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="No"
                                name="isDiscountGiven"
                                value="false"
                                checked={formData.isDiscountGiven === 'false'}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                    {formData.isDiscountGiven === 'true' && (
                        <Row>
                        <Col md={4}>
                            <Form.Group controlId="discountAmount">
                            <Form.Label>Discount Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="discountAmount"
                                value={formData.discountAmount}
                                onChange={handleChange}
                                placeholder="Enter discount amount"
                            />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="discountPercentage">
                            <Form.Label>Discount Percentage</Form.Label>
                            <Form.Control
                                type="text"
                                name="discountPercentage"
                                value={formData.discountPercentage}
                                readOnly
                            />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Group controlId="reasonForDiscount">
                            <Form.Label>Reason for Discount</Form.Label>
                            <Form.Control
                                type="text"
                                name="reasonForDiscount"
                                value={formData.reasonForDiscount}
                                onChange={handleChange}
                                placeholder="Enter reason for discount"
                            />
                            </Form.Group>
                        </Col>
                        </Row>
                    )}

                    <Col md={4}>
                        <Form.Group controlId="approvedQuotationAmount">
                            <Form.Label>Approved Quotation Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="approvedQuotationAmount"
                                placeholder="0"
                                value={formData.approvedQuotationAmount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-end">
                    <Button variant="secondary" className="me-2 text-black" type="button">Close</Button>
                    <Button style={{ background: '#152238' }} type="submit">Save Changes</Button>
                </div>
            </Form>
        </Container>
    );
};

export default QuotationForm;
