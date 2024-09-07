import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom"
import { stateContext } from '../../contexts/Context';
import GoogleLogin from '../../components/googleLogin/GoogleLogin';

function Login() {
  const { userEmail, isUserLoggedIn } = useContext(stateContext);

  const navigate = useNavigate()

  const formData = {
    email: userEmail ? userEmail : "",
    password: ""
  }

  const [loginFormData, setLoginFormData] = useState(formData)

  const [loginBtnClicked, setLoginBtnClicked] = useState(false);

  const handleEmailChange = (e) => {
    setLoginFormData({ ...loginFormData, email: e.target.value })
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoginBtnClicked(true)

   
    setLoginBtnClicked(false)
  };



  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/dashboard');
    }

  }, [isUserLoggedIn,navigate])

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 50px)' }}>
      <div style={{}}>
        <h1 style={{ color:'blue', fontWeight: '700' }}>Login</h1>
        <div style={{ borderRadius: '8px', boxShadow:'0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }} className='px-4 py-3'>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Control value={loginFormData.email}
                onChange={handleEmailChange}
                name='email'
                type="email" placeholder="Email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control required value={loginFormData.password} onChange={(e) => {
                setLoginFormData({ ...loginFormData, password: e.target.value.trim() })
              }} type="password" placeholder="Password" />
            </Form.Group>

            <Button disabled={loginBtnClicked} variant="primary" style={{ width: '100%' }} type='submit'>
              Login
            </Button>

            <div style={{ marginTop: '15px' }}>
              <span style={{ fontWeight: '600' }}>Don't have an account? <span onClick={() => {
                navigate("/registration")
              }} style={{ textDecoration: 'none', color: 'blue', cursor: 'pointer' }}>Signup</span> </span>
            </div>
            <GoogleLogin btnText='Login with ' />
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login