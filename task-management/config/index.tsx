import axios from "axios";


const api = axios.create({
    baseURL: "https://task-management-nextjs-dpco.onrender.com",
    // baseURL: "http://localhost:8000",
})

export default api