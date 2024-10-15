import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineReply } from 'react-icons/md';
import './LeadDetail.css';
import PopupForm from '../Modal/Poper';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';

const LeadDetail = () => {
  const { id } = useParams();
  const [files, setFiles] = useState({
    po: null,
    invoice: null,
  });
  const [lead, setLead] = useState(null);
  const [isPopup, setIsPopup] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState('');
  const navigate = useNavigate();
  const index = id;

  const currentUserId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  console.log(id," currentUserId",currentUserId)
  const handleRoute = () => {
    navigate('/business/contract/create', { state: { leadId: id } });
  };
  const show = () => {
    setIsPopup(true);
  };
  const handleRoute1 = () => {
    navigate('/business/quotation/form', { state: { leadId: id } });
  };

  const hide = () => {
    setIsPopup(false);
  };
  const fetchLead = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/lead/leads/${id}`,
      );
      console.log(response.data.lead);
      setLead(response.data.lead);
    } catch (error) {
      console.error('Failed to fetch lead data.', error);
    }
  };

  const fetchTransition = async () => {
    try {
      const resp = await axios.get('http://localhost:8000/api/transactions');
      console.log(resp.data.notifications);
    } catch (err) {
      console.log('error in fetch the data', err);
    }
  };

  const getComments = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/conversations',
      );
      console.log(response.data);
      setComments(response.data);
    } catch (error) {
      console.log('COMMENT API ERROR ', error);
    }
  };

  useEffect(() => {
    fetchLead();
  }, [id]);
  useEffect(() => {
    fetchTransition();
  }, []);

  useEffect(() => {
    getComments();
  }, [comment]);

  const handleFileChange = (e, type) => {
    setFiles({ ...files, [type]: e.target.files[0] });
  };

  // Handle drag-and-drop file changes
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); 
  };

  const handleFileUpload = async () => {
    const formData = new FormData();

    formData.append('poUpload', files.po);
    formData.append('invoiceUpload', files.invoice);
    formData.append('leadId', id);
    formData.append('approvalBy', false);

    try {
      const response = await axios.post(
        'http://localhost:8000/api/transactions/',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('File upload failed', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      const data = {
        comment: comment,
        leadId: id,
        commentUser: currentUserId,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        'http://localhost:8000/api/conversations/create',
        data,
        config,
      );
      if (response.error) {
        console.log('ADD COMMENT API ERROR...', response);
      } else {
        setComment('');
        console.log('ADD COMMENT API RESPONSE...', response.data);
      }
    } catch (error) {
      console.log('ADD COMMENT API ERROR...', error);
    }
  };

  if (!lead) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mt-5 family">
      <h4 className="text-black font-semibold mb-3 text-title-md2">
        Lead Detail
      </h4>
      <Row>
        <Col md={4}>
          <div className="p-3 bg-white mb-4 shadow-sm lead-detail-overview">
            <div className="mb-3">
              <h5 className="font-bold mb-3">Lead Details</h5>
              <div className="detail-item mb-2">
                <strong>Assigned To:</strong> {lead.firstName} {lead.lastName}
              </div>
              <div className="detail-item mb-2">
                <strong>Company Name:</strong> {lead.companyName}
              </div>
              <div className="detail-item mb-2">
                <strong>Lead Status:</strong> {lead.LeadStatus?.name}
              </div>
              <div className="detail-item mb-2">
                <strong>Lead Type:</strong> {lead.LeadType?.name}
              </div>
              <div className="detail-item mb-2">
                <strong>Source of Lead:</strong> {lead.SourceOFLead?.name}
              </div>
              <div className="detail-item mb-2">
                <strong>Designation:</strong> {lead.designation}
              </div>
              <div className="detail-item mb-2">
                <strong>Location:</strong> {lead.country}
              </div>
              {/* <div className="detail-item mb-2">
                <strong>Phone:</strong> {lead.phone}
              </div> */}
              <div className="detail-item mb-2">
                <strong>Mobile:</strong> {lead.requirementFor}
              </div>
              {/* <div className="detail-item mb-2">
                <strong>Quotation:</strong> {lead.quotation}
              </div> */}
              <div className="detail-item mb-2">
                <strong>Remarks:</strong> {lead.remarks}
              </div>
              <div className="mb-3">
                <Button
                  className="text-white dark:bg-white dark:text-black"
                  style={{ backgroundColor: '#152238' }}
                  onClick={show}
                >
                  {' '}
                  Questionnaire Form
                </Button>
                {isPopup && (
                  <PopupForm
                    onClose={hide}
                    onSuccess={fetchLead}
                    index={index}
                  />
                )}
              </div>
              <div className="mb-3">
                <Button
                  className="text-white dark:bg-white dark:text-black"
                  style={{ backgroundColor: '#152238' }}
                  onClick={handleRoute}
                >
                  {' '}
                  Contract Review/Application Review
                </Button>
              </div>
              <Button
                className="text-white dark:bg-white dark:text-black"
                style={{ backgroundColor: '#152238' }}
                onClick={handleRoute1}
              >
                {' '}
                Quotation Form
              </Button>
            </div>
          </div>
        </Col>

        <Col md={8}>
          <div className="p-3 shadow-sm bg-white">
            <div className="d-flex justify-content-between mb-3">
              <h6 className="text-black font-semibold">
                Comments ({comments.length})
              </h6>
              <Button
                variant="light border"
                className="mb-3"
                onClick={() => {
                  /* handle sorting/filtering */
                }}
              >
                Recent
              </Button>
            </div>
            <div>
              {comments.length > 0 && (
                <>
                  {comments?.map((comment, index) => (
                    <div
                      key={comment.id}
                      className={`comment-item mb-3 ${
                        index % 2 === 0 ? '' : 'ml-30'
                      }`}
                      style={index % 2 === 0 ? {} : { marginLeft: '30px' }}
                    >
                      <div className=" ">
                        <div className="d-flex align-items-center mb-2">
                          <span className="comment-avatar text-black ">
                            {' '}
                            {comment.User.firstName.slice(0, 1)}
                          </span>
                          <strong className="capitalize">
                            {comment.User.firstName} {comment.User.lastName}
                          </strong>
                          <span className="text-muted ms-auto">
                            {formatDistanceToNowStrict(
                              new Date(comment.createdBy),
                              {
                                addSuffix: true,
                              },
                            )}
                          </span>
                        </div>
                        <p className="mb-1 capitalize">
                          {/* {comment.text} */}
                          {comment.comment}
                        </p>
                        <Button
                          variant="link"
                          className="p-0 text-muted d-flex"
                          style={{ textDecoration: 'none' }}
                        >
                          <MdOutlineReply className="mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* <div className="text-center mt-3">
                <Button variant="link" className="text-muted">
                  Load more
                </Button>
              </div> */}
            </div>
            <Form onSubmit={handleAddComment} className="mt-4">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="d-flex justify-content-end mt-2">
                <Button
                  type="submit"
                  style={{ width: '100px', backgroundColor: '#152238' }}
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={4}>
          <div className="p-3 mb-4 bg-white" style={{ padding: '20px' }}>
            <strong className="mb-3">PO Upload</strong>
            <div className="custom-upload-area mb-3">
              <AiOutlineCloudUpload size={30} className="upload-icon mx-auto" />
              <p>Drop files here or click to upload.</p>
              <input
                type="file"
                id="poFile"
                onChange={(e) => handleFileChange(e, 'po')}
                style={{ display: 'none' }}
              />
              <Button
                style={{ background: '#152238', marginBottom: '5px' }}
                onClick={() => document.getElementById('poFile').click()}
                // disabled={uploading === 'po'}
              >
                {/* {uploading === 'po' ? 'Uploading...' : 'Upload PO'} */}
                PO
              </Button>
              {files.po && (
                <Button
                  style={{ background: '#152238' }}
                  onClick={() => handleFileUpload('po')}
                  className="ms-2"
                >
                  Upload PO
                </Button>
              )}
            </div>
          </div>
        </Col>

        <Col md={4}>
          <div className="p-3 mb-4 bg-white" style={{ padding: '20px' }}>
            <strong className="mb-3">Invoice Upload</strong>
            <div className="custom-upload-area mb-3">
              <AiOutlineCloudUpload size={30} className="upload-icon mx-auto" />
              <p>Drop files here or click to upload.</p>
              <input
                type="file"
                id="invoiceFile"
                onChange={(e) => handleFileChange(e, 'invoice')}
                style={{ display: 'none' }}
              />
              <Button
                style={{ background: '#152238', marginBottom: '5px' }}
                onClick={() => document.getElementById('invoiceFile').click()}
                // disabled={uploading === 'invoice'}
              >
                Invoice
                {/* {uploading === 'invoice' ? 'Uploading...' : 'Upload Invoice'} */}
              </Button>
              {files.invoice && (
                <Button
                  style={{ background: '#152238' }}
                  onClick={() => handleFileUpload('invoice')}
                  className="ms-2"
                >
                  Upload Invoice
                </Button>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LeadDetail;
