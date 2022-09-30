import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Swal from "sweetalert2";
import axios from "axios";

function EditEmployee() {
    const [id, setId] = useState(useParams().id);
}
export default EditEmployee;