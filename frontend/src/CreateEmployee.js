import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function CreateEmployee() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [salary, setSalary] = useState()
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create', {firstname, lastname, salary})
        .then(res => {
            console.log(res);
            navigate('/');
        }).catch(err => console.log(err));
    }
  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
      <div className='w-50 bg-white rounded p-3'>
        <form onSubmit={handleSubmit}>
            <h2>Add Employee</h2>
            <div className='mb-2'>
                <label htmlFor="">First Name</label>
                <input type='text' placeholder='Enter First Name' className='form-control' 
                onChange={e => setFirstname(e.target.value)}></input>

            </div>
            <div className='mb-2'>
                <label htmlFor="">Last Name</label>
                <input type='text' placeholder='Enter Last Name' className='form-control' 
                onChange={e => setLastname(e.target.value)}></input>
            </div>
            <div className='mb-2'>
                <label htmlFor="">Salary</label>
                <input type='number' placeholder='Enter First Name' className='form-control' 
                onChange={e => setSalary(e.target.value)}></input>
            </div>
            <button className='btn btn-success'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreateEmployee
