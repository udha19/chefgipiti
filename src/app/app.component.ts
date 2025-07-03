import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'chefgpt';
  
  showResult = false;
  result_data: any

  constructor(private translate: TranslateService) {
  }
  getResult(event: any) {
    this.showResult = true;
    this.result_data = event;
  }

  async ngOnInit() {
    const storedLang = localStorage.getItem('language');
    if (storedLang) {
      this.translate.use(storedLang);
    } else {
      const browserLang = this.translate.getBrowserLang();
      const defaultLang = browserLang?.match(/en|id/) ? browserLang : 'en';
      this.translate.use(defaultLang);
      localStorage.setItem('language', defaultLang);
    }
  }
}
