import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Timer, Calculator } from 'lucide-react';
import { ProductionTimeCategory } from '../types';
import AddEditProductionTimeModal from './AddEditProductionTimeModal';

interface ProductionTimeTableProps {
  productionTimeCategories: ProductionTimeCategory[];
  onAdd: (timeData: {
    name: string;
    value: string | number;
    type: 'fixed' | 'formula';
    unit?: string;
    description?: string;
  }) => void;
  onUpdate: (timeId: string, timeData: {
    name: string;
    value: string | number;
    type: 'fixed' | 'formula';
    unit?: string;
    description?: string;
  }) => void;
  onDelete: (timeId: string) => void;
}

const ProductionTimeTable: React.FC<ProductionTimeTableProps> = ({
  productionTimeCategories,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingTime, setEditingTime] = useState<ProductionTimeCategory | null>(null);

  const handleAdd = () => {
    setEditingTime(null);
    setShowModal(true);
  };

  const handleEdit = (time: ProductionTimeCategory) => {
    setEditingTime(time);
    setShowModal(true);
  };

  const handleSave = (timeData: {
    name: string;
    value: string | number;
    type: 'fixed' | 'formula';
    unit?: string;
    description?: string;
  }) => {
    if (editingTime) {
      onUpdate(editingTime.id, timeData);
    } else {
      onAdd(timeData);
    }
    setShowModal(false);
    setEditingTime(null);
  };

  const handleDelete = (timeId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce temps de production ?')) {
      onDelete(timeId);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Timer className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Temps de Production</h2>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Nom</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Valeur/Formule</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Unité</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productionTimeCategories.map((time) => (
                <tr key={time.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{time.name}</div>
                      {time.description && (
                        <div className="text-sm text-gray-500 mt-1">{time.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {time.type === 'formula' && (
                        <Calculator className="w-4 h-4 text-purple-500" />
                      )}
                      <span className={`font-mono text-sm ${
                        time.type === 'formula' ? 'text-purple-700 bg-purple-50 px-2 py-1 rounded' : 'text-gray-900'
                      }`}>
                        {time.value}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      time.type === 'fixed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {time.type === 'fixed' ? 'Fixe' : 'Formule'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {time.unit || '-'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(time)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(time.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {productionTimeCategories.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Aucun temps de production configuré
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddEditProductionTimeModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingTime(null);
        }}
        onSave={handleSave}
        editingTime={editingTime}
      />
    </>
  );
};

export default ProductionTimeTable;