import { Machine, Order, ClothingType, DescriptionTag, ProductionTimeCategory, ErrorTimeCategory } from '../types';

export const clothingTypes: ClothingType[] = [
  {
    id: 'shirt-casual',
    name: 'Chemise Décontractée',
    category: 'shirt',
    complexity: 3,
    estimatedTime: 45,
    requiredMachines: ['sewing-basic', 'sewing-advanced']
  },
  {
    id: 'shirt-formal',
    name: 'Chemise Formelle',
    category: 'shirt',
    complexity: 4,
    estimatedTime: 60,
    requiredMachines: ['sewing-advanced', 'pressing']
  },
  {
    id: 'jeans',
    name: 'Jean',
    category: 'pants',
    complexity: 5,
    estimatedTime: 90,
    requiredMachines: ['sewing-heavy', 'riveting']
  },
  {
    id: 'dress-summer',
    name: 'Robe d\'Été',
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

export const descriptionTags: DescriptionTag[] = [
  {
    id: 'gb',
    code: 'GB',
    label: 'Grande Broderie',
    color: 'blue'
  },
  {
    id: 'bc',
    code: 'BC',
    label: 'Broderie Cœur',
    color: 'red'
  },
  {
    id: 'pb',
    code: 'PB',
    label: 'Petite Broderie',
    color: 'green'
  },
  {
    id: 'bl',
    code: 'BL',
    label: 'Broderie Logo',
    color: 'purple'
  },
  {
    id: 'bp',
    code: 'BP',
    label: 'Broderie Personnalisée',
    color: 'amber'
  },
  {
    id: 'rf',
    code: 'RF',
    label: 'Renfort',
    color: 'gray'
  },
  {
    id: 'cp',
    code: 'CP',
    label: 'Coupe Personnalisée',
    color: 'indigo'
  },
  {
    id: 'fb',
    code: 'FB',
    label: 'Finition Brodée',
    color: 'pink'
  }
];

export const productionTimeCategories: ProductionTimeCategory[] = [
  {
    id: 'framing',
    name: 'Cadrage de l\'article',
    value: 5,
    type: 'fixed',
    unit: 'minutes',
    description: 'Temps nécessaire pour positionner et cadrer l\'article avant broderie'
  },
  {
    id: 'embroidery-time',
    name: 'Temps de la broderie',
    value: 'points * 0.8 / 1000',
    type: 'formula',
    unit: 'minutes',
    description: 'Temps calculé en fonction du nombre de points de broderie'
  },
  {
    id: 'thread-change',
    name: 'Changement de fil',
    value: 2,
    type: 'fixed',
    unit: 'minutes',
    description: 'Temps pour changer de couleur de fil'
  },
  {
    id: 'quality-check',
    name: 'Contrôle qualité',
    value: 3,
    type: 'fixed',
    unit: 'minutes',
    description: 'Vérification de la qualité de la broderie'
  },
  {
    id: 'setup-time',
    name: 'Temps de préparation machine',
    value: 'complexity * 2',
    type: 'formula',
    unit: 'minutes',
    description: 'Temps de préparation basé sur la complexité de l\'article'
  }
];

export const errorTimeCategories: ErrorTimeCategory[] = [
  {
    id: 'thread-break',
    name: 'Casse de fil',
    value: 3,
    unit: 'minutes',
    description: 'Temps perdu lors d\'une casse de fil',
    frequency: 'Occasionnel'
  },
  {
    id: 'needle-break',
    name: 'Casse d\'aiguille',
    value: 5,
    unit: 'minutes',
    description: 'Temps pour remplacer une aiguille cassée',
    frequency: 'Rare'
  },
  {
    id: 'fabric-jam',
    name: 'Bourrage tissu',
    value: 8,
    unit: 'minutes',
    description: 'Temps pour résoudre un bourrage de tissu',
    frequency: 'Rare'
  },
  {
    id: 'machine-calibration',
    name: 'Recalibrage machine',
    value: 15,
    unit: 'minutes',
    description: 'Temps pour recalibrer la machine en cas de décalage',
    frequency: 'Très rare'
  },
  {
    id: 'design-error',
    name: 'Erreur de motif',
    value: 10,
    unit: 'minutes',
    description: 'Temps pour corriger une erreur dans le motif de broderie',
    frequency: 'Occasionnel'
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
    location: 'Zone A',
    descriptionTags: [descriptionTags[0], descriptionTags[2]] // Grande Broderie, Petite Broderie
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
    location: 'Zone A',
    descriptionTags: [descriptionTags[3], descriptionTags[4]] // Broderie Logo, Broderie Personnalisée
  },
  {
    id: 'machine-003',
    name: 'Industrial Heavy',
    type: 'sewing-heavy',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('sewing-heavy')),
    efficiency: 85,
    maintenanceDate: new Date('2024-03-01'),
    location: 'Zone B',
    descriptionTags: [descriptionTags[5]] // Renfort
  },
  {
    id: 'machine-004',
    name: 'Steam Master',
    type: 'pressing',
    status: 'maintenance',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('pressing')),
    efficiency: 95,
    maintenanceDate: new Date('2024-01-25'),
    location: 'Zone C',
    descriptionTags: [descriptionTags[7]] // Finition Brodée
  },
  {
    id: 'machine-005',
    name: 'Overlock Pro',
    type: 'overlocking',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('overlocking')),
    efficiency: 90,
    maintenanceDate: new Date('2024-02-10'),
    location: 'Zone A',
    descriptionTags: [descriptionTags[6]] // Coupe Personnalisée
  },
  {
    id: 'machine-006',
    name: 'Rivet Master',
    type: 'riveting',
    status: 'available',
    capabilities: clothingTypes.filter(c => c.requiredMachines.includes('riveting')),
    efficiency: 87,
    maintenanceDate: new Date('2024-01-30'),
    location: 'Zone B',
    descriptionTags: [descriptionTags[5], descriptionTags[1]] // Renfort, Broderie Cœur
  }
];

export const orders: Order[] = [
  {
    id: 'order-001',
    customerName: 'Boutique Mode Ltd',
    clothingType: clothingTypes[1], // Chemise Formelle
    quantity: 50,
    priority: 'high',
    orderDate: new Date('2024-01-15'),
    dueDate: new Date('2024-01-25'),
    status: 'in-production',
    assignedMachine: 'machine-002',
    estimatedDuration: 3000, // 50 * 60 minutes
    completedQuantity: 25,
    descriptionTags: [descriptionTags[0], descriptionTags[3]] // GB, BL
  },
  {
    id: 'order-002',
    customerName: 'Urban Wear Co',
    clothingType: clothingTypes[2], // Jean
    quantity: 30,
    priority: 'medium',
    orderDate: new Date('2024-01-16'),
    dueDate: new Date('2024-01-30'),
    status: 'pending',
    estimatedDuration: 2700, // 30 * 90 minutes
    completedQuantity: 0,
    descriptionTags: [descriptionTags[5]] // RF
  },
  {
    id: 'order-003',
    customerName: 'Collection Été',
    clothingType: clothingTypes[3], // Robe d'Été
    quantity: 25,
    priority: 'urgent',
    orderDate: new Date('2024-01-17'),
    dueDate: new Date('2024-01-22'),
    status: 'pending',
    estimatedDuration: 1875, // 25 * 75 minutes
    completedQuantity: 0,
    descriptionTags: [descriptionTags[1], descriptionTags[2]] // BC, PB
  },
  {
    id: 'order-004',
    customerName: 'Styles Corporate',
    clothingType: clothingTypes[4], // Blazer
    quantity: 15,
    priority: 'high',
    orderDate: new Date('2024-01-18'),
    dueDate: new Date('2024-01-28'),
    status: 'pending',
    estimatedDuration: 1800, // 15 * 120 minutes
    completedQuantity: 0,
    descriptionTags: [descriptionTags[4], descriptionTags[7]] // BP, FB
  },
  {
    id: 'order-005',
    customerName: 'Tendances Casual',
    clothingType: clothingTypes[0], // Chemise Décontractée
    quantity: 40,
    priority: 'low',
    orderDate: new Date('2024-01-19'),
    dueDate: new Date('2024-02-05'),
    status: 'pending',
    estimatedDuration: 1800, // 40 * 45 minutes
    completedQuantity: 0,
    descriptionTags: [descriptionTags[6]] // CP
  }
];