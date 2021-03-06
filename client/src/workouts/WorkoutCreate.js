import React, {useState, useEffect} from "react";
import { Button, Form, FormGroup, Label, Input, Container } from "reactstrap";

const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState('');


    const handleSubmit = (e) => {
        console.log(description)
        console.log(definition)
        console.log(result)


        e.preventDefault();
        console.log('-------------------')
        fetch('http://localhost:3000/log', {
            method: "POST",
            body: JSON.stringify({
                log: {
                    description: description,
                    definition: definition,
                    result: result
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        })
        .then(res => res.json())
        .then(logData => {
            console.log(logData);
            setDescription('');
            setDefinition('');
            setResult('');
            
            props.fetchWorkouts()
        })
        .catch(err => console.log(err))
    }
    
    return(
        <>
            <h3>Log a Workout</h3>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="description"/>
                    <Input name="description" value={description} onChange={(e) => setDescription(e.target.value)}></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="definition"/>
                    <Input type="select" name="definition" value={definition} onChange={(e) => setDefinition(e.target.value)}>
                        <option value="Time">Time</option>
                        <option value="Weigth">Weigth</option>
                        <option value="Distance">Distance</option>
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="result"/>
                    <Input name="result" value={result} onChange={(e) => setResult(e.target.value)}></Input>
                </FormGroup>
                <Button type="submit" style={{marginTop: '10px'}}>Click to Submit</Button>
            </Form>
        </>
    );
};

export default WorkoutCreate;