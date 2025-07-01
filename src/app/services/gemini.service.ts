import { Injectable } from '@angular/core';
import { GoogleGenAI, Modality } from '@google/genai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  ai = new GoogleGenAI({
    apiKey: environment.GEMINI_KEY
  });
  constructor() {}

  async generateFromCategory(category: string) {
     const response: any = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'sebutkan satu nama makanan yang termasuk dalam '+category+' sebutkan hanya satu makanan tanpa tekx tambahan lain',
        
    });
    return response.candidates[0].content.parts[0].text;
  }

  async generateFood(name: string) {
    const response: any = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents:
        'buatkan saya resep dan cara memasak ' +
        name +
        'dalam bahasa Indonesia, buat dalam bentuk list bahan dan langkah-langkah, tanpa ada tambahan jawaban lain di dalamnya, buat seperti di buku resep masakan',
    });
    return response.candidates[0].content.parts[0].text;
  }

  async generateFoodImage(name: string) {
    const response: any = await this.ai.models.generateContent({
      model: 'gemini-2.0-flash-preview-image-generation',
      contents:
        'buatkan saya gambar makanan ' +
        name +
        ' dalam gaya realistis dengan garnish cantik tanpa ada text tambahan, buat seperti di buku resep masakan',
      config: {
        responseModalities: [Modality.TEXT, Modality.IMAGE],
      },
    });
    for (const part of response.candidates[0].content.parts) {
    if (part.text) {
      console.log(part.text);
    } else if (part.inlineData) {
      const imageData = part.inlineData.data;
      return imageData; 
    }
  }
  }
}
