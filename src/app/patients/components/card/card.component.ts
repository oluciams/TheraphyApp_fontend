import { Component, Input, OnInit } from '@angular/core';
import { Patient } from '../../interfaces/patient.interface';

@Component({
  selector: 'patients-patient-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit {

  @Input()
  public patient!: Patient;

  ngOnInit(): void {
    if (!this.patient) throw Error('patient property is required.');
  }

}
