export interface DataType {
  key: string;
  name: string;
  money: number;
  date: Date;
}

export const initialPaymentData: DataType[] = [
  {
    key: "1",
    name: "Коммунальные услуги",
    money: 65,
    date: new Date("2025-09-25"),
  },
  {
    key: "2",
    name: "Интернет",
    money: 50,
    date: new Date("2025-09-15"),
  },
  {
    key: "3",
    name: "Мобильная связь",
    money: 25,
    date: new Date("2025-09-10"),
  },
  {
    key: "4",
    name: "Подписка Яндекс",
    money: 8,
    date: new Date("2025-09-30"),
  },
  {
    key: "5",
    name: "Электричество",
    money: 25,
    date: new Date("2025-09-25"),
  },
];
