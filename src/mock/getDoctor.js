//获取职工信息
import api from '../utils/requests.js'
function getDoctorInformation(params){
    return api.get('http://localhost:8000/people/list', { params })
}

export default getDoctorInformation