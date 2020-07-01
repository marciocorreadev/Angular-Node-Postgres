import { Component } from '@angular/core';
import { NbIconLibraries, NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'gerador-de-precos';
  constructor(private sidebarService: NbSidebarService) {}

  toggle() {
    this.sidebarService.toggle(true);
  }
}
