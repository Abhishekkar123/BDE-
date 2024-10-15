import { useState,useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FormElements = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contactNumber: '',
    address: '',
    department: '',
    roleName: '',
    isActive: '',
    reportedTo: ''
  });
  const [roles, setRoles] = useState([]);
  const [department,setDept]=useState([])
  const [error,setError]=useState('');
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    // Fetch users from the API
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);  // Store the user data
        console.log(response.data)
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  useEffect(()=>{
    const fetchList=async()=>{
    try{
      const response = await axios.get('http://localhost:8000/users');
      console.log("res",response.data)

    }catch(err){

    }
  };fetchList();
  },[])

  useEffect(() => {
    // Fetch roles from the API
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/roles'); // Adjust the URL to your roles API
      //  console.log(response.data)
        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    }; fetchRoles();
  }, []);

  useEffect(() => {
    // Fetch roles from the API
    const fetchDept = async () => {
      try {
        const resp = await axios.get('http://localhost:8000/departments'); 
      //  console.log("dept",resp.data)
        setDept(resp.data);
      } catch (error) {
        console.error('Error fetching dept:', error);
      }
    }; fetchDept();
  }, []);


  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name,value)
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validation function to check if all required fields are filled
  const validateForm = () => {
    return (
      formData.firstName &&
      formData.lastName &&
      formData.email &&
      formData.password &&
      formData.contactNumber &&
      formData.address &&
      formData.department &&
      formData.roleName &&
      formData.isActive &&
      formData.reportedTo
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const resp = await axios.post('http://localhost:8000/api/auth/register', formData);
        console.log(resp);
        navigate('/tables');
      } catch (err) {
        console.error('Error:', err);
      }
    } else {
      setError("Please fill in all the required fields.");
    }
  };

  return (
    <>
      <Breadcrumb pageName="User Form" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
         <h4 className="mb-6 text-xl font-semibold text-black">User Details</h4>
         {error && (
            <div className="mb-4 text-red-500 text-center">
              {error}
            </div>
          )}

        <Form onSubmit={handleSubmit}>
          
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formFirstName">
              <Form.Label className='text-black dark:text-white fw-medium'>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formLastName">
              <Form.Label className='text-black dark:text-white fw-medium'>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Last Name"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className='text-black dark:text-white fw-medium'>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label className='text-black dark:text-white fw-medium'>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formContactNumber">
            <Form.Label className='text-black dark:text-white fw-medium'>Contact Number</Form.Label>
            <Form.Control
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="Enter contact number"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label className='text-black dark:text-white fw-medium'>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDepartment">
            <Form.Label className='text-black dark:text-white fw-medium'>Department</Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="">Select Department</option>
              {
                department.map((dep)=>(
                  <option key={dep.id} value={dep.name}>
                    {dep.name}
                  </option>
                ))
              }
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRole">
            <Form.Label className="text-black dark:text-white fw-medium">Role</Form.Label>
            <Form.Select
              name="roleName"
              value={formData.roleName}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>


          <Row className="mb-3">
            <Form.Group as={Col} controlId="formIsActive">
              <Form.Label className='text-black dark:text-white fw-medium'>Is Active</Form.Label>
              <Form.Select
                name="isActive"
                value={formData.isActive}
                onChange={handleChange}
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="formReportedFor">
              <Form.Label className='text-black dark:text-white fw-medium'>Reported To</Form.Label>
              <Form.Select
                name="reportedTo"
                value={formData.reportedTo}
                onChange={handleChange}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Button className="bg-black mb-4" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    </>
  );
};

export default FormElements;
