import './Form.css';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Checkbox, FormLabel, Input, Select, useToast } from '@chakra-ui/react';

interface supervisorForm {
  firstname: string,
  lastname: string,
  email: string,
  phone: string,
  supervisor: string,
}

const Form = () => {

  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [emCheck, setEmCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [phCheck, setPhCheck] = useState(false);
  const [phone, setPhone] = useState('');
  const [supervisor, setSupervisor] = useState('');
  const [supervisorList, setSupervisorList] = useState([]);

  const toastAlert = useToast()
  
  // Load supervisorList on mount from api 
  useEffect(() => {
    axios.get('http://localhost:8080/supervisors')
      .then((res) => setSupervisorList(res.data))
      .catch((err) => console.log(err))
  }, [])

  // Set Email and Phone Checkbox's when changed. Only one can be set as preferred contact method. 
  useEffect(() => {
    if (emCheck) {
      setPhCheck(false)
    }
  }, [emCheck])

  useEffect(() => {
    if (phCheck) {
      setEmCheck(false)
    }
  }, [phCheck])

  // Change handlers for Form fields.
  const fnameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setFname(e.currentTarget.value)
  }
  const lnameChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setLname(e.currentTarget.value)
  }
  const emCheckChangeHandler = () => {
    setEmCheck(!emCheck)
  }
  const emailChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const phCheckChangeHandler = () => {
    setPhCheck(!phCheck)
  }
  const phoneChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPhone(e.currentTarget.value)
  }
  const svChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSupervisor(e.currentTarget.value)
  }

  // Function to submit form data to api for validation.
  // Triggered by clicking Submit input button.
  const submitForm = (e: any) => {
    e.preventDefault()
    const formInfo: supervisorForm = {
      firstname: fname,
      lastname: lname,
      email: email,
      phone: phone,
      supervisor: supervisor,
    }

    // Post form info to API for validation.
    // Display Success Toast alert and clear form data if form data validates.
    // Display Warning Toast alert if form data fails to validate with the offending required field.
    axios.post('http://localhost:8080/submit', formInfo)
      .then((response) => {
        if (response.data) { 
          toastAlert({
            title: 'Field Required.',
            description: response.data,
            status: 'error',
            duration: 4000,
            isClosable: true,
            position: 'top',
          })  
        } else {
          clearForm()      
          toastAlert({
            title: 'Form Submitted.',
            description: 'Form has successfully been submitted.',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          })  
        }      
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data)
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request)
        } else {
          console.log('Error', error.message)
        }
        console.log(error.config);
      })
  }
  
  const clearForm = () => {
    setFname('')
    setLname('')
    setEmCheck(false)
    setEmail('')
    setPhCheck(false)
    setPhone('')
    setSupervisor('')
  }

  return(
      <div>
        <form className='Form-form' name='supervisor' onSubmit={submitForm}>

          <div className='Form-section'>
            <div className='Form-input'>
              <FormLabel htmlFor='firstname'>First Name</FormLabel>
              <Input type='text' id='firstname' value={fname} onChange={fnameChangeHandler} />
            </div>
            <div className='Form-input'>
              <FormLabel htmlFor='lasttname'>Last Name:</FormLabel>
              <Input type='text' id='lasttname' value={lname} onChange={lnameChangeHandler} />
            </div>
          </div>

          <div className='Form-span'>
            <span className='Form-span'>How would you prefer to be notified?</span><br/>
          </div>

          <div className='Form-section'>
            <div className='Form-contact'>
              <Checkbox type='checkbox' id='emailcheckbox' isChecked={emCheck} onChange={emCheckChangeHandler}>
                Email
              </Checkbox>
              <Input type='text' id='email' value={email} onChange={emailChangeHandler} />
            </div>
            <div className='Form-contact'>
              <Checkbox type='checkbox' id='phonecheckbox' isChecked={phCheck} onChange={phCheckChangeHandler}>
                Phone Number
              </Checkbox>
              <Input 
                type='tel' 
                id='phone' 
                value={phone} 
                pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
                placeholder='xxx-xxx-xxxx'
                maxLength={12} 
                htmlSize={12} 
                onChange={phoneChangeHandler} 
              />
            </div>
          </div>

          <div className='Form-select'>
            <FormLabel htmlFor='supervisor'>Supervisor</FormLabel>
            <Select name='supervisor' value={supervisor} form='supervisor' onChange={svChangeHandler} size='sm'>
              <option key=''></option>
              {supervisorList.map((value, index) =>
                <option key={index}>{value}</option>
              )}
            </Select>
          </div>

          <div className='Form-button'>
            <Input type='submit' value ='SUBMIT' />
          </div>

        </form>
      </div>
  )

}

export default Form;
