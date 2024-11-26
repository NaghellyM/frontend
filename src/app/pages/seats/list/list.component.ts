import { SeatService } from './../../../services/seats.services';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Seat } from "src/app/models/seat.models";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  seats: Seat[];

  constructor(private seatsService: SeatService, private router: Router) {
    console.log("Constructor");
    this.seats = [];
  }

  ngOnInit(): void {
    console.log("Ng");
    this.list();
  }
  list() {
    this.seatsService.list().subscribe((data) => {
      this.seats = data;
    });
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No,cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.seatsService.delete(id).subscribe((data) => {
          this.ngOnInit();
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success",
          });
        });
      }
    });
  }
  create() {
    this.router.navigate(["seats/create"]);
  }
  view(id: number) {
    this.router.navigate(["seats/view", id]);
  }
  update(id: number) {
    this.router.navigate(["seats/update", id]);
  }
  chairs(id: number) {
    this.router.navigate(["/seats/:id", id]);
  }
}
