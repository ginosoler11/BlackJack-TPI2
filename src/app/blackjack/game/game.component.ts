import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Carta } from 'src/app/models/carta';
import { CartaService } from 'src/app/services/carta.service';

@Component({
  selector: 'app-game-juego',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit, OnDestroy {
  playerScore: number = 0;
  playHandAgain: boolean = true;
  showDealerPoints: number = 0;
  usedCards: Carta[] = [];
  showPlayerPoints: string = '0';
  crupier: Carta[] = [];
  player: Carta[] = [];
  mesaVisible: boolean = false;
  idCarta: string = '';
  platerPasses: boolean = false;
  blackJack: boolean = false;
  puntajeCrupier: number = 0;
  finishHand: boolean = true;
  playAgain: boolean = true;
  cards: Carta[];
  resultado: number = 0;

  messageWinner: string = '';

  private suscripcion = new Subscription();

  constructor(
    private cartaService: CartaService,
    private loginService: LoginService
  ) {}

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  ngOnInit(): void {
    this.getDeck();
  }

  getDealerCard() {
    const random = Math.floor(Math.random() * this.cards.length);
    this.crupier.push(this.cards[random]);
    this.puntajeCrupier = this.scope(
      this.cards[random],
      this.puntajeCrupier,
      this.crupier
    );
    this.cards.splice(random, 1);
  }

  getDeck() {
    this.suscripcion.add(
      this.cartaService.getCard().subscribe({
        next: (carta: Carta[]) => {
          this.cards = carta;
        },
        error: () => {
          alert('No se pudo obtener carta');
        },
      })
    );
  }

  getCardPlayer() {
    const random = Math.floor(Math.random() * this.cards.length);
    this.player.push(this.cards[random]);
    this.playerScore = this.scope(
      this.cards[random],
      this.playerScore,
      this.player
    );
    if (
      this.player.some((obj: Carta) => {
        return obj.valor === 11;
      }) &&
      this.playerScore > 21
    ) {
      this.showPlayerPoints = this.playerScore - 10 + '/' + this.playerScore;
    } else {
      this.showPlayerPoints = this.playerScore.toString();
    }
    console.log(this.player);
    this.cards.splice(random, 1);

    if (this.playerScore > 21) {
      this.finishHand = true;
      this.showDealer();
      this.playAgain = false;
      this.messageWinner = 'Dealer Win😩';
      this.platerPasses = true;
      this.resultado = 2;
    }
  }

  scope(carta: Carta, puntaje: number, listaCartas: Carta[]): number {
    if (carta.valor == 1 && puntaje < 21) {
      listaCartas[listaCartas.findIndex((x) => x.valor == 1)].valor = 11;
    }
    let valor = carta.valor;
    puntaje += valor;
    listaCartas.forEach((element) => {
      if (element.valor == 11 && puntaje > 21) {
        puntaje -= 10;
        listaCartas[listaCartas.findIndex((x) => x.valor == 11)].valor = 1;
      }
    });
    return puntaje;
  }

  playHand() {
    this.mesaVisible = true;
    this.finishHand = false;
    this.playHandAgain = false;
    this.getCardPlayer();
    this.getDealerCard();
    this.getCardPlayer();
    this.getDealerCard();
    this.showDealer();
    if (this.playerScore == 21) {
      this.blackJack = true;
      this.showDealer();

      if (this.puntajeCrupier == 21) {
        this.resultado = 0;
        this.playAgain = false;
        this.finishHand = true;
        this.messageWinner = 'Tie😐';
        return;
      }

      this.resultado = 3;
      this.playAgain = false;
      this.finishHand = true;
      this.messageWinner = '¡BLACKJACK!🤑';
    }
  }

  showDealer() {
    if (this.finishHand) {
      this.showDealerPoints = this.puntajeCrupier;
      this.crupier[1].id = this.idCarta;
    } else {
      this.showDealerPoints = this.crupier[0].valor;
      this.idCarta = this.crupier[1].id;
      this.crupier[1].id = 'dorso';
    }
  }

  stand() {
    this.finishHand = true;
    this.playAgain = false;
    this.showDealer();
    this.showPlayerPoints = this.playerScore.toString();

    while (this.puntajeCrupier < 21 && this.puntajeCrupier <= 16) {
      this.getDealerCard();
      this.showDealer();
    }
    if (this.puntajeCrupier <= 21 && this.puntajeCrupier > this.playerScore) {
      this.resultado = 2;
      this.messageWinner = 'Dealer Win😩';
    } else if (
      this.playerScore <= 21 &&
      (this.puntajeCrupier < this.playerScore || this.puntajeCrupier > 21)
    ) {
      this.resultado = 1;
      this.messageWinner = 'You Win!🤑';
    }

    if (this.puntajeCrupier === this.playerScore) {
      this.resultado = 0;
      this.messageWinner = 'Tie😐';
    }
  }

  restart() {
    this.player = [];
    this.showPlayerPoints = '0';
    this.crupier = [];
    this.platerPasses = false;
    this.showDealerPoints = 0;
    this.puntajeCrupier = 0;
    this.playerScore = 0;
    this.playHandAgain = true;
    this.blackJack = false;
    this.finishHand = true;
    this.playAgain = true;
    this.messageWinner = '';
  }

  logout() {
    return this.loginService.logout();
  }
}
