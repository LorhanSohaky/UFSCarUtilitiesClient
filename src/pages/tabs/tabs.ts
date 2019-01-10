import { Component } from '@angular/core';

import { CardapioPage } from '../cardapio/cardapio';
import { HomePage } from '../home/home';
import { BibliotecaPage } from '../biblioteca/biblioteca';
import { SigaPage } from '../siga/siga';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = SigaPage;
  tab3Root = CardapioPage;
  tab4Root = BibliotecaPage;

  constructor() {

  }
}
