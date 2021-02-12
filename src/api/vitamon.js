import axios from "axios";

<<<<<<< HEAD
const ip = "192.168.1.4";
=======
const ip = "192.168.1.243";
>>>>>>> main

//daniel "192.168.1.165"
//veronica 192.168.1.4
//melissa 192.168.1.243
//priscila 192.168.4.222

export default axios.create({
  baseURL: `http://${ip}:8080`,

  // baseURL: `https://vitamonapp.herokuapp.com`,
});
