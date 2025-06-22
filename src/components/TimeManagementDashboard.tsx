import React from 'react';
import { Clock } from 'lucide-react';
import { ProductionTimeCategory, ErrorTimeCategory } from '../types';
import ProductionTimeTable from './ProductionTimeTable';
import ErrorTimeTable from './ErrorTimeTable';

interface TimeManagementDashboardProps {
  productionTimeCategories: ProductionTimeCategory[];
  errorTimeCategories: ErrorTimeCategory[];
  onAddProductionTime: (timeData: {
    name: string;
    value: string | number;
    type: 'fixed' | 'formula';
    unit?: string;
    description?: string;
  }) => void;
  onUpdateProductionTime: (timeId: string, timeData: {
    name: string;
    value: string | number;
    type: 'fixed' | 'formula';
    unit?: string;
    description?: string;
  }) => void;
  onDeleteProductionTime: (timeId: string) => void;
  onAddErrorTime: (errorData: {
    name: string;
    value: number;
    unit: string;
    description?: string;
    frequency?: string;
  }) => void;
  onUpdateErrorTime: (errorId: string, errorData: {
    name: string;
    value: number;
    unit: string;
    description?: string;
    frequency?: string;
  }) => void;
  onDeleteErrorTime: (errorId: string) => void;
}

const TimeManagementDashboard: React.FC<TimeManagementDashboardProps> = ({
  productionTimeCategories,
  errorTimeCategories,
  onAddProductionTime,
  onUpdateProductionTime,
  onDeleteProductionTime,
  onAddErrorTime,
  onUpdateErrorTime,
  onDeleteErrorTime
}) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-3 bg-blue-100 rounded-lg">
          <Clock className="w-8 h-8 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion des Temps</h1>
          <p className="text-gray-600">
            Configurez les temps de production et les temps d'erreur pour optimiser vos estimations
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Production Times */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ProductionTimeTable
            productionTimeCategories={productionTimeCategories}
            onAdd={onAddProductionTime}
            onUpdate={onUpdateProductionTime}
            onDelete={onDeleteProductionTime}
          />
        </div>

        {/* Error Times */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <ErrorTimeTable
            errorTimeCategories={errorTimeCategories}
            onAdd={onAddErrorTime}
            onUpdate={onUpdateErrorTime}
            onDelete={onDeleteErrorTime}
          />
        </div>
      </div>
    </div>
  );
};

export default TimeManagementDashboard;