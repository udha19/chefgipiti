import { Injectable } from '@angular/core';
import { GoogleGenAI, Modality, Type } from '@google/genai';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  ai = new GoogleGenAI({
    apiKey: environment.GEMINI_KEY,
  });
  constructor() {}

  async generateFromCategory(category: string) {
    const lang = localStorage.getItem('language') || 'en';
    const prompt_id =
      'buatkan list array makanan yang termasuk dalam ' +
      category +
      ' sebutkan 25 item tanpa tambahan teks tambahan lain';
    const promt_en =
      'create a list of array food name which category is' +
      category +
      ' name 25 item without other text or explanation';
    const response: any = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: lang === 'id' ? prompt_id : promt_en,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              food_list: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
              },
            },
          },
          propertyOrdering: ['food_list'],
        },
      },
    });
    return response.candidates[0].content.parts[0].text;
  }

  async generateFood(name: string) {
    const lang = localStorage.getItem('language') || 'en';
    const prompt_id =
      'buatkan saya resep dan cara memasak ' +
      name +
      'dalam bahasa Indonesia, buat dalam bentuk list bahan dan langkah-langkah, tanpa ada tambahan jawaban lain di dalamnya, buat seperti di buku resep masakan';

    const promt_en =
      'create a recipe and step to cooking ' +
      name +
      'in english, create in a list and step by step,without other explanation just recipe and step by step,just like in cook book content';

    const response: any = await this.ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: lang === 'id' ? prompt_id : promt_en,
      config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            recipeName: {
              type: Type.STRING,
            },
            ingredients: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            serve: {
              type: Type.STRING,
            },
            cooking_time: {
              type: Type.STRING,
            }
          },
          propertyOrdering: ["recipeName", "ingredients", "steps", "serve", "cooking_time"],
        },
      },
    },
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
