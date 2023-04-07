import React, { useEffect, useState } from 'react'
import axios from 'axios'
function Employee() {
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/')
        .then(res => setEmployee(res.data))
        .catch(err => console.log(err));
    }, [])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <button className='btn btn-success'>Add +</button>
        <table className='table'>
            <thead>
                <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Salary</th>
                </tr>
                

            </thead>
            <tbody>
                {
                    employee.map((data, i)=>(
                        <tr key={i}>
                            <td>{data.Firstname}</td>
                            <td>{data.Lastname}</td>
                            <td>{data.Salary}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
