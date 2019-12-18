import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-again.firebaseio.com/",
});

export default instance;