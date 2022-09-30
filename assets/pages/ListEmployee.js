import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function ListEmployee() {
    const [listEmployee, setEmployeeList] = useState([]);

    useEffect(() => {
        fetchEmployeeList();
    }, []);

    const fetchEmployeeList = () => {
        axios.get('/api/employee')
            .then(function (response) {
                setEmployeeList(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const deleteRecord = (id) => {
        Swal.fire({
            title: 'Are you sure you want to delete this employee?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`api/employee/${id}`)
                    .then(function (response) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Employee has been deleted successfully!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                        fetchEmployeeList();
                    })
                    .catch(function (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oow, something went wrong!',
                            showConfirmButton: false,
                            timer: 1000
                        })
                    });
            }
        })
    }

    return (
        <Layout>
            <div className="container">
                <h2 className="text-center mt-5 mb-3">Employees</h2>
                    <div className="card">
                        <div className="card-header">
                            <Link className="btn btn-primary" to="/addEmployee">
                                Add Employee
                            </Link>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped table-hover table-bordered border-primary">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Degree</th>
                                        <th>Designation</th>
                                        <th>Contact</th>
                                        <th>Address</th>
                                        <th width="250px">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listEmployee.map((employee, key) => {
                                        return (
                                            <tr key={key}>
                                                <td>{employee.fullname}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.degree}</td>
                                                <td>{employee.designation}</td>
                                                <td>{employee.contact}</td>
                                                <td>{employee.address}</td>
                                                <td>
                                                    <Link to={`/showEmployee/${employee.id}`} className = "btn btn-info text-light mx-1">
                                                        View
                                                    </Link>
                                                    <Link to={`/editEmployee/${employee.id}`} className = "btn btn-success mx-1">
                                                        Edit
                                                    </Link>
                                                    <button onClick={() => deleteRecord(employee.id)} className="btn btn-danger mx-1">
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
            </div>
        </Layout>
    );
}
export default ListEmployee;