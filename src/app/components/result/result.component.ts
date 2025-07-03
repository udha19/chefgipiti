import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent implements OnInit {
 
  @Input()  data: any
  recipe_data: any;
  @ViewChild('pdfContent', { static: false }) pdfContent: ElementRef | null = null;

  constructor(
    private util : UtilService
  ){}

  ngOnInit(): void {
    const recipe_data = JSON.parse(this.data.recipe);
    this.recipe_data = recipe_data[0];
  }

  share(){
    const content = this.pdfContent?.nativeElement;
    const name = this.data.food_name.replace(/\s+/g, '_').toLowerCase();
    this.util.generateDoc(content, name);
  }
}
