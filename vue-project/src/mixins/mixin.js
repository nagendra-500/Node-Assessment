// Define a mixin object
import axios from "axios";

var mixinMinds = {
  methods: {
    // Get relative path with respective app
    getAppDomain(path) {
      return path ? `http://localhost:4001/users${path}` :`https://api.db-ip.com/v2/free/self`;
    },

    // Make axios request & get the data
    getURL: function(path) {
      return axios
        .get(this.getAppDomain(path), {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        })
        .then((response) => response);
    },

    // Make axios request & insert the data
    async postURL(url, obj, app) {
      return axios({
        method: "post",
        url: await this.getAppDomain(url),
        data: obj,
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
      });
    },
  },
};

export { mixinMinds };
