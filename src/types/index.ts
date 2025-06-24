/**
 * Type definitions for the production management system
 */

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
  estimatedDuration: number; // in minutes
  completedQuantity: number;
  descriptionTags?: DescriptionTag[];
}

export interface ClothingType {
  id: string;
  name: string;
  category: 'shirt' | 'pants' | 'dress' | 'jacket' | 'accessories';
  complexity: number; // 1-10 scale
  estimatedTime: number; // in minutes per unit
  requiredMachines: string[];
}

export interface DescriptionTag {
  id: string;
  code: string; // Short code (e.g., "GB" for Grande Broderie)
  label: string; // Full description
  color?: string; // Tailwind color name
}

export interface Operator {
  id: string;
  name: string;
  language: string; // Language code (e.g., "fr", "en")
  strengths: DescriptionTag[]; // Areas of expertise
}

export interface ProductionStats {
  totalOrders: number;
  completedOrders: number;
  activeProductions: number;
  availableMachines: number;
  efficiency: number; // Average efficiency percentage
}

export interface ProductionTimeCategory {
  id: string;
  name: string;
  value: string | number; // Can be a fixed number or formula string
  type: 'fixed' | 'formula';
  unit?: string; // e.g., "minutes", "seconds", "%"
  description?: string;
}

export interface ErrorTimeCategory {
  id: string;
  name: string;
  value: number; // Time lost in specified unit
  unit: string; // e.g., "minutes", "seconds"
  description?: string;
  frequency?: string; // How often this error occurs
}