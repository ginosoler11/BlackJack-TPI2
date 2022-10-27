import { Component, Input, OnInit } from '@angular/core';
import { Carta } from 'src/app/models/carta';

@Component({
  selector: 'app-cartas',
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.css'],
})
export class CartasComponent implements OnInit {
  @Input() carta: Carta;
  @Input() tipo: string;

  constructor() {}

  ngOnInit(): void {}
}
