import React, {useState} from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Signup = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showRequiredUser, setShowRequiredUser] = useState(false)


    let handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/register', {
            method: "POST",
            body: JSON.stringify({
                user: {
                    username: username,
                    passwordhash: password
                }
            }),
            headers: new Headers({
                "Content-Type": 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            data.sessionToken === undefined ? 
            setShowRequiredUser(true) : setShowRequiredUser(false)
            props.updateToken(data.sessionToken)
            console.log(data.sessionToken)
        })
    }

    return(
        <div>
            <h1>Signup</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor='username'>Username</Label>
                    <Input name='username' value={username} onChange={(e) => setUsername(e.target.value)}></Input>
                    { showRequiredUser ? 
                    <div style={{color: '#d74338' }}>username is required</div> 
                    : null}
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='password'>Password</Label>
                    <Input name='password' value={password} onChange={(e) => setPassword(e.target.value)}></Input>
                </FormGroup>
                <Button type='submit'>Signup</Button>
            </Form>
        </div>
    );
};

export default Signup;