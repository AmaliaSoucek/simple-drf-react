import http from "../http-common";


class UserDataService {
  login(data) {
    return http.post("/auth/login/", data)
        .then(response => {
          localStorage.setItem('token', response.data['key'])
        })
        .catch(e => {
          console.log(e);
        });
  }

  getUser() {
    return http.get("/auth/user/")
  }
}

export default new UserDataService();
