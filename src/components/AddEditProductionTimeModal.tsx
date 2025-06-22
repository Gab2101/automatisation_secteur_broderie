import React, { useState, useEffect } from 'react';
import { X, Timer, Calculator, AlertCircle, Save } from 'lucide-react';
import { ProductionTimeCategory } from '../types';

interface AddEditProductionTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (timeData: {
    name: string;
    value: string | number;
    type: 'fixed' | 'formula';
    unit?: string;
    description?: string;
  }) => void;
  editingTime: ProductionTimeCategory | null;
}

const AddEditProductionTimeModal: React.FC<AddEditProductionTimeModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTime
}) => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    type: 'fixed' as 'fixed' | 'formula',
    unit: 'minutes',
    description: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingTime) {
      setFormData({
        name: editingTime.name,
        value: editingTime.value.toString(),
        type: editingTime.type,
        unit: editingTime.unit || 'minutes',
        description: editingTime.description || ''
      });
    } else {
      setFormData({
        name: '',
        value: '',
        type: 'fixed',
        unit: 'minutes',
        description: ''
      });
    }
    setErrors({});
  }, [editingTime, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est requis';
    }

    if (!formData.value.trim()) {
      newErrors.value = 'La valeur est requise';
    } else if (formData.type === 'fixed') {
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

    const processedValue = formData.type === 'fixed' 
      ? parseFloat(formData.value) 
      : formData.value;

    onSave({
      name: formData.name,
      value: processedValue,
      type: formData.type,
      unit: formData.unit,
      description: formData.description
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
              {editingTime ? 'Modifier le Temps' : 'Nouveau Temps de Production'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {editingTime ? 'Modifier les paramètres du temps' : 'Ajouter un nouveau temps de production'}
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
                Nom du temps *
              </label>
              <div className="relative">
                <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Cadrage de l'article"
                />
              </div>
              {errors.name && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.name}
                </div>
              )}
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type de valeur *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'fixed')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    formData.type === 'fixed'
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Timer className="w-4 h-4 mx-auto mb-1" />
                  Temps Fixe
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange('type', 'formula')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                    formData.type === 'formula'
                      ? 'bg-purple-100 text-purple-800 border-purple-300'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <Calculator className="w-4 h-4 mx-auto mb-1" />
                  Formule
                </button>
              </div>
            </div>

            {/* Valeur */}
            <div>
              <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
                {formData.type === 'fixed' ? 'Valeur numérique *' : 'Formule *'}
              </label>
              <input
                type="text"
                id="value"
                value={formData.value}
                onChange={(e) => handleInputChange('value', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 font-mono ${
                  errors.value ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder={formData.type === 'fixed' ? 'Ex: 5' : 'Ex: points * 0.8 / 1000'}
              />
              {errors.value && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.value}
                </div>
              )}
              {formData.type === 'formula' && (
                <p className="text-xs text-gray-500 mt-1">
                  Variables disponibles: points, complexity, quantity
                </p>
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
                placeholder="Description optionnelle du temps de production"
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
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium flex items-center justify-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{editingTime ? 'Modifier' : 'Ajouter'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditProductionTimeModal;