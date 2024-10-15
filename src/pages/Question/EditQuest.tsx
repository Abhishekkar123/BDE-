import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function EditQuest() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        questionnaireNo: '',
        clientName: '',
        zone: '',
        certificationType: '',
        surveillanceType: '',
        readinessDate: '',
        selectSites: '',
        leadId: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/questionnaire/get/${id}`);
                setFormData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        getData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/questionnaire/update/${id}`, formData);
            navigate('/settings'); // Redirect after successful update
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <div className='mb-4'>
                <h4 className='text-black font-semibold' style={{ fontSize: '30px' }}>View/Edit Questionnaire</h4>
            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formQuestionnaireNo'>
                    <Form.Label>Questionnaire No.</Form.Label>
                    <Form.Control
                        type='text'
                        name='questionnaireNo'
                        value={formData.questionnaireNo}
                        onChange={handleChange}
                        placeholder='Enter questionnaire number'
                    />
                </Form.Group>

                <Form.Group controlId='formClientName'>
                    <Form.Label>Client Name</Form.Label>
                    <Form.Control
                        type='text'
                        name='clientName'
                        value={formData.clientName}
                        onChange={handleChange}
                        placeholder='Enter client name'
                    />
                </Form.Group>

                <Form.Group controlId='formZone'>
                    <Form.Label>Zone</Form.Label>
                    <Form.Control
                        type='text'
                        name='zone'
                        value={formData.zone}
                        onChange={handleChange}
                        placeholder='Enter zone'
                    />
                </Form.Group>

                <Form.Group controlId='formCertificationType'>
                    <Form.Label>Certification Type</Form.Label>
                    <Form.Control
                        type='text'
                        name='certificationType'
                        value={formData.certificationType}
                        onChange={handleChange}
                        placeholder='Enter certification type'
                    />
                </Form.Group>

                <Form.Group controlId='formSurveillanceType'>
                    <Form.Label>Surveillance Type</Form.Label>
                    <Form.Control
                        type='text'
                        name='surveillanceType'
                        value={formData.surveillanceType}
                        onChange={handleChange}
                        placeholder='Enter surveillance type'
                    />
                </Form.Group>

                <Form.Group controlId='formReadinessDate'>
                    <Form.Label>Readiness Date</Form.Label>
                    <Form.Control
                        type='date'
                        name='readinessDate'
                        value={formData.readinessDate}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId='formSelectSites'>
                    <Form.Label>Select Sites</Form.Label>
                    <Form.Control
                        type='text'
                        name='selectSites'
                        value={formData.selectSites}
                        onChange={handleChange}
                        placeholder='Enter select sites'
                    />
                </Form.Group>

                <Form.Group controlId='formLeadId'>
                    <Form.Label>Lead ID</Form.Label>
                    <Form.Control
                        type='number'
                        name='leadId'
                        value={formData.leadId}
                        onChange={handleChange}
                        placeholder='Enter lead ID'
                    />
                </Form.Group>

                <Button type='submit' className='mt-3 ' style={{background:'#152238'}}>
                    Save Changes
                </Button>
            </Form>
        </>
    );
}

export default EditQuest;
