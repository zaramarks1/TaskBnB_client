export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.token) {
        console.log(" user ---------------");
       return { Authorization: 'Bearer ' + user.token };
      //return { "x-auth-token": user.accessToken };
    } else {
      //return {};
      console.log("no user");
      return {  };
    }
  }