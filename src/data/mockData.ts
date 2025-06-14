import { Machine, Order, ClothingType } from '../types';

export const clothingTypes: ClothingType[] = [
  {
    id: 'shirt-casual',
    name: 'Casual Shirt',
    category: 'shirt',
    complexity: 3,
    estimatedTime: 45,
    requiredMachines: ['sewing-basic', 'sewing-advanced']
  },
  {
    id: 'shirt-formal',
    name: 'Formal Shirt',
    category: 'shirt',
    complexity: 4,
    estimatedTime: 60,
    requiredMachines: ['sewing-advanced', 'pressing']
  },
  {
    id: 'jeans',
    name: 'Jeans',
    category: 'pants',
    complexity: 5,
    estimatedTime: 90,
    requiredMachines: ['sewing-heavy', 'riveting']
  },
  {
    id: 'dress-summer',
    name: 'Summer Dress',
    category: 'dress',
    complexity: 4,
    estimatedTime: 75,
    requiredMachines: ['sewing-advanced', 'overlocking']
  },
  {
    id: 'jacket-blazer',
    name: 'Blazer',
    category: 'jacket',
    complexity: 6,
    estimatedTime: 120,
    requiredMachines: ['sewing-advanced', 'pressing', 'buttonhole']
  }
];

export const machines: Machine[] = [
  {
    id: 'machine-001',
    name: 'Singer Pro 9000',
    type: 'sewing-basic',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('sewing-basic')),
    efficiency: 92,
    maintenanceDate: new Date('2024-02-15'),
    location: 'Zone A'
  },
  {
    id: 'machine-002',
    name: 'Brother X-Series',
    type: 'sewing-advanced',
    status: 'busy',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('sewing-advanced')),
    currentOrder: 'order-001',
    efficiency: 88,
    maintenanceDate: new Date('2024-01-20'),
    location: 'Zone A'
  },
  {
    id: 'machine-003',
    name: 'Industrial Heavy',
    type: 'sewing-heavy',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('sewing-heavy')),
    efficiency: 85,
    maintenanceDate: new Date('2024-03-01'),
    location: 'Zone B'
  },
  {
    id: 'machine-004',
    name: 'Steam Master',
    type: 'pressing',
    status: 'maintenance',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('pressing')),
    efficiency: 95,
    maintenanceDate: new Date('2024-01-25'),
    location: 'Zone C'
  },
  {
    id: 'machine-005',
    name: 'Overlock Pro',
    type: 'overlocking',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('overlocking')),
    efficiency: 90,
    maintenanceDate: new Date('2024-02-10'),
    location: 'Zone A'
  },
  {
    id: 'machine-006',
    name: 'Rivet Master',
    type: 'riveting',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('riveting')),
    efficiency: 87,
    maintenanceDate: new Date('2024-01-30'),
    location: 'Zone B'
  }
];

export const orders: Order[] = [
  {
    id: 'order-001',
    customerName: 'Fashion Boutique Ltd',
    clothingType: clothingTypes[1], // Formal Shirt
    quantity: 50,
    priority: 'high',
    orderDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-25'),
    status: 'in-production',
    assignedMachine: 'machine-002',
    estimatedDuration: 3000, // 50 * 60 minutes
    completedQuantity: 25
  },
  {
    id: 'order-002',
    customerName: 'Urban Wear Co',
    clothingType: clothingTypes[2], // Jeans
    quantity: 30,
    priority: 'medium',
    orderDate: new Date('2024-01-16'),
    dueDate: new Date('2024-01-30'),
    status: 'pending',
    estimatedDuration: 2700, // 30 * 90 minutes
    completedQuantity: 0
  },
  {
    id: 'order-003',
    customerName: 'Summer Collection',
    clothingType: clothingTypes[3], // Summer Dress
    quantity: 25,
    priority: 'urgent',
    orderDate: new Date('2024-01-17'),
    dueDate: new Date('2024-01-22'),
    status: 'pending',
    estimatedDuration: 1875, // 25 * 75 minutes
    completedQuantity: 0
  },
  {
    id: 'order-004',
    customerName: 'Corporate Styles',
    clothingType: clothingTypes[4], // Blazer
    quantity: 15,
    priority: 'high',
    orderDate: new Date('2024-01-18'),
    dueDate: new Date('2024-01-28'),
    status: 'pending',
    estimatedDuration: 1800, // 15 * 120 minutes
    completedQuantity: 0
  },
  {
    id: 'order-005',
    customerName: 'Casual Trends',
    clothingType: clothingTypes[0], // Casual Shirt
    quantity: 40,
    priority: 'low',
    orderDate: new Date('2024-01-19'),
    dueDate: new Date('2024-02-05'),
    status: 'pending',
    estimatedDuration: 1800, // 40 * 45 minutes
    completedQuantity: 0
  }
];