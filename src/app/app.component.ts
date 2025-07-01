import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'chefgpt';
  
  showResult = false;
  result_data: any
  getResult(event: any) {
    this.showResult = true;
    this.result_data = event;
  }
}
