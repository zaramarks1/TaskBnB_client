export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.token) {
        console.log(" user ---------------");
       return { Authorization: 'Bearer ' + user.token };
      //return { "x-auth-token": user.accessToken };
    } else {
      //return {};
      console.log("no user");
      return { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6MkBnbWFpbC5jb20iLCJpYXQiOjE2ODA1NTMwNjQsImV4cCI6MTY4MDU1NDUwNH0.RB1Q_dvLrPfpgbaYMGfDSizB1Ghc4-8ez_xx8-9-g9k', 
      "Access-Control-Allow-Origin": "*",  'Content-type': 'application/json; charset=UTF-8', };
    }
  }