import { Component, OnInit } from '@angular/core';
import { Theater } from 'src/app/models/theater.models';
import { TheaterService } from 'src/app/services/theater.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  theaters: Theater[];

  constructor(private theatersService: TheaterService) {
    console.log("Constructor")
    this.theaters = []
  }

  ngOnInit(): void {
    console.log("Ng")
    this.list()
  }
  list() {
    this.theatersService.list().subscribe(data => {
      this.theaters = data
    })
  }
}
