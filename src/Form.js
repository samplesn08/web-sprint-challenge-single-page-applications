import axios from 'axios';
import * as yup from 'yup';
import gsap from 'gsap';
import React, { useState, useEffect } from 'react';

const schema = yup.object().shape({
    name: yup.string().required('name is required'),
    sizeSelect: yup.string().oneOf(['1', '2', '3', '4'], 'you must choose a size'),
    cheese: yup.boolean(),
    pepperoni: yup.boolean(),
    sausage: yup.boolean(),
    mushrooms: yup.boolean(),
    greenPeppers: yup.boolean(),
    olives: yup.boolean(),
    onions: yup.boolean(),
    ham: yup.boolean(),
    pineapple: yup.boolean(),
    anchovies: yup.boolean(),
    instructions: yup.string(),
})

const Form = () => {
    const initialValues = {
        name: '',
        sizeSelect: '',
        cheese: false,
        pepperoni: false,
        sausage: false,
        mushrooms: false,
        greenPeppers: false,
        olives: false,
        onions: false,
        ham: false,
        pineapple: false,
        anchovies: false,
        instructions: '',
    }

    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({ name: '', sizeSelect: '' })
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(formData).then(valid => setDisabled(!valid))
    }, [formData])

    function submitHandler(event) {
        event.preventDefault();
        const newPizza = { 
            name: formData.name,
            sizeSelect: formData.sizeSelect,
            cheese: formData.cheese,
            pepperoni: formData.pepperoni,
            sausage: formData.sausage,
            mushrooms: formData.mushrooms,
            greenPeppers: formData.greenPeppers,
            olives: formData.olives,
            onions: formData.onions,
            ham: formData.ham,
            pineapple: formData.pineapple,
            anchovies: formData.anchovies,
            instructions: '',
         }
        axios.post('https://reqres.in/api/users', newPizza)
         .then(res => {
            console.log(res.data)
            setFormData(initialValues)
         })
         .catch(err => {
             console.log(err)
         })
    }

    const setFormErrors = (name, value) => {
        yup.reach(schema, name).validate(value)
            .then(res => {
                setErrors({ ...errors, [name]: '' })
            })
            .catch(err => {
                setErrors({ ...errors, [name]: err.errors[0] })
            })
    }

    function changeHandler(event) {
        const { checked, value, name, type } = event.target
        const useValue = type === 'checkbox' ? checked : value
        setFormErrors(name, useValue)
        setFormData({
            ...formData, [name]: useValue,
        })
    }
    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Enter your name:
                    <input onChange={changeHandler} value={formData.name} placeholder='Enter Name' name='name' type='text'></input>
                </label><br></br><br></br>
                <label>Choose size:
                    <select onChange={changeHandler} value={formData.sizeSelect} name='sizeSelect'>
                        <option value=''>--Select Size--</option>
                        <option value='1'>Small</option>
                        <option value='2'>Medium</option>
                        <option value='3'>Large</option>
                        <option value='4'>X-Large</option>
                    </select>
                </label><br></br><br></br>
                Toppings:<br></br>
                <label>Extra Cheese
                    <input onChange={changeHandler} type='checkbox' name='cheese' checked={formData.cheese}></input>
                </label>
                <label>Pepperoni
                    <input onChange={changeHandler} type='checkbox' name='pepperoni' checked={formData.pepperoni}></input>
                </label>
                <label>Sausage
                    <input onChange={changeHandler} type='checkbox' name='sausage' checked={formData.sausage}></input>
                </label>
                <label>Mushrooms
                    <input onChange={changeHandler} type='checkbox' name='mushrooms' checked={formData.mushrooms}></input>
                </label>
                <label>Green Peppers
                    <input onChange={changeHandler} type='checkbox' name='greenPeppers' checked={formData.greenPeppers}></input>
                </label><br></br>
                <label>Olives
                    <input onChange={changeHandler} type='checkbox' name='olives' checked={formData.olives}></input>
                </label>
                <label>Onions
                    <input onChange={changeHandler} type='checkbox' name='onions' checked={formData.onions}></input>
                </label>
                <label>Ham
                    <input onChange={changeHandler} type='checkbox' name='ham' checked={formData.ham}></input>
                </label>
                <label>Pineapple
                    <input onChange={changeHandler} type='checkbox' name='pineapple' checked={formData.pineapple}></input>
                </label>
                <label>Anchovies
                    <input onChange={changeHandler} type='checkbox' name='anchovies' checked={formData.anchovies}></input>
                </label><br></br><br></br>
                <label>Special Instructions:
                    <input value={formData.instructions} onChange={changeHandler} type='text' name='instructions' placeholder='Type special instructions here...'></input>
                </label><br></br><br></br>
                <button disabled={disabled} className='add'>Add to Order</button>
            </form>
            <div style={{color: 'red'}}>
                <div>{errors.name}</div><div>{errors.sizeSelect}</div>
            </div>
        </div>
    )
}

export default Form