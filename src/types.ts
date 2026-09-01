export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  unit: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified?: boolean;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  link: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    correction: string;
  }[];
}
