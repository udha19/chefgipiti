import { Component, EventEmitter, Output } from '@angular/core';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Output() result = new EventEmitter<any>();

  food_name = '';
  loading = false

  category = [
    {
      id: 'appetizers',
      nama_id: 'Hidangan Pembuka',
      nama_en: 'Appetizers',
      deskripsi_id:
        'Sajian ringan yang disajikan sebelum hidangan utama untuk membangkitkan selera makan.',
      deskripsi_en:
        'Light dishes served before the main course to stimulate appetite.',
    },
    {
      id: 'main_courses',
      nama_id: 'Hidangan Utama',
      nama_en: 'Main Courses',
      deskripsi_id:
        'Sajian utama dalam sebuah santapan, biasanya paling mengenyangkan dan bervariasi.',
      deskripsi_en:
        'The primary dish in a meal, typically the most substantial and varied.',
    },
    {
      id: 'desserts',
      nama_id: 'Hidangan Penutup',
      nama_en: 'Desserts',
      deskripsi_id:
        'Sajian manis yang disajikan setelah hidangan utama, seperti kue, es krim, atau buah.',
      deskripsi_en:
        'Sweet dishes served after the main course, such as cakes, ice cream, or fruits.',
    },
    {
      id: 'daily_menus',
      nama_id: 'Menu Sehari-hari',
      nama_en: 'Daily Menus',
      deskripsi_id:
        'Makanan yang umum dikonsumsi sebagai bagian dari rutinitas harian, seringkali praktis dan bergizi.',
      deskripsi_en:
        'Foods commonly consumed as part of daily routine, often practical and nutritious.',
    },
    {
      id: 'street_food',
      nama_id: 'Jajanan Jalanan',
      nama_en: 'Street Food',
      deskripsi_id:
        'Makanan siap saji yang dijual oleh pedagang di jalanan atau area publik lainnya.',
      deskripsi_en:
        'Ready-to-eat food sold by vendors in streets or other public places.',
    },
    {
      id: 'beverages',
      nama_id: 'Minuman',
      nama_en: 'Beverages',
      deskripsi_id:
        'Semua jenis cairan yang bisa diminum, termasuk air, jus, kopi, teh, dan minuman bersoda.',
      deskripsi_en:
        'All types of liquids that can be drunk, including water, juice, coffee, tea, and soft drinks.',
    },
    {
      id: 'snacks',
      nama_id: 'Camilan',
      nama_en: 'Snacks',
      deskripsi_id:
        'Makanan ringan yang dikonsumsi di antara waktu makan utama.',
      deskripsi_en: 'Light food consumed between main meals.',
    },
    {
      id: 'breakfast',
      nama_id: 'Sarapan',
      nama_en: 'Breakfast',
      deskripsi_id: 'Hidangan pertama yang dikonsumsi di pagi hari.',
      deskripsi_en: 'The first meal consumed in the morning.',
    },
    {
      id: 'lunch',
      nama_id: 'Makan Siang',
      nama_en: 'Lunch',
      deskripsi_id: 'Hidangan yang dikonsumsi pada pertengahan hari.',
      deskripsi_en: 'The meal consumed in the middle of the day.',
    },
    {
      id: 'dinner',
      nama_id: 'Makan Malam',
      nama_en: 'Dinner',
      deskripsi_id: 'Hidangan utama yang dikonsumsi pada malam hari.',
      deskripsi_en: 'The main meal consumed in the evening.',
    },
  ];

  constructor(private ai: GeminiService) {}

  pickCategory(category: string) {
    this.loading = true
    this.ai.generateFromCategory(category).then((response) => {
      this.food_name = response;
      this.getFood();
    });
  }

  async getFood() {
    this.loading = true

    const recipe = await this.ai.generateFood(this.food_name).then((response) => {
      return response
    });
    const img = await this.ai.generateFoodImage(this.food_name).then((response) => {
      return response
      this.loading = false
    })
    this.result.emit({
      food_name: this.food_name,
      recipe: recipe,
      image: img,
    })
  }
}
