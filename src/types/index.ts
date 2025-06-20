export interface Machine {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'busy' | 'maintenance' | 'offline';
  capabilities: ClothingType[];
  currentOrder?: string;
  efficiency: number;
  maintenanceDate: Date;
  location: string;
  descriptionTags?: DescriptionTag[];
}

export interface Order {
  id: string;
  customerName: string;
  clothingType: ClothingType;
  quantity: number;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  orderDate: Date;
  dueDate: Date;
  status: 'pending' | 'in-production' | 'completed' | 'cancelled';
  assignedMachine?: string;
  estimatedDuration: number;
  completedQuantity: number;
  descriptionTags?: DescriptionTag[];
}

export interface ClothingType {
  id: string;
  name: string;
  category: 'shirt' | 'pants' | 'dress' | 'jacket' | 'accessories';
  complexity: number;
  estimatedTime: number; // in minutes per unit
  requiredMachines: string[];
}

export interface DescriptionTag {
  id: string;
  code: string;
  label: string;
  color?: string;
}

export interface ProductionStats {
  totalOrders: number;
  completedOrders: number;
  activeProductions: number;
  availableMachines: number;
  efficiency: number;
}