import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const LeadFormPopup = ({ onClose,onSuccess }) => {
  const [formData, setFormData] = useState({
    requirementFor:'',
    leadFor: '',
    qualification:'',
    sourceOfLead: '',
    leadType: '',
    companyName: '',
    firstName: '',
    lastName: '',
    contactPerson: '',
    mobileNo: '',
    designation: '',
    country:'',
    state:'',
    city:'',
    remarks: '',
    assignTo: ''
  });
  const [leadStatus, setLeadStatus] = useState([]);
  const [leadTypes, setLeadTypes] = useState([]);
  const [sourceOfLeads, setSourceOfLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const[qualify,setQualify]=useState([])

  const token=localStorage.getItem('token')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("http://localhost:8000/api/lead/seed-lead");
        const response= await axios.get("http://localhost:8000/api/lead/qualify");
          setQualify(response.data.data.qualify);
       console.log("resp",resp)
        setLeadStatus(resp.data.data.leadStatuses);
        setLeadTypes(resp.data.data.leadTypes);
        setSourceOfLeads(resp.data.data.sourceOfLeads);
        const userResp = await axios.get("http://localhost:8000/users");
        setUsers(userResp.data);
        console.log(userResp.data)
      } catch (err) {
        console.log("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      requirementFor:formData.requirementFor,
      leadStatusId: Number(formData.leadFor),
      sourceOfLeadId: Number(formData.sourceOfLead),
      leadTypeId: Number(formData.leadType),
      leadQualification:formData.qualification,
      companyName: formData.companyName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactPerson:Number(formData.contactPerson),
      mobile: formData.mobileNo,
      email: formData.emailId,
      password:formData.password,
      designation: formData.designation,
     country:formData.country,
     state:formData.state,
     city:formData.city,
      remarks: formData.remarks,
      assignTo: Number(formData.assignTo)
    };

    try {

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,  // Include token in headers
        },
      };
      await axios.post('http://localhost:8000/api/lead/leads',submitData,config);
     
      onSuccess();
      onClose(); // Close the popup after successful submission
    } catch (err) {
      console.log('Submission error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="bg-white w-full max-w-5xl relative" style={{ maxHeight: '100vh', height: 'auto' }}>
        <div className="mb-2 flex justify-between items-center text-white p-4" style={{ backgroundColor: '#152238' }}>
          <h1 className="text-2xl font-semibold">Lead Information</h1>
          <button onClick={onClose} className="px-2 py-1 hover:bg-gray-700 transition-colors">X</button>
        </div>

        <form onSubmit={handleSubmit} className="overflow-auto text-black p-4">
          <div className="w-full flex flex-col space-y-4">
            <div className="grid grid-cols-5 gap-4">
            {/* <div>
                <label htmlFor="leadReferenceNo" className="block text-sm font-medium">Lead Reference Number</label>
                <input type="text" id="leadReferenceNo" name="leadReferenceNo" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div> */}

              
              <div>
                <label htmlFor="requirementFor" className="block text-sm font-medium">Requirement For</label>
                <input type="text" id="requirementFor" name="requirementFor" value={formData.requirementFor} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
                {/* <label htmlFor="requirementFor" className="block text-sm font-medium">Requirement For</label>
                <select id="requirementFor" name="requirementFor" value={formData.leadFor} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2">
                  <option value="" disabled>Please select</option>
                  {/* {leadStatus.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))} */}
                {/*</select>
              </div> */}
              <div>
                <label htmlFor="leadFor" className="block text-sm font-medium">Lead For</label>
                <select id="leadFor" name="leadFor" value={formData.leadFor} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2">
                  <option value="" disabled>Please select</option>
                  {leadStatus.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="assignTo" className="block text-sm font-medium">Assign To</label>
                <select id="assignTo" name="assignTo" value={formData.assignTo} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2">
                  <option value="" disabled>Please select</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="sourceOfLead" className="block text-sm font-medium">Source Of Lead</label>
                <select id="sourceOfLead" name="sourceOfLead" value={formData.sourceOfLead} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2">
                  <option value="" disabled>Please select</option>
                  {sourceOfLeads.map(src => (
                    <option key={src.id} value={src.id}>{src.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="leadType" className="block text-sm font-medium">Lead Type</label>
                <select id="leadType" name="leadType" value={formData.leadType} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2">
                  <option value="" disabled>Please select</option>
                  {leadTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="qualification" className="block text-sm font-medium">Lead Qualification</label>
                <select id="qualification" name="qualification" value={formData.qualification} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2">
                  <option value="" disabled>Please select</option>
                  {qualify.map(status => (
                    <option key={status.name} value={status.name}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium">Company Name</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium">First Name</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium">Last Name</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium">Phone No</label>
                <input type="text" id="contactPerson" name="contactPerson" value={formData.contactPerson} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="mobileNo" className="block text-sm font-medium">Mobile No</label>
                <input type="text" id="mobileNo" name="mobileNo" value={formData.mobileNo} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="designation" className="block text-sm font-medium">Designation</label>
                <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="country" className="block text-sm font-medium">Country</label>
                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium">State</label>
                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium">City</label>
                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div>
              <div className="col-span-2">
                <label htmlFor="remarks" className="block text-sm font-medium">Remarks</label>
                <div className="flex space-x-4">
                  <textarea
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    rows={2}
                    className="flex-1 bg-gray-200 border-gray-300 border sm:text-sm p-2"
                  />
                </div>
              </div>
              {/* <div>
                <label htmlFor="estimatedQuotation" className="block text-sm font-medium">Estimated Quotation</label>
                <input type="text" id="estimatedQuotation" name="estimatedQuotation" value={formData.estimatedQuotation} onChange={handleChange} className="mt-1 block w-full bg-gray-200 border-gray-300 border sm:text-sm p-2" />
              </div> */}
            </div>
            <div className="flex justify-end mt-4">
              
              <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadFormPopup;
