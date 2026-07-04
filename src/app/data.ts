export interface Property {
  id: string;
  title: string;
  location: string;
  price: number; // Base price for 100 Gaj
  type: 'Plot' | 'Premium Plot' | 'Forest Plot' | 'Highway Plot';
  image: string;
  size: string; // Plot Size range (e.g. 100 - 300 Gaj)
  rate: number; // Price per Gaj (₹)
  roadWidth: string; // Internal road width (e.g. 25 Ft cemented)
  description: string;
  amenities: string[];
  mutationStatus: string; // Registry & Mutation Status
  featured: boolean;
  status: 'Completed' | 'Ongoing'; // Status field for ongoing projects
}

export interface Collection {
  id: string;
  title: string;
  image: string;
  description: string;
  count: number;
  tag: string;
}

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Lachiwalla Greens',
    location: 'Doiwala, Dehradun',
    price: 1900000,
    type: 'Premium Plot',
    image: '/images/cliffside_mansion.png',
    size: '100 - 300 Gaj',
    rate: 19000,
    roadWidth: '25 Ft Cemented',
    description: 'Lachiwalla Greens is a premium completed gated colony project situated near the Lachhiwala Forest Reserve. It features 25 ft internal cemented roads, electricity connections, running water supply, and immediate registry/mutation readiness. Located just 12 minutes from Jolly Grant International Airport and near the New Mussoorie-Dehradun Bypass.',
    amenities: ['Gated Entry', '24/7 Security', 'Electricity Poles', 'Water Supply', 'Cemented Roads', 'Registry Ready'],
    mutationStatus: 'Registry & Mutation Ready',
    featured: true,
    status: 'Completed'
  },
  {
    id: 'prop-2',
    title: 'Bhauwala Greens',
    location: 'Bhauwala Chowk, Dehradun',
    price: 1600000,
    type: 'Plot',
    image: '/images/azure_villa.png',
    size: '100+ Gaj',
    rate: 16000,
    roadWidth: '25 - 30 Ft RCC',
    description: 'Secure gated community featuring freehold residential plots near Bhauwala Chowk. Surrounded by scenic views of Shivalik and Bhadraj hills. Fully demarcated plots with 25-30 ft wide internal RCC roads, underground drainage, and operational electricity meters. Close proximity to DIMS, UPES, and Dolphin College.',
    amenities: ['Gated Community', 'RCC Roads', 'Drainage System', 'Electricity Meters', 'Water Supply', 'Hill Views'],
    mutationStatus: 'Registry & Mutation Ready',
    featured: true,
    status: 'Completed'
  },
  {
    id: 'prop-3',
    title: 'Bhadraj Colony',
    location: 'Bhauwala, Dehradun',
    price: 1750000,
    type: 'Forest Plot',
    image: '/images/mountain_retreat.png',
    size: '100 - 300 Gaj',
    rate: 17500,
    roadWidth: '25 Ft Internal',
    description: 'A completed gated colony project offering 360-degree scenic mountain, forest, and riverside views near the Bhadraj Hills. Offers competitive pre-launch rates, wide internal roads, immediate registry/mutation, and excellent connectivity to Premnagar, Selaqui, and Dehradun Railway Station.',
    amenities: ['Gated Access', '25ft Internal Roads', 'Clear Legal Titles', 'Water & Electricity', 'Mountain Views', 'Riverside Proximity'],
    mutationStatus: 'Registry & Mutation Ready',
    featured: true,
    status: 'Completed'
  },
  {
    id: 'prop-4',
    title: 'Dev Enclave',
    location: 'Ramgarh, Shimla Bypass, Dehradun',
    price: 1700000,
    type: 'Highway Plot',
    image: '/images/urban_penthouse.png',
    size: '100+ Gaj',
    rate: 17000,
    roadWidth: '25 - 30 Ft RCC',
    description: 'Dev Enclave is a fully completed 18 Bigha gated colony located near G.D. Goenka School on Shimla Bypass Road in Ramgarh. Equipped with wide RCC roads, running water connection in all lanes, underground drainage, and electricity poles. Perfect freehold ownership with bank loan support up to 90%.',
    amenities: ['Gated Entrance', 'RCC Roads', 'Electricity Poles', 'Water Connections', 'Underground Drainage', '90% Loan Support'],
    mutationStatus: 'Registry & Mutation Ready',
    featured: true,
    status: 'Completed'
  },
  {
    id: 'prop-5',
    title: 'Forest Enclave',
    location: 'Dhoomnagar, Bhauwala, Dehradun',
    price: 1550000,
    type: 'Forest Plot',
    image: '/images/hero_villa.png',
    size: '120 - 350 Gaj',
    rate: 15500,
    roadWidth: '25 - 30 Ft RCC',
    description: 'A peaceful, forest-facing gated community located in Dhoomnagar, Bhauwala. Offers panoramic views of the Shivalik range and Bhadraj hills. Complete with modern RCC internal roads, electricity poles, and water connections. Up to 90% bank loan available.',
    amenities: ['Gated Entry', 'RCC Roads', 'Electricity Lines', 'Water Grid', 'Forest Facing', '90% Bank Loan'],
    mutationStatus: 'Registry & Mutation Ready',
    featured: false,
    status: 'Completed'
  },
  {
    id: 'prop-6',
    title: 'Shree Ram Enclave',
    location: 'Funtowala, Chandarbani near ISBT, Dehradun',
    price: 2800000,
    type: 'Premium Plot',
    image: '/images/azure_villa.png',
    size: '100+ Gaj',
    rate: 28000,
    roadWidth: '20 - 25 Ft RCC',
    description: 'An elite ongoing gated community project located in the prime Chandrabani / Funtowala pocket, Dehradun. Positioned just 4 km from ISBT Dehradun and 2.5 km from the upcoming Delhi-Dehradun Expressway. Features secure boundary walls, 20-25 ft internal roads, electricity and water connections.',
    amenities: ['Gated Security', 'RCC Roads', 'Drainage Grid', 'Water Connection', 'Prime Location', '90% Loan Support'],
    mutationStatus: 'Ongoing Development - Bookings Open',
    featured: true,
    status: 'Ongoing'
  },
  {
    id: 'prop-7',
    title: 'Laxmi Enclave',
    location: 'Ratanpur, Shimla Bypass, Dehradun',
    price: 2300000,
    type: 'Highway Plot',
    image: '/images/mountain_retreat.png',
    size: '100 - 250 Gaj',
    rate: 23000,
    roadWidth: '20 - 25 Ft RCC',
    description: 'Premium gated community located near Ratanpur on Shimla Bypass Highway, Dehradun. Offers 24/7 CCTV surveillance, boundary security, landscaped parks, and wide RCC internal roads. Completely registry-ready with clear legal documentation.',
    amenities: ['CCTV Surveillance', '24/7 Security', 'Landscaped Parks', 'Water Connection', 'RCC Internal Roads', 'Registry Ready'],
    mutationStatus: 'Registry & Mutation Ready',
    featured: false,
    status: 'Completed'
  },
  {
    id: 'prop-8',
    title: 'Balaji Enclave',
    location: 'Sabhawala, Shimla Bypass, Dehradun',
    price: 1600000,
    type: 'Highway Plot',
    image: '/images/cliffside_mansion.png',
    size: '100 - 300 Gaj',
    rate: 16000,
    roadWidth: '25 Ft RCC',
    description: 'Balaji Enclave sits just 100 meters off the main Shimla Bypass Road in Sabhawala. An ongoing secure gated colony development with full boundary walls, RCC internal roads, proper drainage systems, and eco-friendly surroundings with clean air. Very close to the upcoming Delhi-Dehradun Expressway.',
    amenities: ['Boundary Walls', 'RCC Roads', 'Drainage System', 'Water Supply', '100m from Highway', 'Low AQI Zone'],
    mutationStatus: 'Ongoing Development - Bookings Open',
    featured: true,
    status: 'Ongoing'
  },
  {
    id: 'prop-9',
    title: 'Paonta Highway Enclave',
    location: 'Sherpur Doon Chandigarh Expressway, Dehradun',
    price: 2500000,
    type: 'Highway Plot',
    image: '/images/urban_penthouse.png',
    size: '100 - 250 Gaj',
    rate: 25000,
    roadWidth: '25 - 30 Ft RCC',
    description: 'Paonta Highway Enclave is a premier ongoing gated colony development strategically located near Sherpur on the Doon Chandigarh Expressway. Offers wide RCC roads, modern electricity systems, immediate booking facilities, and high investment return potential.',
    amenities: ['Expressway Access', 'Boundary Security', 'CCTV System', 'Electricity Grid', 'Water Lines', 'Immediate Bookings'],
    mutationStatus: 'Ongoing Development - Bookings Open',
    featured: true,
    status: 'Ongoing'
  }
];

export const COLLECTIONS: Collection[] = [
  {
    id: 'col-1',
    title: 'Highway Portfolios',
    image: '/images/urban_penthouse.png',
    description: 'Excellent connectivity plots located directly along or off the main Shimla Bypass Road corridor.',
    count: 5,
    tag: 'Highway Plot'
  },
  {
    id: 'col-2',
    title: 'Hillview Enclaves',
    image: '/images/mountain_retreat.png',
    description: 'Scenic properties situated in Bhauwala, offering picturesque views of Shivalik and Bhadraj Hills.',
    count: 3,
    tag: 'Forest Plot'
  },
  {
    id: 'col-3',
    title: 'Premium Bypass Hubs',
    image: '/images/cliffside_mansion.png',
    description: 'High-end gated colonies close to Dehradun ISBT, Chandrabani, and Jolly Grant Airport.',
    count: 2,
    tag: 'Premium Plot'
  }
];
