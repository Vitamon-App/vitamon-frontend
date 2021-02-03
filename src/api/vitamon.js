import axios from 'axios'
import publicIp from "public-ip";




const  ip = "192.168.1.165"
//daniel 
//veronica 192.168.1.4
//melissa 192.168.1.243
//priscila 192.168.4.222

export default axios.create({
  baseURL: `http://${ip}:8080`,
});