import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
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

  theFormGroup: FormGroup; //Hace cumplir las reglas de validación
  trySend: boolean; //Para saber si se intentó enviar el formulario y esta con errores
  seatsList: any[] = []; //Lista de sillas

  constructor(
    private theatersService: TheaterService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private theFormBuilder: FormBuilder
  ) {
    this.theater = { id: 0, capacity: 0, location: "" };
    this.mode = 0;
    this.trySend = false;
    this.configFormGroup();
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
    } else if (currentUrl.includes("seats")) {
      this.mode = 4;
    }

    if (this.activateRoute.snapshot.params.id) {
      this.theater.id = this.activateRoute.snapshot.params.id;
      this.getTheater(this.theater.id);
    }
  }

  configFormGroup() {
    //Union entre los dos metodos
    this.theFormGroup = this.theFormBuilder.group({
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas en cada campo del formulario
      capacity: [
        0,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      location: ["", [Validators.required, Validators.minLength(2)]],
    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }

  getTheater(id: number) {
    this.theatersService.view(id).subscribe((data) => {
      this.theater = data;
    });
  }
  create() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }
    this.theatersService.create(this.theater).subscribe((data) => {
      Swal.fire("Creado", "Se ha creado el teatro", "success");
      this.router.navigate(["/theaters/list"]);
    });
  }
  update() {
    if (this.theFormGroup.invalid) {
      this.trySend = true;
      Swal.fire("Error en el formulario", "Revisa los campos en rojo", "error");
      return;
    }
    this.theatersService.update(this.theater).subscribe((data) => {
      Swal.fire("Actualizado", "Se ha actualizado el teatro", "success");
      this.router.navigate(["/theaters/list"]);
    });
  }

  seats() {
    this.theatersService.Seats(this.theater).subscribe((data) => {
      this.router.navigate(["/seats?theater_id=", this.theater.id]);
    });
  }
}
