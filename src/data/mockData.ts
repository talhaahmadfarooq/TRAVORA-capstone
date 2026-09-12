import type { Destination, Flight, Stay, Trip, User, FavoritesState, JourneySearch } from '../types';

export const mockDestinations: Destination[] = [
  {
    "id": "tokyo",
    "name": "Tokyo",
    "country": "Japan",
    "tagLine": "Where Neon Dreams Meet Ancient Reverence",
    "description": "A hyper-modern metropolis pulsing with electrifying energy, cutting-edge gastronomy, and serene Shinto shrines nestled between towering skyscrapers.",
    "category": "Metropolitan",
    "mood": "Futuristic & Vibrant",
    "bestTime": "March - May & October - November",
    "language": "Japanese",
    "currency": "JPY (¥)",
    "timezone": "GMT+9",
    "coordinates": [
      35.6762,
      139.6503
    ],
    "weather": {
      "temp": 18,
      "condition": "Clear Sky",
      "humidity": 58,
      "wind": "12 km/h"
    },
    "places": [
      {
        "id": "pl-tok-1",
        "title": "Shinjuku",
        "description": "The neon-lit entertainment capital of the world.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1723983556172-ee1932896694?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2hpbmp1a3UlMjB0b2t5byUyMG5pZ2h0fGVufDB8MHx8fDE3ODkyNDA4NDJ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-tok-2",
        "title": "Tokyo Skytree",
        "description": "Unmatched vistas from Japan's tallest structure.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9reW8lMjBza3l0cmVlfGVufDB8MHx8fDE3ODkyNDA4NDN8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-tok-3",
        "title": "Akihabara",
        "description": "The electric town of anime, gaming, and neon.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1723983556109-7415d601c377?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YWtpaGFiYXJhJTIwdG9reW98ZW58MHwwfHx8MTc4OTI0MDg0M3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-tok-4",
        "title": "Ueno Park",
        "description": "A vast cultural park filled with museums and cherry blossoms.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1560257934-c627e08b0b17?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dWVubyUyMHBhcmslMjBjaGVycnklMjBibG9zc29tfGVufDB8MHx8fDE3ODkyNDA4NDR8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-tok-5",
        "title": "Senso-ji & Asakusa",
        "description": "The ancient Buddhist temple and traditional market.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1769351842029-2e7f69df6e0b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2Vuc28tamklMjBhc2FrdXNhfGVufDB8MHx8fDE3ODkyNDA4NDZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-tok-1",
        "title": "Shibuya Crossing",
        "description": "Navigate the world's busiest intersection in the heart of Tokyo.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1661902398022-762e88ff3f82?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2hpYnV5YSUyMGNyb3NzaW5nJTIwdG9reW98ZW58MHwwfHx8MTc4OTI0MDg0NXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-tok-2",
        "title": "Meiji Shrine Forest",
        "description": "Experience the serene forested path to Tokyo's most famous Shinto shrine.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1723669629833-0ed6ebac44a0?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWVpamklMjBzaHJpbmUlMjB0b2t5b3xlbnwwfDB8fHwxNzg5MjQwODQ2fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-tok-3",
        "title": "Traditional Tea Ceremony",
        "description": "Immerse yourself in the disciplined beauty of a Japanese tea ritual.",
        "duration": "1.5 hours",
        "image": "https://plus.unsplash.com/premium_photo-1726804803991-ee6bd503adb2?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amFwYW5lc2UlMjB0ZWElMjBjZXJlbW9ueXxlbnwwfDB8fHwxNzg5MjQwODQ3fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-tok-1",
        "title": "Tsukiji Outer Market",
        "description": "World-class sushi and vibrant seafood market culture.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1556173302-31961d329ef9?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHN1a2lqaSUyMG1hcmtldCUyMHN1c2hpfGVufDB8MHx8fDE3ODkyNDA4NDh8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-tok-2",
        "title": "Authentic Ramen",
        "description": "Rich, steaming bowls of tonkotsu ramen in hidden alleyways.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1614563637806-1d0e645e0940?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmFtZW4lMjBib3dsJTIwdG9reW98ZW58MHwwfHx8MTc4OTI0MDg0OXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-tok-3",
        "title": "Kaiseki Dining",
        "description": "Multi-course Japanese dinners balancing taste, texture, and appearance.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1723924822207-23699f618d2a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a2Fpc2VraSUyMGRpbmluZyUyMGphcGFufGVufDB8MHx8fDE3ODkyNDA4NTB8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-tok-4",
        "title": "Izakaya Alley",
        "description": "Charcoal-grilled yakitori and sake in a bustling local tavern.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1661873673782-88b30e6abef4?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aXpha2F5YSUyMHRva3lvfGVufDB8MHx8fDE3ODkyNDA4NTF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-tok-1",
        "title": "Golden Gai",
        "description": "A labyrinth of narrow alleys packed with tiny atmospheric bars.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1716832627250-27cb0dcb305b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z29sZGVuJTIwZ2FpJTIwdG9reW98ZW58MHwwfHx8MTc4OTI0MDg1MXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-tok-2",
        "title": "Roppongi Clubs",
        "description": "The epicenter of Tokyo's high-energy international nightlife.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1606291121612-52a61ff40095?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cm9wcG9uZ2klMjBuaWdodGxpZmV8ZW58MHwwfHx8MTc4OTI0MDg1Mnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-tok-3",
        "title": "Shibuya Bars",
        "description": "Neon-soaked streets filled with karaoke, craft cocktails, and energy.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9reW8lMjBuZW9uJTIwc2t5bGluZSUyMG5pZ2h0fGVufDB8MHx8fDE3ODkyNDA4Mzl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9reW8lMjBuZW9uJTIwc2t5bGluZSUyMG5pZ2h0fGVufDB8MHx8fDE3ODkyNDA4Mzl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1666700698920-d2d2bba589f8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9reW8lMjBzdHJlZXR8ZW58MHwwfHx8MTc4OTI0MDgzOXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1661873673782-88b30e6abef4?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9reW8lMjB0cmFkaXRpb25hbHxlbnwwfDB8fHwxNzg5MjQwODQwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1661914240950-b0124f20a5c1?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9reW8lMjBzdW5zZXQlMjBza3lsaW5lfGVufDB8MHx8fDE3ODkyNDA4NDF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/tokyo.png"
  },
  {
    "id": "kyoto",
    "name": "Kyoto",
    "country": "Japan",
    "tagLine": "Echoes of Emperors & Whispering Bamboo",
    "description": "The timeless cultural soul of Japan, adorned with over a thousand gilded temples, tranquil rock gardens, and lantern-lit geisha alleys in Gion.",
    "category": "Cultural Heritage",
    "mood": "Zen & Historic",
    "bestTime": "March - May & October - November",
    "language": "Japanese",
    "currency": "JPY (¥)",
    "timezone": "GMT+9",
    "coordinates": [
      35.0116,
      135.7681
    ],
    "weather": {
      "temp": 16,
      "condition": "Mild Breeze",
      "humidity": 62,
      "wind": "8 km/h"
    },
    "places": [
      {
        "id": "pl-kyo-1",
        "title": "Gion District",
        "description": "Historic wooden machiya houses and the elusive world of geisha.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1717649389730-ba6d16053b43?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z2lvbiUyMGRpc3RyaWN0JTIwa3lvdG98ZW58MHwwfHx8MTc4OTI0MDg1N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-kyo-2",
        "title": "Kiyomizu-dera",
        "description": "The iconic wooden temple overlooking the city.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1602897387777-f89c6b7e4a9e?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a2l5b21penUtZGVyYSUyMGt5b3RvfGVufDB8MHx8fDE3ODkyNDA4NTh8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-kyo-3",
        "title": "Kinkaku-ji",
        "description": "The stunning Golden Pavilion reflecting in a serene pond.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/flagged/photo-1575356253609-f32f494b1a23?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a2lua2FrdS1qaSUyMGt5b3RvfGVufDB8MHx8fDE3ODkyNDA4NTl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-kyo-4",
        "title": "Philosopher's Path",
        "description": "A meditative stone path lined with hundreds of cherry trees.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1664472640765-40a5265ec3ee?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGhpbG9zb3BoZXJzJTIwcGF0aCUyMGt5b3RvfGVufDB8MHx8fDE3ODkyNDA4NTl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-kyo-1",
        "title": "Fushimi Inari Shrine",
        "description": "Walk through thousands of vermilion torii gates winding up the sacred mountain.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1722593856044-e5176ca19a5f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZnVzaGltaSUyMGluYXJpJTIwa3lvdG98ZW58MHwwfHx8MTc4OTI0MDg2MHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-kyo-2",
        "title": "Arashiyama Bamboo Grove",
        "description": "Stand amid soaring stalks of bamboo in this otherworldly natural wonder.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1661962545285-cfb1b576c4c6?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXJhc2hpeWFtYSUyMGJhbWJvbyUyMGdyb3ZlfGVufDB8MHx8fDE3ODkyNDA4NjF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-kyo-3",
        "title": "Geisha Tea Ceremony",
        "description": "An elegant, private encounter with Kyoto's traditional entertainers.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1664476561349-52e62c71ebca?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z2Vpc2hhJTIwa3lvdG98ZW58MHwwfHx8MTc4OTI0MDg2Mnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-kyo-1",
        "title": "Kaiseki Dining",
        "description": "Traditional multi-course dinners reflecting seasonal atmosphere.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1740982931610-9309b6e88f30?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a3lvdG8lMjBrYWlzZWtpfGVufDB8MHx8fDE3ODkyNDA4NjN8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-kyo-2",
        "title": "Nishiki Market",
        "description": "Kyoto's kitchen, offering fresh seafood, pickles, and street food.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1686538381765-da778cf88d9b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmlzaGlraSUyMG1hcmtldCUyMGt5b3RvfGVufDB8MHx8fDE3ODkyNDA4NjN8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-kyo-3",
        "title": "Matcha Sweets",
        "description": "Artisanal green tea parfaits, mochi, and traditional confections.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1689919083044-24e3ea70095d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWF0Y2hhJTIwc3dlZXRzJTIwamFwYW58ZW58MHwwfHx8MTc4OTI0MDg2NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-kyo-1",
        "title": "Pontocho Alley Bars",
        "description": "Atmospheric lantern-lit alleyway packed with intimate riverside bars.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1652276317492-4350c854ae46?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cG9udG9jaG8lMjBhbGxleSUyMGt5b3RvfGVufDB8MHx8fDE3ODkyNDA4NjV8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-kyo-2",
        "title": "Kamo River Evenings",
        "description": "Relaxed evening atmosphere along the river banks with outdoor terraces.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1722704537052-04209596bf4e?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a2FtbyUyMHJpdmVyJTIwa3lvdG8lMjBuaWdodHxlbnwwfDB8fHwxNzg5MjQwODY2fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1664297810044-71bec6048ea9?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a3lvdG8lMjB0ZW1wbGUlMjBhdXR1bW58ZW58MHwwfHx8MTc4OTI0MDg1NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1722593856044-e5176ca19a5f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a3lvdG8lMjBnZWlzaGF8ZW58MHwwfHx8MTc4OTI0MDg1NXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1722771748226-a6d0c0034019?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a3lvdG8lMjB6ZW4lMjBnYXJkZW58ZW58MHwwfHx8MTc4OTI0MDg1Nnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1749826521425-d78d76ee6290?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a3lvdG8lMjBsYW50ZXJufGVufDB8MHx8fDE3ODkyNDA4NTZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/kyoto.png"
  },
  {
    "id": "lahore",
    "name": "Lahore",
    "country": "Pakistan",
    "tagLine": "The Walled Heart of Mughal Splendor",
    "description": "A legendary cultural capital where centuries of Mughal emperors left intricate marble palaces, fragrant gardens, and a legendary culinary heritage.",
    "category": "Cultural Heritage",
    "mood": "Historic & Poetic",
    "bestTime": "October - March",
    "language": "Urdu / Punjabi",
    "currency": "PKR (Rs)",
    "timezone": "GMT+5",
    "coordinates": [
      31.5204,
      74.3587
    ],
    "weather": {
      "temp": 22,
      "condition": "Golden Sunset",
      "humidity": 45,
      "wind": "5 km/h"
    },
    "places": [
      {
        "id": "pl-lhr-1",
        "title": "Minar-e-Pakistan",
        "description": "The towering monument of independence set in sweeping parklands.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWluYXItZS1wYWtpc3RhbiUyMGxhaG9yZXxlbnwwfDB8fHwxNzg5MjQwODcwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-lhr-2",
        "title": "Walled City of Lahore",
        "description": "Narrow alleys filled with history, vibrant life, and street atmosphere.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1622546758596-f1f06ba11f58?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8d2FsbGVkJTIwY2l0eSUyMGxhaG9yZXxlbnwwfDB8fHwxNzg5MjQwODcxfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-lhr-3",
        "title": "Shalimar Gardens",
        "description": "A masterpiece of Mughal landscape architecture and waterworks.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1702435539220-d9f1f7f2975e?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2hhbGltYXIlMjBnYXJkZW5zJTIwbGFob3JlfGVufDB8MHx8fDE3ODkyNDA4NzF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-lhr-4",
        "title": "Wazir Khan Mosque",
        "description": "A breathtakingly ornate mosque famous for its intricate fresco work.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1697730390709-48bebc012175?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8d2F6aXIlMjBraGFuJTIwbW9zcXVlfGVufDB8MHx8fDE3ODkyNDA4NzJ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-lhr-1",
        "title": "Badshahi Mosque at Dusk",
        "description": "Explore the vast red sandstone courtyards of the iconic 17th-century mosque.",
        "duration": "2 hours",
        "image": "https://images.unsplash.com/photo-1610121073761-2bf492eca52a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFkc2hhaGklMjBtb3NxdWUlMjBzdW5zZXR8ZW58MHwwfHx8MTc4OTI0MDg3M3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-lhr-2",
        "title": "Lahore Fort & Mughal Architecture",
        "description": "Walk through historic gates to discover restored Mughal bathhouses and centuries-old Havelis.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1697730392744-f02b027471b6?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bGFob3JlJTIwZm9ydHxlbnwwfDB8fHwxNzg5MjQwODY4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-lhr-3",
        "title": "Wagah Border Ceremony",
        "description": "The energetic and highly synchronized military parade at the India-Pakistan border.",
        "duration": "3 hours",
        "image": "https://images.unsplash.com/photo-1651910031211-42aaa52b87cc?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8d2FnYWglMjBib3JkZXIlMjBjZXJlbW9ueXxlbnwwfDB8fHwxNzg5MjQwODc0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-lhr-1",
        "title": "Food Street & Anarkali",
        "description": "Sizzle and spice: vibrant local cuisine in the shadow of illuminated heritage architecture.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1630431312723-2e4c550d4a99?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Zm9vZCUyMHN0cmVldCUyMGxhaG9yZXxlbnwwfDB8fHwxNzg5MjQwODc1fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-lhr-2",
        "title": "Traditional Lahori Breakfast",
        "description": "Rich Halwa Puri, Nihari, and Lassi to start the day like a local.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1723928494246-0c38f1bdf204?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFraXN0YW5pJTIwZm9vZCUyMGZlYXN0fGVufDB8MHx8fDE3ODkyNDA4NzZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-lhr-3",
        "title": "Gawalmandi Food Culture",
        "description": "The historic heart of Lahore's legendary culinary scene.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1723708882892-de33ff578c11?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3RyZWV0JTIwZm9vZCUyMHBha2lzdGFufGVufDB8MHx8fDE3ODkyNDA4Nzd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-lhr-1",
        "title": "Cultural Evenings at Alhamra",
        "description": "Traditional music, theater, and poetry readings in a modern architectural marvel.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1685650397140-85c4d9f0b74f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YWxoYW1yYSUyMGFydHMlMjBjb3VuY2lsfGVufDB8MHx8fDE3ODkyNDA4Nzh8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-lhr-2",
        "title": "Rooftop Dining",
        "description": "Atmospheric dinners overlooking the illuminated Badshahi Mosque.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1697730390709-48bebc012175?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFkc2hhaGklMjBtb3NxdWUlMjBsYWhvcmV8ZW58MHwwfHx8MTc4OTI0MDg2N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1697730390709-48bebc012175?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFkc2hhaGklMjBtb3NxdWUlMjBsYWhvcmV8ZW58MHwwfHx8MTc4OTI0MDg2N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1697730392744-f02b027471b6?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bGFob3JlJTIwZm9ydHxlbnwwfDB8fHwxNzg5MjQwODY4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1677355735461-28d1cfb28318?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWluYXItZS1wYWtpc3RhbnxlbnwwfDB8fHwxNzg5MjQwODY4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603491656337-3b491147917c?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bGFob3JlJTIwd2FsbGVkJTIwY2l0eXxlbnwwfDB8fHwxNzg5MjQwODY5fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/lahore.png"
  },
  {
    "id": "marrakech",
    "name": "Marrakech",
    "country": "Morocco",
    "tagLine": "Ochre Walls, Spice Gardens & Starry Riads",
    "description": "An intoxicating sensory oasis filled with labyrinthine souks, intricately carved cedar riads, palm groves, and the dramatic backdrop of the Atlas Mountains.",
    "category": "Desert Oasis",
    "mood": "Exotic & Sensorial",
    "bestTime": "October - April",
    "language": "Arabic / French",
    "currency": "MAD (DH)",
    "timezone": "GMT+1",
    "coordinates": [
      31.6295,
      -7.9811
    ],
    "weather": {
      "temp": 28,
      "condition": "Warm Sun",
      "humidity": 32,
      "wind": "9 km/h"
    },
    "places": [
      {
        "id": "pl-mar-1",
        "title": "Bahia Palace",
        "description": "A stunning masterpiece of Moroccan architecture and intricate mosaics.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1599859725763-4a16c9468890?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFoaWElMjBwYWxhY2UlMjBtYXJyYWtlY2h8ZW58MHwwfHx8MTc4OTI0MDkwMnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-mar-2",
        "title": "Koutoubia Mosque",
        "description": "The iconic 12th-century minaret towering over the ochre city.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1699555731489-f642f966564c?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a291dG91YmlhJTIwbW9zcXVlJTIwbWFycmFrZWNofGVufDB8MHx8fDE3ODkyNDA5MDN8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-mar-3",
        "title": "Saadian Tombs",
        "description": "Opulent marble mausoleums dating back to the 16th century.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1697730355271-263ac15a2a40?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FhZGlhbiUyMHRvbWJzfGVufDB8MHx8fDE3ODkyNDA5MDR8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-mar-4",
        "title": "Ben Youssef Madrasa",
        "description": "An exquisitely decorated historic Islamic college.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1697729887553-b0392581a691?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmVuJTIweW91c3NlZiUyMG1hZHJhc2F8ZW58MHwwfHx8MTc4OTI0MDkwNXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-mar-1",
        "title": "Jardin Majorelle",
        "description": "Private stroll through YSL's botanical haven featuring exotic flora and vibrant cobalt blue structures.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1673141390230-8b4a3c3152b1?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amFyZGluJTIwbWFqb3JlbGxlfGVufDB8MHx8fDE3ODkyNDA5MDZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-mar-2",
        "title": "Jemaa el-Fnaa & Souks",
        "description": "The bustling heart of the Medina, alive with storytellers, musicians, and spice stalls.",
        "duration": "4 hours",
        "image": "https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amVtYWElMjBlbCUyMGZuYWElMjBtYXJyYWtlY2h8ZW58MHwwfHx8MTc4OTI0MDkwN3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-mar-3",
        "title": "Camel Ride in Palmeraie",
        "description": "Explore the vast palm groves outside the city on a traditional camel trek.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2FtZWwlMjByaWRlJTIwbW9yb2Njb3xlbnwwfDB8fHwxNzg5MjQwOTA4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-mar-1",
        "title": "Traditional Tagine",
        "description": "Slow-cooked savory stews prepared in iconic clay pots.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1679811672112-dfe811796cf9?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9yb2NjYW4lMjB0YWdpbmV8ZW58MHwwfHx8MTc4OTI0MDkwOXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-mar-2",
        "title": "Mint Tea at a Medina Cafe",
        "description": "The ceremonial pouring of sweet Moroccan mint tea overlooking the square.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1682097617396-e510665e0dc8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9yb2NjYW4lMjBtaW50JTIwdGVhfGVufDB8MHx8fDE3ODkyNDA5MTB8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-mar-3",
        "title": "Couscous Friday",
        "description": "Join the local tradition of sharing a grand platter of couscous and vegetables.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1713089941197-0a4c8b3dfeca?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9yb2NjYW4lMjBjb3VzY291c3xlbnwwfDB8fHwxNzg5MjQwOTExfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-mar-1",
        "title": "Luxury Hammam Evening",
        "description": "A rejuvenating traditional spa experience in an opulent, candle-lit sanctuary.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1697729854627-580af726d657?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bHV4dXJ5JTIwaGFtbWFtJTIwbW9yb2Njb3xlbnwwfDB8fHwxNzg5MjQwOTEzfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-mar-2",
        "title": "Night Market at Jemaa el-Fnaa",
        "description": "The square transforms into a massive open-air dining and entertainment venue.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1680981141997-f49d60ed4933?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amVtYWElMjBlbCUyMGZuYWElMjBuaWdodHxlbnwwfDB8fHwxNzg5MjQwOTE0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-mar-3",
        "title": "Rooftop Bar in Gueliz",
        "description": "Chic cocktails and modern nightlife in the French Quarter.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1699555731489-f642f966564c?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFycmFrZWNoJTIwcm9vZnRvcCUyMGJhcnxlbnwwfDB8fHwxNzg5MjQwOTE1fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1699555731489-f642f966564c?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFycmFrZWNoJTIwYXJjaGl0ZWN0dXJlfGVufDB8MHx8fDE3ODkyNDA4Nzl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFycmFrZWNoJTIwcmlhZHxlbnwwfDB8fHwxNzg5MjQwODg0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1677534712570-5c6f50ea3703?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFycmFrZWNoJTIwbWFya2V0fGVufDB8MHx8fDE3ODkyNDA4OTB8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1697729606469-027395aadb6f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFoaWElMjBwYWxhY2V8ZW58MHwwfHx8MTc4OTI0MDg5OXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/marrakech.png"
  },
  {
    "id": "amsterdam",
    "name": "Amsterdam",
    "country": "Netherlands",
    "tagLine": "Golden Age Canals & Avant-Garde Culture",
    "description": "A picture-perfect network of historic waterways lined with leaning gabled houses, world-class art museums, and an effortless cycling culture.",
    "category": "Historic City",
    "mood": "Charming & Artistic",
    "bestTime": "April - September",
    "language": "Dutch",
    "currency": "EUR (€)",
    "timezone": "GMT+1",
    "coordinates": [
      52.3676,
      4.9041
    ],
    "weather": {
      "temp": 15,
      "condition": "Partly Cloudy",
      "humidity": 75,
      "wind": "15 km/h"
    },
    "places": [
      {
        "id": "pl-ams-1",
        "title": "Jordaan Neighborhood",
        "description": "Wander through this charming neighborhood of art galleries and hidden courtyards.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661878122586-2d75a86f3400?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8am9yZGFhbiUyMGFtc3RlcmRhbXxlbnwwfDB8fHwxNzg5MjQwOTIwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ams-2",
        "title": "Vondelpark",
        "description": "The sprawling, vibrant urban park perfect for cycling and picnics.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1733266955631-fd29907afae8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dm9uZGVscGFya3xlbnwwfDB8fHwxNzg5MjQwOTIwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ams-3",
        "title": "Anne Frank House",
        "description": "The deeply moving historic hiding place and museum.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661878743895-d7addb98570f?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW5uZSUyMGZyYW5rJTIwaG91c2UlMjBhbXN0ZXJkYW18ZW58MHwwfHx8MTc4OTI0MDkyMXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ams-4",
        "title": "Dam Square",
        "description": "The bustling historical center featuring the Royal Palace.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1581193632869-f5004384a6ed?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZGFtJTIwc3F1YXJlJTIwYW1zdGVyZGFtfGVufDB8MHx8fDE3ODkyNDA5MjJ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-ams-1",
        "title": "Evening City Atmosphere & Canals",
        "description": "Cruise through the UNESCO-listed 17th-century canal ring at twilight.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1734415575079-f84c6b71e6e6?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW1zdGVyZGFtJTIwY2FuYWwlMjBib2F0fGVufDB8MHx8fDE3ODkyNDA5MjN8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-ams-2",
        "title": "Rijksmuseum",
        "description": "Immerse yourself in the masterpieces of the Dutch Golden Age.",
        "duration": "4 hours",
        "image": "https://plus.unsplash.com/premium_photo-1694475042907-e46227724136?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmlqa3NtdXNldW0lMjBhbXN0ZXJkYW18ZW58MHwwfHx8MTc4OTI0MDkyNHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-ams-3",
        "title": "Van Gogh Museum",
        "description": "The world's largest collection of artworks by Vincent van Gogh.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1706548911842-7162d4bd2c98?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmFuJTIwZ29naCUyMG11c2V1bXxlbnwwfDB8fHwxNzg5MjQwOTI0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-ams-1",
        "title": "Stroopwafels & Dutch Pancakes",
        "description": "Sweet treats from historic bakeries and cozy pancake houses.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1726072394244-aeb1f9fe66ef?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3Ryb29wd2FmZWx8ZW58MHwwfHx8MTc4OTI0MDkyNXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ams-2",
        "title": "Traditional Brown Cafe",
        "description": "Cozy, wood-paneled historic pubs serving local beer and bitterballen.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1730143959843-abb319806d51?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW1zdGVyZGFtJTIwYnJvd24lMjBjYWZlfGVufDB8MHx8fDE3ODkyNDA5MjZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ams-3",
        "title": "Cheese Tasting",
        "description": "Sample aged Gouda and Edam in specialized cheese boutiques.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1603228856558-007ffcdc5387?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z291ZGElMjBjaGVlc2UlMjBuZXRoZXJsYW5kc3xlbnwwfDB8fHwxNzg5MjQwOTI3fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-ams-1",
        "title": "Leidseplein & Rembrandtplein",
        "description": "Vibrant squares packed with clubs, live music venues, and energy.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1672328650748-73b668690163?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bGVpZHNlcGxlaW4lMjBuaWdodHxlbnwwfDB8fHwxNzg5MjQwOTI4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-ams-2",
        "title": "Canal Cruises at Night",
        "description": "See the illuminated bridges from the quiet waters of the canals.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1661878122586-2d75a86f3400?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW1zdGVyZGFtJTIwY2FuYWwlMjBuaWdodHxlbnwwfDB8fHwxNzg5MjQwOTI4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1661887237533-b38811c27add?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW1zdGVyZGFtJTIwY2FuYWwlMjBob3VzZXN8ZW58MHwwfHx8MTc4OTI0MDkxNnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1664303000625-9da917c7fcfe?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW1zdGVyZGFtJTIwYmljeWNsZXN8ZW58MHwwfHx8MTc4OTI0MDkxN3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1658506813192-074af2c51d66?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmlqa3NtdXNldW18ZW58MHwwfHx8MTc4OTI0MDkxOHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1661878122586-2d75a86f3400?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YW1zdGVyZGFtJTIwdHdpbGlnaHR8ZW58MHwwfHx8MTc4OTI0MDkxOXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/amsterdam.png"
  },
  {
    "id": "paris",
    "name": "Paris",
    "country": "France",
    "tagLine": "The City of Light",
    "description": "An unparalleled tapestry of art, fashion, gastronomy, and culture, defined by its wide boulevards, iconic monuments, and romantic cafe culture.",
    "category": "Metropolitan",
    "mood": "Romantic & Classic",
    "bestTime": "April - June & September - October",
    "language": "French",
    "currency": "EUR (€)",
    "timezone": "GMT+1",
    "coordinates": [
      48.8566,
      2.3522
    ],
    "weather": {
      "temp": 18,
      "condition": "Soft Sunlight",
      "humidity": 65,
      "wind": "10 km/h"
    },
    "places": [
      {
        "id": "pl-par-1",
        "title": "Montmartre & Sacré-Cœur",
        "description": "The historic artistic village offering sweeping views over the city.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1718285552026-ec913034e39e?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9udG1hcnRyZSUyMHBhcmlzfGVufDB8MHx8fDE3ODkyNDA5MzJ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-par-2",
        "title": "Le Marais",
        "description": "Elegant architecture housing chic boutiques and art galleries.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1672252617591-cfef963eeefa?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bGUlMjBtYXJhaXMlMjBwYXJpc3xlbnwwfDB8fHwxNzg5MjQwOTMzfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-par-3",
        "title": "Notre-Dame Cathedral",
        "description": "The iconic gothic masterpiece on the Île de la Cité.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1694475317036-8af553aaf2fc?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bm90cmUlMjBkYW1lJTIwcGFyaXN8ZW58MHwwfHx8MTc4OTI0MDkzNHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-par-4",
        "title": "Arc de Triomphe",
        "description": "The monumental arch standing at the top of the Champs-Élysées.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661956135713-f93a5a95904d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXJjJTIwZGUlMjB0cmlvbXBoZXxlbnwwfDB8fHwxNzg5MjQwOTM0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-par-5",
        "title": "Seine River",
        "description": "The historic waterway intersecting the most romantic city in the world.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2VpbmUlMjByaXZlciUyMHBhcmlzfGVufDB8MHx8fDE3ODkyNDEzMjd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-par-1",
        "title": "Eiffel Tower at Dusk",
        "description": "Witness the iconic iron lady sparkling against the evening sky.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1661963064037-cfcf2e10db2d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZWlmZmVsJTIwdG93ZXIlMjBuaWdodHxlbnwwfDB8fHwxNzg5MjQwOTM1fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-par-2",
        "title": "Louvre Art Collection",
        "description": "Explore the world's greatest art collection.",
        "duration": "Half day",
        "image": "https://plus.unsplash.com/premium_photo-1694475632941-05ff7486f8c7?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bG91dnJlJTIwcHlyYW1pZHxlbnwwfDB8fHwxNzg5MjQwOTM2fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-par-3",
        "title": "Palace of Versailles Trip",
        "description": "Wander through the opulent halls and manicured gardens of royalty.",
        "duration": "Full day",
        "image": "https://plus.unsplash.com/premium_photo-1678580393136-e07bdb70e76d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVyc2FpbGxlcyUyMHBhbGFjZXxlbnwwfDB8fHwxNzg5MjQwOTM3fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-par-1",
        "title": "Cafés & Gastronomy",
        "description": "Indulge in flawless pastries and traditional brasserie dining.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1775211725874-0c485936f006?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFyaXMlMjBjYWZlJTIwcGFzdHJ5fGVufDB8MHx8fDE3ODkyNDA5Mzh8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-par-2",
        "title": "Classic French Boulangerie",
        "description": "Fresh, buttery croissants and crisp baguettes every morning.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1775919265092-0f009257a562?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZnJlbmNoJTIwYm91bGFuZ2VyaWV8ZW58MHwwfHx8MTc4OTI0MDkzOXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-par-3",
        "title": "Haute Cuisine",
        "description": "Michelin-starred culinary experiences pairing exquisite food with fine wine.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1755706181286-ed48035777bb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZnJlbmNoJTIwZmluZSUyMGRpbmluZ3xlbnwwfDB8fHwxNzg5MjQwOTM5fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-par-1",
        "title": "Moulin Rouge & Cabaret",
        "description": "The spectacular, historic birthplace of the modern can-can dance.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1727555477345-ef9b8b964219?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW91bGluJTIwcm91Z2UlMjBwYXJpc3xlbnwwfDB8fHwxNzg5MjQwOTQwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-par-2",
        "title": "Latin Quarter Bars",
        "description": "Lively student-filled streets with intimate jazz clubs and wine bars.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1694475370053-e90ef86676ab?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bGF0aW4lMjBxdWFydGVyJTIwcGFyaXMlMjBuaWdodHxlbnwwfDB8fHwxNzg5MjQwOTQxfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-par-3",
        "title": "Seine Dinner Cruise",
        "description": "Elegant dining while floating past illuminated Parisian monuments.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2VpbmUlMjByaXZlciUyMGNydWlzZSUyMG5pZ2h0fGVufDB8MHx8fDE3ODkyNDA5NDJ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZWlmZmVsJTIwdG93ZXIlMjBwYXJpc3xlbnwwfDB8fHwxNzg5MjQwOTI5fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1706548911842-7162d4bd2c98?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bG91dnJlJTIwbXVzZXVtfGVufDB8MHx8fDE3ODkyNDA5MzB8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1694475604993-8b82a7d33d38?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bW9udG1hcnRyZXxlbnwwfDB8fHwxNzg5MjQwOTMwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFyaXMlMjBjYWZlfGVufDB8MHx8fDE3ODkyNDA5MzF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/paris.png"
  },
  {
    "id": "venice",
    "name": "Venice",
    "country": "Italy",
    "tagLine": "A Floating Masterpiece",
    "description": "An impossibly romantic archipelago of marble palazzos and intricate bridges rising directly from the emerald waters of the Adriatic lagoon.",
    "category": "Historic City",
    "mood": "Timeless & Elegant",
    "bestTime": "April - May & September - October",
    "language": "Italian",
    "currency": "EUR (€)",
    "timezone": "GMT+1",
    "coordinates": [
      45.4408,
      12.3155
    ],
    "weather": {
      "temp": 21,
      "condition": "Sunlit Haze",
      "humidity": 70,
      "wind": "6 km/h"
    },
    "places": [
      {
        "id": "pl-ven-1",
        "title": "Rialto Bridge",
        "description": "The bustling historic market and the iconic bridge spanning the Grand Canal.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1690494028558-a6f535911993?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmlhbHRvJTIwYnJpZGdlJTIwdmVuaWNlfGVufDB8MHx8fDE3ODkyNDA5NDZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ven-2",
        "title": "Dorsoduro",
        "description": "A quiet, art-filled sestiere offering an authentic glimpse of local life.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661963047742-dabc5a735357?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZG9yc29kdXJvJTIwdmVuaWNlfGVufDB8MHx8fDE3ODkyNDA5NDd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ven-3",
        "title": "Murano & Burano Islands",
        "description": "Famous for glassblowing and brightly colored fishermen's houses.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1677646868448-26fa1a8000d1?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnVyYW5vJTIwaXNsYW5kfGVufDB8MHx8fDE3ODkyNDA5NDh8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ven-4",
        "title": "Doge's Palace",
        "description": "The Gothic masterpiece that served as the seat of Venetian power.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1676387859536-d61cdb8e5fc3?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZG9nZXMlMjBwYWxhY2UlMjB2ZW5pY2V8ZW58MHwwfHx8MTc4OTI0MDk0OXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-ven-1",
        "title": "Grand Canal Gondolas",
        "description": "Glide past Renaissance palazzos at sunset in a traditional gondola.",
        "duration": "1 hour",
        "image": "https://plus.unsplash.com/premium_photo-1690494028558-a6f535911993?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwZ29uZG9sYSUyMHN1bnNldHxlbnwwfDB8fHwxNzg5MjQwOTUwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-ven-2",
        "title": "St. Mark's Square",
        "description": "Stand in the magnificent heart of Venice flanked by Byzantine mosaics.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1661963360063-693f7a3634c8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3QlMjBtYXJrcyUyMHNxdWFyZXxlbnwwfDB8fHwxNzg5MjQwOTUwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-ven-3",
        "title": "Venetian Mask Making",
        "description": "Learn the ancient art of crafting papier-mâché carnival masks.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1661508688805-21a8c3275801?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuZXRpYW4lMjBtYXNrfGVufDB8MHx8fDE3ODkyNDA5NTF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-ven-1",
        "title": "Cicchetti in Bacari",
        "description": "Venetian tapas paired with ombra (wine) in cozy local taverns.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1750701258968-7fd5d6e595cf?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2ljY2hldHRpJTIwdmVuaWNlfGVufDB8MHx8fDE3ODkyNDA5NTJ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ven-2",
        "title": "Seafood Pasta",
        "description": "Fresh Adriatic seafood tossed with squid ink spaghetti or linguine.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1707227198866-0730e96f2733?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3F1aWQlMjBpbmslMjBwYXN0YXxlbnwwfDB8fHwxNzg5MjQwOTUzfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ven-3",
        "title": "Traditional Gelato",
        "description": "Artisanal Italian ice cream enjoyed while wandering the canals.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1683147864503-e96f9b30db56?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aXRhbGlhbiUyMGdlbGF0b3xlbnwwfDB8fHwxNzg5MjQwOTU0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-ven-1",
        "title": "Classical Concerts",
        "description": "Vivaldi performances in historic, acoustically brilliant churches.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1677048147267-49e5b21c6cdc?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwY2xhc3NpY2FsJTIwY29uY2VydHxlbnwwfDB8fHwxNzg5MjQwOTU1fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-ven-2",
        "title": "Sunset Aperitivo",
        "description": "Sipping Aperol Spritz on a terrace overlooking the lagoon.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1562159108-44d84ca982e3?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YXBlcm9sJTIwc3ByaXR6JTIwdmVuaWNlfGVufDB8MHx8fDE3ODkyNDA5NTV8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-ven-3",
        "title": "Quiet Canal Walks",
        "description": "The magic of Venice after the day-trippers leave and the fog rolls in.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1496885433813-75005a2a4125?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwbmlnaHQlMjBmb2d8ZW58MHwwfHx8MTc4OTI0MDk1Nnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1661963047742-dabc5a735357?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwZ3JhbmQlMjBjYW5hbHxlbnwwfDB8fHwxNzg5MjQwOTQzfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1676608101467-aaeb16efd8f4?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3QlMjBtYXJrcyUyMHNxdWFyZSUyMHZlbmljZXxlbnwwfDB8fHwxNzg5MjQwOTQ0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1661963047742-dabc5a735357?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwZ29uZG9sYXxlbnwwfDB8fHwxNzg5MjQwOTQ1fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1690494028558-a6f535911993?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dmVuaWNlJTIwYXJjaGl0ZWN0dXJlfGVufDB8MHx8fDE3ODkyNDA5NDV8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/venice.png"
  },
  {
    "id": "santorini",
    "name": "Santorini",
    "country": "Greece",
    "tagLine": "Whitewashed Beauty on a Volcanic Caldera",
    "description": "A mesmerizing crescent of dramatic cliffs draped in stark white architecture and blue domes, suspended between the azure sky and the Aegean Sea.",
    "category": "Coastal Island",
    "mood": "Breathtaking & Serene",
    "bestTime": "May - October",
    "language": "Greek",
    "currency": "EUR (€)",
    "timezone": "GMT+2",
    "coordinates": [
      36.3932,
      25.4615
    ],
    "weather": {
      "temp": 26,
      "condition": "Radiant Sun",
      "humidity": 55,
      "wind": "15 km/h"
    },
    "places": [
      {
        "id": "pl-san-1",
        "title": "Fira & Greek Architecture",
        "description": "The bustling cliffside capital offering stunning views and vibrant alleys.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1714679969562-d32b710ad7c3?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZmlyYSUyMHNhbnRvcmluaXxlbnwwfDB8fHwxNzg5MjQwOTYwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-san-2",
        "title": "Imerovigli",
        "description": "The serene \"balcony to the Aegean\", famous for its dramatic positioning.",
        "duration": "Explore",
        "image": "https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aW1lcm92aWdsaXxlbnwwfDB8fHwxNzg5MjQwOTYxfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-san-3",
        "title": "Akrotiri Archaeological Site",
        "description": "The fascinating ruins of a Minoan Bronze Age settlement preserved in ash.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwb2lhJTIwc3Vuc2V0fGVufDB8MHx8fDE3ODkyNDA5NTd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-san-4",
        "title": "Red Beach",
        "description": "A surreal landscape of soaring red volcanic cliffs meeting blue waters.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1724088550763-2d99b31c2257?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cmVkJTIwYmVhY2glMjBzYW50b3Jpbml8ZW58MHwwfHx8MTc4OTI0MDk2Mnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-san-5",
        "title": "Oia",
        "description": "The iconic whitewashed village clinging to the northern cliffside.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8b2lhJTIwdmlsbGFnZXxlbnwwfDB8fHwxNzg5MjQxMzM4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-san-1",
        "title": "Oia Sunset & Volcanic Landscape",
        "description": "Watch the world's most famous sunset paint the white cliffs in hues of gold and rose.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8b2lhJTIwc3Vuc2V0fGVufDB8MHx8fDE3ODkyNDA5NjN8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-san-2",
        "title": "Caldera Sailing",
        "description": "Cruise the ancient volcanic crater in a luxury catamaran.",
        "duration": "Half day",
        "image": "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2F0YW1hcmFuJTIwc2FudG9yaW5pfGVufDB8MHx8fDE3ODkyNDA5NjR8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-san-3",
        "title": "Wine Tasting Tour",
        "description": "Sample unique Assyrtiko wines grown in volcanic ash vineyards.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1694475389691-dfb656cf0711?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwdmluZXlhcmR8ZW58MHwwfHx8MTc4OTI0MDk2NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-san-1",
        "title": "Fresh Aegean Seafood",
        "description": "Grilled octopus and fresh fish served steps from the sea.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1717345994192-f5bc10b61c09?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z3JlZWslMjBzZWFmb29kfGVufDB8MHx8fDE3ODkyNDA5NjV8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-san-2",
        "title": "Traditional Greek Taverna",
        "description": "Moussaka, souvlaki, and horiatiki salad in a family-run eatery.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1679993883806-e3922045e5d2?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z3JlZWslMjB0YXZlcm5hfGVufDB8MHx8fDE3ODkyNDA5NjZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-san-3",
        "title": "Fava & Tomatokeftedes",
        "description": "Local Santorini specialties including yellow split pea purée and tomato fritters.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1661963643348-e95c6387ee8a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9tYXRva2VmdGVkZXMlMjBzYW50b3Jpbml8ZW58MHwwfHx8MTc4OTI0MDk2N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-san-1",
        "title": "Fira Cliffside Bars",
        "description": "Cocktails with panoramic nighttime views over the caldera.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1714679969518-a05e1b8451d8?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwbmlnaHRsaWZlJTIwZmlyYXxlbnwwfDB8fHwxNzg5MjQwOTY3fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-san-2",
        "title": "Beach Clubs in Perissa",
        "description": "Relaxed evening vibes on the striking black sand beaches.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwb2lhJTIwc3Vuc2V0fGVufDB8MHx8fDE3ODkyNDA5NTd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1661963145672-a2bd28eba0fb?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwb2lhJTIwc3Vuc2V0fGVufDB8MHx8fDE3ODkyNDA5NTd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1697730112614-f798011ebe42?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwYmx1ZSUyMGRvbWV8ZW58MHwwfHx8MTc4OTI0MDk1OHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1669048774079-028cbec6f15d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwY2FsZGVyYXxlbnwwfDB8fHwxNzg5MjQwOTU4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1669048774079-028cbec6f15d?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c2FudG9yaW5pJTIwY2xpZmZ8ZW58MHwwfHx8MTc4OTI0MDk1OXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/santorini.png"
  },
  {
    "id": "istanbul",
    "name": "Istanbul",
    "country": "Türkiye",
    "tagLine": "Where Two Continents Collide",
    "description": "A mesmerizing transcontinental metropolis where ancient minarets pierce the skyline and the Bosphorus winds between Europe and Asia.",
    "category": "Cultural Heritage",
    "mood": "Majestic & Vibrant",
    "bestTime": "April - May & September - October",
    "language": "Turkish",
    "currency": "TRY (₺)",
    "timezone": "GMT+3",
    "coordinates": [
      41.0082,
      28.9784
    ],
    "weather": {
      "temp": 20,
      "condition": "Clear Sky",
      "humidity": 65,
      "wind": "14 km/h"
    },
    "places": [
      {
        "id": "pl-ist-1",
        "title": "Grand Bazaar",
        "description": "Get lost in one of the world's oldest and largest covered markets.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661964045454-67814c3e7d01?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z3JhbmQlMjBiYXphYXIlMjBpc3RhbmJ1bHxlbnwwfDB8fHwxNzg5MjQwOTcyfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ist-2",
        "title": "Galata Tower",
        "description": "The medieval stone tower offering sweeping views of the Golden Horn.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1661964045454-67814c3e7d01?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z2FsYXRhJTIwdG93ZXJ8ZW58MHwwfHx8MTc4OTI0MDk3M3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ist-3",
        "title": "Topkapi Palace",
        "description": "The opulent pavilions and courtyards of the Ottoman sultans.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1678580415107-85c783c39cc4?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dG9wa2FwaSUyMHBhbGFjZXxlbnwwfDB8fHwxNzg5MjQwOTczfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-ist-4",
        "title": "Basilica Cistern",
        "description": "An atmospheric, ancient subterranean water reservoir supported by marble columns.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1697729579479-e8a3be6ccf98?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFzaWxpY2ElMjBjaXN0ZXJufGVufDB8MHx8fDE3ODkyNDA5NzR8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-ist-1",
        "title": "Hagia Sophia & Blue Mosque",
        "description": "Marvel at the monumental domes and intricate mosaics of these architectural wonders.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1661962550248-59cf249e078b?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Ymx1ZSUyMG1vc3F1ZSUyMGlzdGFuYnVsfGVufDB8MHx8fDE3ODkyNDA5NzV8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-ist-2",
        "title": "Bosphorus Cruise",
        "description": "Sail the strait dividing continents, flanked by Ottoman palaces and fortresses.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1664299412781-dc0394417bed?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Ym9zcGhvcnVzJTIwY3J1aXNlfGVufDB8MHx8fDE3ODkyNDA5NzZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-ist-3",
        "title": "Whirling Dervishes Show",
        "description": "Experience the mesmerizing spiritual dance of the Sufi order.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1671886872138-62b068f35173?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8d2hpcmxpbmclMjBkZXJ2aXNoZXN8ZW58MHwwfHx8MTc4OTI0MDk3N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-ist-1",
        "title": "Authentic Kebabs",
        "description": "Perfectly spiced and grilled meats served with fresh flatbread and meze.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1674106347866-8282d8c19f84?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHVya2lzaCUyMGtlYmFifGVufDB8MHx8fDE3ODkyNDA5Nzd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ist-2",
        "title": "Turkish Delight & Baklava",
        "description": "Pistachio-filled pastries dripping with syrup and powdered sweets.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1676232732001-34d904cd7544?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHVya2lzaCUyMGJha2xhdmF8ZW58MHwwfHx8MTc4OTI0MDk3OHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ist-3",
        "title": "Balik Ekmek (Fish Sandwich)",
        "description": "Freshly grilled fish sandwiches served straight from boats at Eminonu.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1661955588369-b0d28de38b45?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YmFsaWslMjBla21layUyMGlzdGFuYnVsfGVufDB8MHx8fDE3ODkyNDA5Nzl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-ist-4",
        "title": "Turkish Coffee",
        "description": "Strong, unfiltered coffee enjoyed slowly in historic cafes.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1732818135469-3bfc10ed83a2?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dHVya2lzaCUyMGNvZmZlZXxlbnwwfDB8fHwxNzg5MjQwOTgwfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-ist-1",
        "title": "Kadikoy Bars",
        "description": "The vibrant, youthful pub scene on the Asian side of the city.",
        "duration": "Evening",
        "image": "https://images.unsplash.com/photo-1613227317255-cae67f50003c?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8a2FkaWtveSUyMG5pZ2h0fGVufDB8MHx8fDE3ODkyNDA5ODF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-ist-2",
        "title": "Beyoglu Rooftops",
        "description": "Chic rooftop bars offering panoramic views across the Bosphorus.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1661955588369-b0d28de38b45?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aGFnaWElMjBzb3BoaWElMjBpc3RhbmJ1bHxlbnwwfDB8fHwxNzg5MjQwOTY5fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-ist-3",
        "title": "Meyhane Experience",
        "description": "Traditional Turkish tavern nights with raki, meze, and live music.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1661955588369-b0d28de38b45?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aGFnaWElMjBzb3BoaWElMjBpc3RhbmJ1bHxlbnwwfDB8fHwxNzg5MjQwOTY5fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1661955588369-b0d28de38b45?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aGFnaWElMjBzb3BoaWElMjBpc3RhbmJ1bHxlbnwwfDB8fHwxNzg5MjQwOTY5fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1681079526873-18c482d2bb3a?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Ym9zcGhvcnVzJTIwYnJpZGdlfGVufDB8MHx8fDE3ODkyNDA5NzB8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1677534712570-5c6f50ea3703?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Z3JhbmQlMjBiYXphYXJ8ZW58MHwwfHx8MTc4OTI0MDk3MXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1667099522743-6b233d408465?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aXN0YW5idWwlMjBjYXRzfGVufDB8MHx8fDE3ODkyNDA5NzF8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/istanbul.png"
  },
  {
    "id": "newyork",
    "name": "New York",
    "country": "USA",
    "tagLine": "The Concrete Jungle Where Dreams Are Made",
    "description": "An unstoppable epicenter of global culture, finance, and art, defined by its towering skyline and dynamic, neighborhood-driven soul.",
    "category": "Metropolitan",
    "mood": "Energetic & Iconic",
    "bestTime": "April - June & September - November",
    "language": "English",
    "currency": "USD ($)",
    "timezone": "GMT-4",
    "coordinates": [
      40.7128,
      -74.006
    ],
    "weather": {
      "temp": 19,
      "condition": "Breezy",
      "humidity": 55,
      "wind": "18 km/h"
    },
    "places": [
      {
        "id": "pl-nyc-1",
        "title": "Times Square",
        "description": "The blindingly bright, beating commercial heart of Manhattan.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1694475099474-41c6b0ec7aa2?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dGltZXMlMjBzcXVhcmUlMjBuZXclMjB5b3JrfGVufDB8MHx8fDE3ODkyNDA5ODZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-nyc-2",
        "title": "SoHo & Williamsburg",
        "description": "Explore cast-iron architecture, high-end boutiques, and Brooklyn's trendiest enclaves.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1714051660720-888e8454a021?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c29obyUyMG5ldyUyMHlvcmt8ZW58MHwwfHx8MTc4OTI0MDk4N3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-nyc-3",
        "title": "Empire State Building",
        "description": "The iconic Art Deco skyscraper offering views over the five boroughs.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1663956111757-534bcb550932?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8ZW1waXJlJTIwc3RhdGUlMjBidWlsZGluZ3xlbnwwfDB8fHwxNzg5MjQwOTg4fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-nyc-4",
        "title": "High Line",
        "description": "An elevated park built on a historic freight rail line winding through Chelsea.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1694475411899-ebbce0efaf75?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8aGlnaCUyMGxpbmUlMjBuZXclMjB5b3JrfGVufDB8MHx8fDE3ODkyNDA5ODl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "pl-nyc-5",
        "title": "Central Park",
        "description": "The vast, landscaped heart of Manhattan.",
        "duration": "Explore",
        "image": "https://plus.unsplash.com/premium_photo-1697730064923-dd664fc81d19?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2VudHJhbCUyMHBhcmslMjBhZXJpYWx8ZW58MHwwfHx8MTc4OTI0MDk5MHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "experiences": [
      {
        "id": "exp-nyc-1",
        "title": "Manhattan Skyline & Brooklyn Bridge",
        "description": "Walk the Brooklyn Bridge at sunset to see the iconic Manhattan skyline illuminate.",
        "duration": "2 hours",
        "image": "https://plus.unsplash.com/premium_photo-1697730204345-bba280d52637?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJvb2tseW4lMjBicmlkZ2UlMjBzdW5zZXR8ZW58MHwwfHx8MTc4OTI0MDk4OXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-nyc-2",
        "title": "Broadway Show",
        "description": "World-class theatrical performances in the historic theater district.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1749200412744-df6cf06f0496?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJvYWR3YXklMjBtYXJxdWVlJTIwbmV3JTIweW9ya3xlbnwwfDB8fHwxNzg5MjQwOTkxfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "exp-nyc-3",
        "title": "Museum of Modern Art",
        "description": "Explore one of the world's most influential modern art collections.",
        "duration": "3 hours",
        "image": "https://plus.unsplash.com/premium_photo-1706541692268-043f6590be29?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bXVzZXVtJTIwb2YlMjBtb2Rlcm4lMjBhcnQlMjBuZXclMjB5b3JrfGVufDB8MHx8fDE3ODkyNDEzNDl8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "food": [
      {
        "id": "fd-nyc-1",
        "title": "New York Pizza",
        "description": "Classic large, foldable slices from neighborhood pizzerias.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1765918653592-15386ec933f1?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmV3JTIweW9yayUyMHBpenphJTIwc2xpY2V8ZW58MHwwfHx8MTc4OTI0MDk5Mnww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-nyc-2",
        "title": "Classic Deli Pastrami",
        "description": "Mile-high sandwiches in historic Jewish delicatessens.",
        "duration": "Taste",
        "image": "https://plus.unsplash.com/premium_photo-1739389293711-626ff36acde4?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8cGFzdHJhbWklMjBzYW5kd2ljaHxlbnwwfDB8fHwxNzg5MjQwOTkzfDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "fd-nyc-3",
        "title": "Fine Dining in Manhattan",
        "description": "Innovative, globally-inspired tasting menus from renowned chefs.",
        "duration": "Taste",
        "image": "https://images.unsplash.com/photo-1620997695392-acb6be25d3c4?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bWFuaGF0dGFuJTIwZmluZSUyMGRpbmluZ3xlbnwwfDB8fHwxNzg5MjQwOTk0fDA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "nightlife": [
      {
        "id": "nl-nyc-1",
        "title": "Street Atmosphere & Nightlife",
        "description": "Experience the city that never sleeps, from rooftop cocktails to vibrant street life.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1667482654587-e7091bb42e0c?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmV3JTIweW9yayUyMHN0cmVldCUyMG5pZ2h0fGVufDB8MHx8fDE3ODkyNDA5OTV8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-nyc-2",
        "title": "Speakeasy Bars",
        "description": "Hidden cocktail lounges evoking the Prohibition era.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1670270203164-aa65468a9c67?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8c3BlYWtlYXN5JTIwYmFyfGVufDB8MHx8fDE3ODkyNDA5OTZ8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "nl-nyc-3",
        "title": "West Village Jazz",
        "description": "Intimate basement clubs hosting the world's best jazz musicians.",
        "duration": "Evening",
        "image": "https://plus.unsplash.com/premium_photo-1749200412744-df6cf06f0496?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8amF6eiUyMGNsdWIlMjBuZXclMjB5b3JrfGVufDB8MHx8fDE3ODkyNDA5OTd8MA&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
      }
    ],
    "heroImage": "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8bmV3JTIweW9yayUyMGNpdHklMjBza3lsaW5lJTIwbmlnaHR8ZW58MHwwfHx8MTc4OTI0MDk4M3ww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1694475099474-41c6b0ec7aa2?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8dGltZXMlMjBzcXVhcmV8ZW58MHwwfHx8MTc4OTI0MDk4NHww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1697730064923-dd664fc81d19?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8Y2VudHJhbCUyMHBhcmt8ZW58MHwwfHx8MTc4OTI0MDk4NXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80",
      "https://plus.unsplash.com/premium_photo-1694475392038-7c2a5706786e?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MXx8YnJvb2tseW4lMjBicmlkZ2V8ZW58MHwwfHx8MTc4OTI0MDk4NXww&ixlib=rb-4.1.0&auto=format&fit=crop&w=800&q=80"
    ],
    "recommendedStayIds": [],
    "mastheadImage": "/assets/destinations/mastheads/new-york.png"
  },
  {
    "id": "bali",
    "name": "Bali",
    "country": "Indonesia",
    "tagLine": "Island of the Gods",
    "description": "A lush tropical paradise defined by ancient temples, terraced rice paddies, and a deeply spiritual culture.",
    "category": "Coastal Island",
    "mood": "Tropical & Serene",
    "bestTime": "April - October",
    "language": "Indonesian / Balinese",
    "currency": "IDR (Rp)",
    "timezone": "GMT+8",
    "coordinates": [
      -8.4095,
      115.1889
    ],
    "weather": {
      "temp": 27,
      "condition": "Warm Breeze",
      "humidity": 75,
      "wind": "10 km/h"
    },
    "heroImage": "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?auto=format&fit=crop&w=800&q=80",
    "mastheadImage": "/assets/destinations/mastheads/bali.png",
    "gallery": [
      "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?auto=format&fit=crop&w=800&q=80"
    ],
    "places": [],
    "experiences": [],
    "food": [],
    "nightlife": [],
    "recommendedStayIds": []
  }
];

export const mockFlights: Flight[] = [];
export const mockStays: Stay[] = [];
export const mockInitialTrip: Trip = {
  id: 'trip-japan-autumn-2026',
  title: 'Autumn Journey to Japan: Tokyo & Kyoto',
  destinationName: 'Tokyo & Kyoto, Japan',
  startDate: '2026-10-12',
  endDate: '2026-10-22',
  days: []
};
export const mockUser: User = {
  id: 'usr-travora-001',
  name: 'Zayd Al-Mansoor',
  email: 'zayd.mansoor@travora.luxury',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  savedDestinationsCount: 4,
  savedStaysCount: 3,
};

export const mockInitialFavorites: FavoritesState = {
  destinations: ['tokyo', 'kyoto', 'santorini', 'bali'],
  stays: ['stay-aman-kyoto'],
};

export const mockJourneySearch: JourneySearch = {
  origin: 'New York (JFK)',
  destination: 'Tokyo (NRT)',
  date: '2026-10-12',
  travelers: 2,
};
