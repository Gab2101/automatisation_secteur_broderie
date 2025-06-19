import React, { useState } from 'react';
import { X, Package, User, Calendar, AlertCircle } from 'lucide-react';
import { ClothingType } from '../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddOrder: (orderData: {
    orderNumber: string;
    customerName: string;
    clothingType: ClothingType;
    quantity: number;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate: Date;
  }) => void;
  clothingTypes: ClothingType[];
}

const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onAddOrder,
  clothingTypes
}) => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    customerName: '',
    clothingTypeId: '',
    quantity: 1,
    priority: 'medium' as const,
    dueDate: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.orderNumber.trim()) {
      newErrors.orderNumber = 'Le numéro de commande est requis';
    }

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Le nom du client est requis';
    }

    if (!formData.clothingTypeId) {
      newErrors.clothingTypeId = 'Le type de vêtement est requis';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'La quantité doit être supérieure à 0';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'La date de livraison est requise';
    } else {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'La date de livraison ne peut pas être dans le passé';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const selectedClothingType = clothingTypes.find(ct => ct.id === formData.clothingTypeId);
    if (!selectedClothingType) return;

    onAddOrder({
      orderNumber: formData.orderNumber,
      customerName: formData.customerName,
      clothingType: selectedClothingType,
      quantity: formData.quantity,
      priority: formData.priority,
      dueDate: new Date(formData.dueDate)
    });

    // Reset form
    setFormData({
      orderNumber: '',
      customerName: '',
      clothingTypeId: '',
      quantity: 1,
      priority: 'medium',
      dueDate: ''
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Nouvelle Commande</h2>
            <p className="text-sm text-gray-600 mt-1">
              Créer une nouvelle commande de production
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Numéro de commande */}
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de commande *
              </label>
              <div className="relative">
                <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="orderNumber"
                  value={formData.orderNumber}
                  onChange={(e) => handleInputChange('orderNumber', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.orderNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Ex: CMD-2024-001"
                />
              </div>
              {errors.orderNumber && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.orderNumber}
                </div>
              )}
            </div>

            {/* Nom du client */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Nom du client *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  id="customerName"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.customerName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Ex: Boutique Mode Paris"
                />
              </div>
              {errors.customerName && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.customerName}
                </div>
              )}
            </div>

            {/* Type de vêtement */}
            <div>
              <label htmlFor="clothingType" className="block text-sm font-medium text-gray-700 mb-2">
                Type de vêtement *
              </label>
              <select
                id="clothingType"
                value={formData.clothingTypeId}
                onChange={(e) => handleInputChange('clothingTypeId', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.clothingTypeId ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              >
                <option value="">Sélectionner un type de vêtement</option>
                {clothingTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} - {type.estimatedTime}min/unité
                  </option>
                ))}
              </select>
              {errors.clothingTypeId && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.clothingTypeId}
                </div>
              )}
            </div>

            {/* Quantité */}
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantité *
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                  errors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Nombre d'unités"
              />
              {errors.quantity && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.quantity}
                </div>
              )}
            </div>

            {/* Priorité */}
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priorité
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {['low', 'medium', 'high', 'urgent'].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() => handleInputChange('priority', priority)}
                    className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      formData.priority === priority
                        ? getPriorityColor(priority)
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {priority === 'low' && 'Faible'}
                    {priority === 'medium' && 'Moyenne'}
                    {priority === 'high' && 'Élevée'}
                    {priority === 'urgent' && 'Urgente'}
                  </button>
                ))}
              </div>
            </div>

            {/* Date de livraison */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-2">
                Date de livraison *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  id="dueDate"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 ${
                    errors.dueDate ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
              </div>
              {errors.dueDate && (
                <div className="flex items-center mt-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.dueDate}
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Créer la commande
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrderModal;