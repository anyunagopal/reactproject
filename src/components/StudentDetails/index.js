import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";

function StudentDetails({ modified }) {
    const [studentDetails, setStudentDetails] = useState([]);
    useEffect(() => {
        async function getData() {
            const result = await axios.get('http://localhost:8800/student');
            setStudentDetails(result.data)
        }
        getData()
    }, [modified])

    return <div className="detailesContainer">
        <h1 className="studentDetailsHeading">This is Student Details</h1>
        <div className="studentdetails">
            {
                studentDetails.map((student) => {
                    return (<div className="student">
                        <h4>{student.full_name}</h4>
                        <h4>{student.class}</h4>
                        <h4>{student.division}</h4>
                        <h4>{student.dob}</h4>
                        <h4>{student.gender}</h4>
                    </div>)
                })
            }
        </div>
    </div>

}

export default StudentDetails;