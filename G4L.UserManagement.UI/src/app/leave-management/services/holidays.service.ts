import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {

  constructor() { }
  getHolidays() {
    return fetch(
      `https://public-holiday.p.rapidapi.com/2022/ZA`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key':
            '0a1eafe8c8msh422e2b65e417463p13d7e7jsn019ba2a0d267',
          'X-RapidAPI-Host': 'public-holiday.p.rapidapi.com',
        },
      }
    )
      .then((val) => val.json())
      .then((response) => {
        return response;

      })
      .catch((err) => {
        return console.error(err);
      });

  }
}
