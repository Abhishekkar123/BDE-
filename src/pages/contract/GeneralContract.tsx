import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
function GeneralContract() {
    const navigate=useNavigate()
    const handleRoute=()=>{
        //   navigate("/questionnaire/form")
        console.log("hello")
    }
  return (
    <div>
      <h2 className="font-bold text-black mb-2 fs-4">General Information</h2>
      <Form className="fw-normal text-black mx-2">
        {/* Organization Name and Address */}
        <Row className="mb-2">
          <Col md={6}>
            <Form.Group controlId="organizationName">
              <Form.Label>Organization's Name</Form.Label>
              <Form.Control
                type="text"
                name="organizationName"
                placeholder="Enter organization name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Scope/Activity and Status */}
        <Row className="mb-2">
          <Col md={6}>
            <Form.Group controlId="scopeActivity">
              <Form.Label>Scope/Activity</Form.Label>
              <Form.Control
                type="text"
                name="scopeActivity"
                placeholder="Enter scope or activity"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                placeholder="Enter status"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Certification Type */}
        <Form.Group controlId="certificationType" className="mb-2">
          <Form.Label>Certification Type</Form.Label>
          <Form.Control
            type="text"
            name="certificationType"
            placeholder="Enter certification type"
          />
        </Form.Group>

        {/* Standards (Checkboxes) */}
        <Form.Group controlId="standards" className="mb-2">
  <Form.Label>Standard(s) (Select the applicable)</Form.Label>
  <Form.Control as="select" >
    <option value="">Select Value</option>
    <option value="qmsIso9001" onChange={handleRoute}>QMS (ISO 9001)</option>
    <option value="qmsEomsIso21001">QMS-EOMS (ISO 21001)</option>
    <option value="emsIso14001">EMS (ISO 14001)</option>
  </Form.Control>
</Form.Group>

        {/* Stage 1 Audit */}
        <Form.Group controlId="stage1Audit" className="mb-2">
          <Form.Label>
            Stage 1 audit during Renewal audit if any major changes in the scope activity
          </Form.Label>
          <Form.Control
            as="textarea"
            name="stage1Audit"
            rows={2}
            placeholder="Enter details about Stage 1 audit"
          />
        </Form.Group>

        {/* Justification for not applicable clause */}
        <Form.Group controlId="justification" className="mb-2">
          <Form.Label>
            Justification for not applicable clause(s), specifically for Design & Development
          </Form.Label>
          <Form.Control
            as="textarea"
            name="justification"
            rows={2}
            placeholder="Enter justification"
          />
        </Form.Group>

        {/* Comment on usage of Mark/Logo */}
        <Form.Group controlId="commentOnUsage" className="mb-2">
          <Form.Label>
            Comment on usage of Mark/Logo, display of certificate for its appropriateness and validity on the Client's website
          </Form.Label>
          <Form.Control
            as="textarea"
            name="commentOnUsage"
            rows={2}
            placeholder="Enter comment on mark/logo usage"
          />
        </Form.Group>

        {/* Checkbox options for logo usage */}

        <Form.Group controlId="logoUsage" className="mb-2">
        <Form.Label>Logo Usage</Form.Label>
        <Form.Control as="select" >
        <option value="" disabled>Please select</option>
    <option value="usingLogo">Using Mark/Logo on website</option>
    <option value="misusingLogo">Misusing Mark/Logo on website</option>
    <option value="notUsingLogo">Not using Mark/Logo on website</option>
  </Form.Control>
</Form.Group>
      </Form>
    </div>
  );
}

export default GeneralContract;
