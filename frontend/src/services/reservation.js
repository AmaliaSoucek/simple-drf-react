import http from "../http-common";


class ReservationDataService {
  getAll() {
    return http.get("/core/reservations/");
  }

  get(id) {
    return http.get(`/core/reservations/${id}`);
  }

  create(data) {
    return http.post("/core/reservations/", data);
  }

  update(id, data) {
    return http.patch(`/core/reservations/${id}/`, data);
  }

  delete(id) {
    return http.delete(`/core/reservations/${id}/`);
  }

}

export default new ReservationDataService();
