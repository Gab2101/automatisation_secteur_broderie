import React, { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle, Activity } from 'lucide-react';
import { ErrorTimeCategory } from '../types';
import AddEditErrorTimeModal from './AddEditErrorTimeModal';

interface ErrorTimeTableProps {
  errorTimeCategories: ErrorTimeCategory[];
  onAdd: (errorData: {
    name: string;
    value: number;
    unit: string;
    description?: string;
    frequency?: string;
  }) => void;
  onUpdate: (errorId: string, errorData: {
    name: string;
    value: number;
    unit: string;
    description?: string;
    frequency?: string;
  }) => void;
  onDelete: (errorId: string) => void;
}

const ErrorTimeTable: React.FC<ErrorTimeTableProps> = ({
  errorTimeCategories,
  onAdd,
  onUpdate,
  onDelete
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingError, setEditingError] = useState<ErrorTimeCategory | null>(null);

  const handleAdd = () => {
    setEditingError(null);
    setShowModal(true);
  };

  const handleEdit = (error: ErrorTimeCategory) => {
    setEditingError(error);
    setShowModal(true);
  };

  const handleSave = (errorData: {
    name: string;
    value: number;
    unit: string;
    description?: string;
    frequency?: string;
  }) => {
    if (editingError) {
      onUpdate(editingError.id, errorData);
    } else {
      onAdd(errorData);
    }
    setShowModal(false);
    setEditingError(null);
  };

  const handleDelete = (errorId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce temps d\'erreur ?')) {
      onDelete(errorId);
    }
  };

  const getFrequencyColor = (frequency?: string) => {
    switch (frequency?.toLowerCase()) {
      case 'très rare':
        return 'bg-green-100 text-green-800';
      case 'rare':
        return 'bg-yellow-100 text-yellow-800';
      case 'occasionnel':
        return 'bg-orange-100 text-orange-800';
      case 'fréquent':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-semibold text-gray-900">Temps d'Erreur</h2>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
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
                <th className="text-left py-3 px-4 font-medium text-gray-700">Temps</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Fréquence</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {errorTimeCategories.map((error) => (
                <tr key={error.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-gray-900">{error.name}</div>
                      {error.description && (
                        <div className="text-sm text-gray-500 mt-1">{error.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-gray-900">
                        {error.value} {error.unit}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {error.frequency ? (
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getFrequencyColor(error.frequency)}`}>
                        {error.frequency}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(error)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(error.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {errorTimeCategories.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-gray-500">
                    Aucun temps d'erreur configuré
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddEditErrorTimeModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingError(null);
        }}
        onSave={handleSave}
        editingError={editingError}
      />
    </>
  );
};

export default ErrorTimeTable;