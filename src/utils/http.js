import axios from "axios"


const http = axios.create({
  baseURL: "http://h4zp7t.natappfree.cc/",
  timeout: 60000
})

export { http }

