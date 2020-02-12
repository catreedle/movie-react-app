import React, { useState } from "react"
import { Alert, Button, Container, Form, FormGroup, Input } from 'reactstrap'
import { API_URL } from "../../config"

function Register() {
    const FormStyle = {
        border: '1px solid #000000',
        padding: '10%',
        margin: '5%'
    }
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [color, setColor] = useState("info")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const AlertRegister = (props) => {
        props = [color, visible, setVisible, message]
        const onDismiss = () => setVisible(false);

        return (
            <Alert color={color} isOpen={visible} toggle={onDismiss}>
                {message}
            </Alert>
        );
    }

    const handleResponse = res => {
        if (res.ok) {
            return res.json()
        } else {
            setVisible(true)
            setColor("danger")
            setMessage('Fail to register!')
            throw new Error('Network response was not ok.')
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`${API_URL}users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: JSON.stringify({ email, password })
        }).then(handleResponse)
            .then(() => {
                setVisible(true)
                setColor("info")
                setMessage('User created. Please login!')
            }).then(() => {
                setEmail('')
                setPassword('')
            }).catch((error) => console.log(error))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="col-md-4 col-sm-6" style={{ marginTop: '8%', marginBottom: '8%' }}>
                <h1>Register</h1>
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
                        <Button style={{ width: '100%' }}>Register</Button>
                    </Form>
                </Container>
                <p>Already have an account? <a href="/">Login</a> </p>
                <AlertRegister />
            </div>
        </div>
    )
}

export default Register