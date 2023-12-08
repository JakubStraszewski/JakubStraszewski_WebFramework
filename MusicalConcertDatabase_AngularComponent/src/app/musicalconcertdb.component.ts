import { Component, OnInit } from '@angular/core';
import { MusicalconcertdbDataService } from './musicalconcertdb-data.service';

export class Concert {
	title!: string;
	date!: string;
	price!: number;
}

@Component({
  selector: 'musicalconcertdb-root',
  templateUrl: './musicalconcertdb.component.html',
  styleUrl: './musicalconcertdb.component.css'
})

export class MusicalconcertdbComponent implements OnInit {
  
  title = 'MusicalConcertDatabase_AngularComponent';
  constructor(private mcdbService: MusicalconcertdbDataService) {}
  
  concerts!: Concert[]; 

  private getConcerts(): void { 
  this.mcdbService 
  .getConcerts() 
  .then(obtainedConcertArray => {
    this.concerts = obtainedConcertArray; 
  });
}

  
  ngOnInit() {
    this.getConcerts();
  }
}
