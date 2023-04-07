import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateEmployee() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [salary, setSalary] = useState(0)
    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/' + id, {firstname, lastname, salary})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Edit Employee</h2>
            <div className='mb-2'>
                <label htmlFor="">First Name</label>
                <input type='text' placeholder='Enter First Name' className='form-control' 
                onChange={e => setFirstname(e.target.value)} />

            </div>
            <div className='mb-2'>
                <label htmlFor="">Last Name</label>
                <input type='text' placeholder='Enter Last Name' className='form-control' 
                onChange={e => setLastname(e.target.value)} />
            </div>
            <div className='mb-2'>
                <label htmlFor="">Salary</label>
                <input type='number' placeholder='Enter First Name' className='form-control' 
                onChange={e => setSalary(e.target.value)} />
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateEmployee
