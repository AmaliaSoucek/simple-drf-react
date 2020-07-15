import http from "../http-common";


class RoomDataService {
  getAll() {
    return http.get("/core/rooms/");
  }

  get(id) {
    return http.get(`/core/rooms/${id}`);
  }

  create(data) {
    return http.post("/core/rooms", data);
  }

  update(id, data) {
    return http.put(`/core/rooms/${id}`, data);
  }

  delete(id) {
    return http.delete(`/core/rooms/${id}`);
  }

}

export default new RoomDataService();
