import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Seat } from "../models/seat.models";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SeatService {
  constructor(private http: HttpClient) {}

  list(): Observable<Seat[]> {
    return this.http.get<Seat[]>(`${environment.url_ms_cinema}/seats`);
  }
  delete(id: number) {
    return this.http.delete<Seat>(
      `${environment.url_ms_cinema}/seats/${id}`
    );
  }
  view(id: number): Observable<Seat> {
    return this.http.get<Seat>(
      `${environment.url_ms_cinema}/seats/${id}`
    );
  }
  create(seat: Seat): Observable<Seat> {
    delete seat.id;
    return this.http.post<Seat>(
      `${environment.url_ms_cinema}/seats`,
      seat
    );
  }
  update(seat: Seat): Observable<Seat> {
    return this.http.put<Seat>(
      `${environment.url_ms_cinema}/seats/${seat.id}`,
      seat
    );
  }
  Seat(seat: Seat): Observable<any> {
    return this.http.get<any>(
      `${environment.url_ms_cinema}/seats?seat_id=${seat.id}`
    );
  }
}
