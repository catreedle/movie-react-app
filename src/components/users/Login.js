import React, { useState } from "react"
import { Redirect } from 'react-router-dom'
import { Alert, Button, Container, Form, FormGroup, Input } from 'reactstrap'
import { API_URL } from "../../config"

function Login() {
    const FormStyle = {
        border: '1px solid #000000',
        padding: '10%',
        margin: '5%'
    }
    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [redirect, setRedirect] = useState(false)
    const AlertLogin = (props) => {
        props = [visible, setVisible]
        const onDismiss = () => setVisible(false);

        return (
            <Alert color="danger" isOpen={visible} toggle={onDismiss}>
                Wrong password or user not found!
          </Alert>
        );
    }

    const handleResponse = res => {
        if (res.ok) {
            return res.json()
        } else {
            setPassword('')
            setVisible(true)
            throw new Error('Network response was not ok.')
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        let request = { "auth": { "email": email, "password": password } }

        fetch(`${API_URL}user_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        }).then(handleResponse)
            .then((data) => {
                localStorage.setItem('token', data.jwt)
                setRedirect(true)
            }).catch((error) => {
                console.log(error)
            })
    }

    if (redirect) {
        return (
            <Redirect to={'/dashboard'}></Redirect>
        )
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-4 col-sm-6" style={{ marginTop: '10%', marginBottom: '10%' }}>
                <h1>Login</h1>
                <Container style={FormStyle}>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Input
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                name="email"
                                type="email"
                                placeholder="Email"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Input
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                name="password"
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </FormGroup>
                        <Button style={{ width: '100%' }}>Login</Button>
                    </Form>
                </Container>
                <p>Don't have an account? <a href="/register">Register</a> </p>
                <AlertLogin />
            </div>
        </div>
    )
}
export default Login