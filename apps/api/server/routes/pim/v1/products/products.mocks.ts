export type Product = {
  id: string;
  code: string;
  name: string;
  description: string;
  category: string;
  price: {
    value: number;
    currency: string;
    formattedValue: string;
  };
  stock: {
    stockLevel: number;
    stockLevelStatus: "inStock" | "lowStock" | "outOfStock";
  };
  images: Array<{
    url: string;
    altText: string;
    format: string;
  }>;
  specifications: Record<string, string>;
  availability: {
    available: boolean;
    estimatedDelivery?: string;
  };
};

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    code: "TECH-SM-001",
    name: "Smart Sensor Pro",
    description:
      "Advanced IoT sensor with real-time monitoring capabilities. Perfect for industrial automation and building management systems.",
    category: "Sensors",
    price: {
      value: 149.99,
      currency: "USD",
      formattedValue: "$149.99",
    },
    stock: {
      stockLevel: 150,
      stockLevelStatus: "inStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        altText: "Smart Sensor Pro - Front View",
        format: "product",
      },
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
        altText: "Smart Sensor Pro - Side View",
        format: "thumbnail",
      },
    ],
    specifications: {
      "Operating Temperature": "-20°C to 80°C",
      "Power Supply": "24V DC",
      Communication: "Modbus, BACnet",
      Accuracy: "±0.5%",
      Dimensions: "120 x 80 x 45 mm",
    },
    availability: {
      available: true,
      estimatedDelivery: "2-3 business days",
    },
  },
  {
    id: "prod-002",
    code: "TECH-CT-002",
    name: "Climate Controller X1",
    description:
      "Intelligent climate control system for optimal environmental management. Features adaptive learning and energy optimization.",
    category: "Controllers",
    price: {
      value: 299.99,
      currency: "USD",
      formattedValue: "$299.99",
    },
    stock: {
      stockLevel: 75,
      stockLevelStatus: "inStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        altText: "Climate Controller X1",
        format: "product",
      },
    ],
    specifications: {
      "Control Zones": "Up to 8 zones",
      "Power Supply": "230V AC",
      Display: '7" touchscreen',
      Connectivity: "WiFi, Ethernet, Bluetooth",
      Dimensions: "200 x 150 x 60 mm",
    },
    availability: {
      available: true,
      estimatedDelivery: "3-5 business days",
    },
  },
  {
    id: "prod-003",
    code: "TECH-VL-003",
    name: "Precision Valve V200",
    description:
      "High-performance valve with precise flow control. Ideal for HVAC and industrial process applications.",
    category: "Valves",
    price: {
      value: 189.99,
      currency: "USD",
      formattedValue: "$189.99",
    },
    stock: {
      stockLevel: 25,
      stockLevelStatus: "lowStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
        altText: "Precision Valve V200",
        format: "product",
      },
    ],
    specifications: {
      "Flow Rate": "0-100 L/min",
      Material: "Stainless steel",
      "Pressure Rating": "Up to 16 bar",
      Connection: "DN50 flanged",
      "Operating Temperature": "-10°C to 120°C",
    },
    availability: {
      available: true,
      estimatedDelivery: "5-7 business days",
    },
  },
  {
    id: "prod-004",
    code: "TECH-AT-004",
    name: "Smart Actuator A500",
    description:
      "Programmable actuator with advanced positioning control. Features silent operation and energy-efficient design.",
    category: "Actuators",
    price: {
      value: 249.99,
      currency: "USD",
      formattedValue: "$249.99",
    },
    stock: {
      stockLevel: 100,
      stockLevelStatus: "inStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
        altText: "Smart Actuator A500",
        format: "product",
      },
    ],
    specifications: {
      "Torque Range": "5-20 Nm",
      "Power Supply": "24V DC",
      "Positioning Time": "30-150 seconds",
      Control: "Modulating 0-10V",
      Protection: "IP54",
    },
    availability: {
      available: true,
      estimatedDelivery: "2-3 business days",
    },
  },
  {
    id: "prod-005",
    code: "TECH-TH-005",
    name: "Digital Thermostat T100",
    description:
      "Modern thermostat with intuitive interface and smartphone integration. Smart scheduling and geo-fencing capabilities.",
    category: "Thermostats",
    price: {
      value: 129.99,
      currency: "USD",
      formattedValue: "$129.99",
    },
    stock: {
      stockLevel: 200,
      stockLevelStatus: "inStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800",
        altText: "Digital Thermostat T100",
        format: "product",
      },
    ],
    specifications: {
      "Display Type": "LCD backlit",
      "Temperature Range": "5°C to 35°C",
      Power: "Battery or 24V AC",
      Connectivity: "WiFi 2.4GHz",
      Compatibility: "iOS, Android apps",
    },
    availability: {
      available: true,
      estimatedDelivery: "1-2 business days",
    },
  },
  {
    id: "prod-006",
    code: "TECH-PR-006",
    name: "Pressure Sensor PS300",
    description:
      "Industrial-grade pressure sensor with high accuracy. Suitable for critical monitoring applications.",
    category: "Sensors",
    price: {
      value: 179.99,
      currency: "USD",
      formattedValue: "$179.99",
    },
    stock: {
      stockLevel: 50,
      stockLevelStatus: "inStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        altText: "Pressure Sensor PS300",
        format: "product",
      },
    ],
    specifications: {
      "Pressure Range": "0-10 bar",
      Output: "4-20 mA",
      Accuracy: "±0.25%",
      Material: "Stainless steel 316L",
      "Process Connection": 'G1/2"',
    },
    availability: {
      available: true,
      estimatedDelivery: "3-5 business days",
    },
  },
  {
    id: "prod-007",
    code: "TECH-GW-007",
    name: "IoT Gateway G100",
    description:
      "Enterprise-grade IoT gateway for seamless device integration. Supports multiple protocols and cloud platforms.",
    category: "Gateways",
    price: {
      value: 449.99,
      currency: "USD",
      formattedValue: "$449.99",
    },
    stock: {
      stockLevel: 30,
      stockLevelStatus: "inStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        altText: "IoT Gateway G100",
        format: "product",
      },
    ],
    specifications: {
      Protocols: "Modbus, BACnet, MQTT, CoAP",
      Connectivity: "Ethernet, WiFi, 4G LTE",
      Storage: "32GB eMMC",
      Ports: "2x Ethernet, 4x USB, 2x RS485",
      Power: "12V DC, 2A",
    },
    availability: {
      available: true,
      estimatedDelivery: "5-7 business days",
    },
  },
  {
    id: "prod-008",
    code: "TECH-DM-008",
    name: "Damper Actuator D300",
    description:
      "Reliable damper actuator for air flow control. Features fail-safe operation and manual override.",
    category: "Actuators",
    price: {
      value: 199.99,
      currency: "USD",
      formattedValue: "$199.99",
    },
    stock: {
      stockLevel: 0,
      stockLevelStatus: "outOfStock",
    },
    images: [
      {
        url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800",
        altText: "Damper Actuator D300",
        format: "product",
      },
    ],
    specifications: {
      Torque: "10 Nm",
      "Running Time": "90 seconds",
      "Power Supply": "24V AC/DC",
      Control: "On/Off or 3-point",
      "Spring Return": "Optional",
    },
    availability: {
      available: false,
      estimatedDelivery: "2-3 weeks",
    },
  },
];
