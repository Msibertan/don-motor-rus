// Примеры авто. Цены условные; фото — из набора реальных снимков (public/images).
// Под реальный проект подставьте фактические фотографии каждого автомобиля.
export const cars = [
  { id: 1, name: 'BMW M340i xDrive', brand: 'BMW', country: 'Германия', year: 2022, mileage: 38000, engine: '3.0 бензин', gearbox: 'Автомат', priceEur: 46500, priceRub: 5190000, img: 'car1', badge: 'Хит' },
  { id: 2, name: 'Audi A6 50 TDI quattro', brand: 'AUDI', country: 'Германия', year: 2021, mileage: 64000, engine: '3.0 дизель', gearbox: 'Автомат', priceEur: 41200, priceRub: 4590000, img: 'car2' },
  { id: 3, name: 'Mercedes-Benz GLE 300d', brand: 'MERCEDES', country: 'Германия', year: 2022, mileage: 29000, engine: '2.0 дизель', gearbox: 'Автомат', priceEur: 58900, priceRub: 6570000, img: 'car3', badge: 'Premium' },
  { id: 4, name: 'Volkswagen Golf GTI', brand: 'VW', country: 'Польша', year: 2021, mileage: 47000, engine: '2.0 бензин', gearbox: 'Робот', priceEur: 28400, priceRub: 3170000, img: 'car4' },
  { id: 5, name: 'Porsche Macan S', brand: 'PORSCHE', country: 'Нидерланды', year: 2020, mileage: 71000, engine: '3.0 бензин', gearbox: 'Робот', priceEur: 52300, priceRub: 5830000, img: 'car5', badge: 'Хит' },
  { id: 6, name: 'Skoda Octavia RS', brand: 'SKODA', country: 'Литва', year: 2022, mileage: 33000, engine: '2.0 бензин', gearbox: 'Робот', priceEur: 26900, priceRub: 3000000, img: 'car6' },
  { id: 7, name: 'BMW X5 xDrive40d', brand: 'BMW', country: 'Германия', year: 2021, mileage: 58000, engine: '3.0 дизель', gearbox: 'Автомат', priceEur: 61500, priceRub: 6860000, img: 'car7' },
  { id: 8, name: 'Audi Q5 40 TDI', brand: 'AUDI', country: 'Латвия', year: 2020, mileage: 82000, engine: '2.0 дизель', gearbox: 'Автомат', priceEur: 33700, priceRub: 3760000, img: 'car8' },
  { id: 9, name: 'Mercedes-Benz C200', brand: 'MERCEDES', country: 'Германия', year: 2022, mileage: 41000, engine: '1.5 бензин', gearbox: 'Автомат', priceEur: 37800, priceRub: 4210000, img: 'car9' },
]

export const brands = ['Все марки', ...Array.from(new Set(cars.map((c) => c.brand)))]
