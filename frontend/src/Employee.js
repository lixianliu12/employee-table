import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Employee() {
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = async (id) =>{
        try {
            await axios.delete('http://localhost:8081/employee/' + id)
            window.location.reload()
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        
        <table className='table'>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Salary</th>
                    <th>Action</th>
                </tr>
                

            </thead>
            <tbody>
                {
                    employee.map((data, i)=>(
                        <tr key={i}>
                            <td>{data.Firstname}</td>
                            <td>{data.Lastname}</td>
                            <td>{data.Salary.toLocaleString('en-US', {style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
                            <td>
                                <Link to={`update/${data.ID}`} className='btn btn-primary'>Edit</Link>
                                <button className='btn btn-danger ms-2' onClick={e =>handleDelete(data.ID) }>Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Link to="/create" className='btn btn-success'>Add Employee</Link>
      </div>
    </div>
  )
}

export default Employee
