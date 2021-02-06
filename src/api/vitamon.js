import axios from "axios";

const ip = "192.168.1.165";
//daniel "192.168.1.165"



const  ip = "192.168.1.4"
//daniel 192.168.1.165
//veronica 
//melissa 192.168.1.243
//priscila 192.168.4.222

export default axios.create({
  baseURL: `http://${ip}:8080`,
});
