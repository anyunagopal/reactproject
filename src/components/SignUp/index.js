import React, { useState } from "react";
import "./index.css";
import axios from "axios";
import Joi from "joi";

function SignUp({ handleCreate }) {

    const [fullName, setFullName] = useState("");
    const [dob, setDob] = useState("");
    const [cls, setCls] = useState("");
    const [division, setDivision] = useState("");
    const [gender, setGender] = useState("");

    const schema = Joi.object({
        full_name: Joi.string().required(),
        dob: Joi.date().required(),
        class: Joi.string().required(),
        division: Joi.string().required(),
        gender: Joi.string().valid("male", "female", "other").required(),
    });

    function handleOnChange(event) {
        const changedFirstName = event.target.value;
        setFullName(changedFirstName);
    }
    function handleDatePicker(event) {
        const changedDob = event.target.value;
        setDob(changedDob);
    }
    function handleCls(event) {
        const changedCls = event.target.value;
        setCls(changedCls);
    }
    function handleDivision(event) {
        const changedDivsion = event.target.value;
        setDivision(changedDivsion);
    }
    function handleGender(event) {
        const changedGender = event.target.value;
        setGender(changedGender);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const formData = {
            full_name: fullName,
            dob: dob,
            class: cls,
            division: division,
            gender: gender
        };
        const { error } = schema.validate(formData);

        if (error) {
            alert(error.details[0].message);
            return;
        }
        try {
            await axios.post("http://localhost:8800/create", formData);
            handleCreate(fullName)

        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert(error.response.data.error);
            }
        }
    }

    return <form onSubmit={handleSubmit} className="studentInfo">
        <h1 className="signUpHeading">Sign-up form</h1>
        <div className="studentName">
            <label><h4>Full Name</h4></label>
            <input onChange={handleOnChange} type="text" placeholder="Full Name" value={fullName} />
        </div>
        <div className="section1">

            <div className="gender">
                <h3>Select your gender:</h3>
                <div>
                    <input type="radio" name="gender" value="male" onChange={handleGender} required checked={gender === "male"} ></input>
                    <label>Male</label>
                </div>
                <div>
                    <input type="radio" name="gender" value="female" onChange={handleGender} checked={gender === "female"} ></input>
                    <label>Female</label>
                </div>
                <div>
                    <input type="radio" name="gender" value="other" onChange={handleGender} checked={gender === "other"}></input>
                    <label>Other</label>
                </div>
            </div>
            <div className="dob">
                <label><h4>Date of Birth</h4></label>
                <input onChange={handleDatePicker} type="date" value={dob}></input>
            </div>
        </div>
        <div className="section">
            <div className="class">
                <label><h4>Class</h4></label>
                <select onChange={handleCls} value={cls}>
                    <option class="dropdown">Select an option</option>
                    <option value="class I">Class I</option>
                    <option value="class II">Class II</option>
                    <option value="class III">Class III</option>
                    <option value="class IV">Class IV</option>
                    <option value="class V">Class V</option>
                    <option value="class VI">Class VI</option>
                    <option value="class VII">Class VII</option>
                    <option value="class VIII">Class VIII</option>
                    <option value="class IX">Class IX</option>
                    <option value="class X">Class X</option>
                </select>
            </div>
            <div className="division">
                <label><h4>Division</h4></label>
                <select onChange={handleDivision} value={division}>
                    <option class="dropdown">Select an option</option>
                    <option value="division A">Division A</option>
                    <option value="division B">Division B</option>
                    <option value="division C">Division C</option>
                </select>
            </div>



        </div>
        <button class="submitButton" type="submit">Submit</button>
    </form >
}

export default SignUp;