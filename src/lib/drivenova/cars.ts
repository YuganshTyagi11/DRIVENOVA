import suvImg from "@/assets/car-suv.jpg";
import sedanImg from "@/assets/car-sedan.jpg";
import coupeImg from "@/assets/car-coupe.jpg";
import compactImg from "@/assets/car-compact.jpg";
import familyImg from "@/assets/car-family.jpg";
import truckImg from "@/assets/car-truck.jpg";

export type Car = {
  id: string;
  name: string;
  brand: string;
  type: "SUV" | "Sedan" | "Coupe" | "Compact SUV" | "Truck";
  price: number; // in lakh INR
  image: string;
  range: number; // km
  power: number; // hp
  acceleration: number; // 0-100 sec
  topSpeed: number; // km/h
  seats: number;
  tags: string[];
  rating: number;
};

export const CARS: Car[] = [
  {
    id: "nova-x",
    name: "Nova X",
    brand: "DriveNova",
    type: "SUV",
    price: 14.5,
    image: suvImg,
    range: 520,
    power: 320,
    acceleration: 6.2,
    topSpeed: 200,
    seats: 7,
    tags: ["Family", "Best Value", "Long Range"],
    rating: 4.8,
  },
  {
    id: "nova-s",
    name: "Nova S",
    brand: "DriveNova",
    type: "Sedan",
    price: 22.9,
    image: sedanImg,
    range: 610,
    power: 410,
    acceleration: 4.1,
    topSpeed: 250,
    seats: 5,
    tags: ["Premium", "Long Range"],
    rating: 4.9,
  },
  {
    id: "nova-gt",
    name: "Nova GT",
    brand: "DriveNova",
    type: "Coupe",
    price: 38.5,
    image: coupeImg,
    range: 480,
    power: 760,
    acceleration: 2.4,
    topSpeed: 320,
    seats: 2,
    tags: ["Performance", "Flagship"],
    rating: 4.9,
  },
  {
    id: "nova-mini",
    name: "Nova Mini",
    brand: "DriveNova",
    type: "Compact SUV",
    price: 9.8,
    image: compactImg,
    range: 380,
    power: 180,
    acceleration: 8.5,
    topSpeed: 170,
    seats: 5,
    tags: ["City", "Budget"],
    rating: 4.6,
  },
  {
    id: "nova-orbit",
    name: "Nova Orbit",
    brand: "DriveNova",
    type: "SUV",
    price: 13.2,
    image: familyImg,
    range: 470,
    power: 280,
    acceleration: 7.0,
    topSpeed: 190,
    seats: 7,
    tags: ["Family", "Best Value"],
    rating: 4.7,
  },
  {
    id: "nova-haul",
    name: "Nova Haul",
    brand: "DriveNova",
    type: "Truck",
    price: 29.0,
    image: truckImg,
    range: 540,
    power: 600,
    acceleration: 3.8,
    topSpeed: 210,
    seats: 5,
    tags: ["Utility", "Performance"],
    rating: 4.8,
  },
];

export const inr = (lakh: number) =>
  `₹${lakh.toFixed(2)} L`;