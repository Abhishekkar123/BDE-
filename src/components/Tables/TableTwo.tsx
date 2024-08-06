// components/TableComponent.js

import { Table, Dropdown } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

 

const TableComponent = ({ data, columns }) => {
  return (
    <div className='overflow-auto'>
      <Table striped bordered hover>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) =>  (
            
            <tr key={index}>
              {Object.values(item).map((value, idx) => (
                <td key={idx}>{value}</td>
              ))}
              <td>
                <Dropdown>
                  <Dropdown.Toggle as="div">
                    <BsThreeDotsVertical />
                  </Dropdown.Toggle>
                 
                    <Dropdown.Menu className="dropdown-menu-custom">
                       <Dropdown.Item href="#">Edit</Dropdown.Item>
                       <Dropdown.Item href="#">Delete</Dropdown.Item>
                       <Dropdown.Item href="#">View Details</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
  );
};



export default TableComponent;
