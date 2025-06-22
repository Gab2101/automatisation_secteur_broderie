import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Activity, AlertCircle, Save } from 'lucide-react';
import { ErrorTimeCategory } from '../types';

interface AddEditErrorTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (errorData: {
    name: string;
    value: number;
    unit: string;
    description?: string;
    frequency?: string;
  }) => void;
  editingError: ErrorTimeCategory | null;
}

const frequencyOptions = [
  { value: '', label: 'Non spécifiée' },
  { value: 'Très rare', label: 'Très rare' },
  { value: 'Rare', label: 'Rare' },
  { value: 'Occasionnel', label: 'Occasionnel' },
  { value: 'Fréquent', label: 'Fréquent' }
];

const AddEditErrorTimeModal: React.FC<AddEditErrorTimeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingError
}) => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    unit: 'minutes',
    description: '',
    frequency: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingError) {
      setFormData({
        name: editingError.name,
        value: editingError.value.toString(),
        unit: editingError.unit,
        description: editingError.description || '',
        frequency: editingError.frequency || ''
      });
    } else {
      setFormData({
        name: '',
        value: '',
        unit: 'minutes',
        description: '',
        frequency: ''
      });
    }
    setErrors({});
  }, [editingError, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.value.trim()) {
      newErrors.value = 'La valeur est requise';
    } else {
      const numValue = parseFloat(formData.value);
      if (isNaN(numValue) || numValue < 0) {
        newErrors.value = 'La valeur doit être un nombre positif';
      }
    }

    if (!formData.unit.trim()) {
      newErrors.unit = 'L\'unité est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave({
      name: formData.name,
      value: parseFloat(formData.value),
      unit: formData.unit,
      description: formData.description,
      frequency: formData.frequency
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingError ? 'Modifier le Temps d\'Erreur' : 'Nouveau Temps d\'Erreur'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {editingError ? 'Modifier les paramètres du temps d\'erreur' : 'Ajouter un nouveau temps d\'erreur'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            {/* Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom de l'erreur *
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Casse de fil"
                />
              </div>
              {errors.name && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Valeur */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                Temps perdu *
              </label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  id="value"
                  min="0"
                  step="0.1"
                  value={formData.value}
                  onChange={(e) => handleInputChange('value', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.value ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Ex: 3"
                />
              </div>
              {errors.value && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.value}
                </div>
              )}
            </div>

            {/* Unité */}
            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unité *
              </label>
              <select
                id="unit"
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.unit ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="minutes">Minutes</option>
                <option value="secondes">Secondes</option>
                <option value="heures">Heures</option>
                <option value="%">Pourcentage</option>
              </select>
              {errors.unit && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.unit}
                </div>
              )}
            </div>

            {/* Fréquence */}
            <div>
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-2">
                Fréquence d'occurrence
              </label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) => handleInputChange('frequency', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {frequencyOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Description optionnelle de l'erreur et de son impact"
              />
            </div>
          </div>

          <div className="flex space-x-3 mt-6 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{editingError ? 'Modifier' : 'Ajouter'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditErrorTimeModal;