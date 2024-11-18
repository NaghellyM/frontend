import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Theater } from "src/app/models/theater.models";
import { TheaterService } from "src/app/services/theater.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  theater: Theater;
  //mode =1 ---> view, mode =2 ---> create, mode =3 ---> update
  mode: number;
  constructor(
    private theatersService: TheaterService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.theater = { id: 0, capacity: 0, location: "" };
    this.mode = 0;
  }

  ngOnInit(): void {
    //Analiza y parte la ruta
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }
  }

  getTheater(id: number) {
    this.theatersService.view(id).subscribe((data) => {
      this.theater = data;
    });
  }
  create() {
    this.theatersService.create(this.theater).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el teatro", "success");
      this.router.navigate(["/theaters/list"]);
    });
  }
  update() {
    this.theatersService.update(this.theater).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado el teatro", "success");
      this.router.navigate(["/theaters/list"]);
    });
  }
}
