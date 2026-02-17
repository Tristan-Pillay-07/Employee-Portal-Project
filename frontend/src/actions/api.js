import axios from "axios";

const baseURL = "https://localhost:7042/api";

export default{
    dEmployee(url = baseURL + "/Employees/"){
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + "api/employees/" + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updatedRecord) => axios.put(url + "api/employees/" + id, updatedRecord),
            delete: id => axios.delete(url + "api/employees/" + id)
        }
    }
}