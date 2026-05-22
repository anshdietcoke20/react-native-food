export type Restaurant = {
  id: string;
  name: string;
  price: number;
  cuisine: string;
  rating: number;
  eta: string;
  description: string;
  banner: string;
};

export const restaurants: Restaurant[] = [
  {
    id: '101',
    name: 'Sushi Sora',
    price: 18,
    cuisine: 'Japanese · Sushi',
    rating: 4.8,
    eta: '25-35 min',
    description: 'Nigiri, sashimi, and a few dragon rolls.',
    banner: '🍣',
  },
  {
    id: '102',
    name: 'Bella Pizzeria',
    price: 14,
    cuisine: 'Italian · Pizza',
    rating: 4.6,
    eta: '20-30 min',
    description: 'Wood-fired Neapolitan pizzas.',
    banner: '🍕',
  },
  {
    id: '103',
    name: 'Taco Loco',
    price: 11,
    cuisine: 'Mexican · Street Food',
    rating: 4.5,
    eta: '15-25 min',
    description: 'Tacos, salsas, fresh corn tortillas.',
    banner: '🌮',
  },
  {
    id: '104',
    name: 'Curry Leaf',
    price: 16,
    cuisine: 'Indian · Curry',
    rating: 4.7,
    eta: '30-40 min',
    description: 'Curries, naan, and biryani.',
    banner: '🍛',
  },
  {
    id: '105',
    name: 'Green Bowl',
    price: 13,
    cuisine: 'Healthy · Salads',
    rating: 4.4,
    eta: '15-20 min',
    description: 'Salad bowls, grain bowls, cold-pressed juices.',
    banner: '🥗',
  },
  {
    id: '123',
    name: 'Burger Yard',
    price: 12,
    cuisine: 'American · Burgers',
    rating: 4.6,
    eta: '20-30 min',
    description: 'Smashed patties, brioche buns, hand-cut fries.',
    banner: '🍔',
  },
];

export function findRestaurant(id: string) {
  return restaurants.find((r) => r.id === id);
}
