import React from 'react';
import { Order } from '../types';
import { User, Calendar, Clock, Package, AlertTriangle, Tag } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  onAssignMachine?: (orderId: string) => void;
  onStartProduction?: (orderId: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onAssignMachine, onStartProduction }) => {
  const getPriorityColor = (priority: Order['priority']) => {
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

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'in-production':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTagColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-100 text-blue-800';
      case 'red':
        return 'bg-red-100 text-red-800';
      case 'green':
        return 'bg-green-100 text-green-800';
      case 'purple':
        return 'bg-purple-100 text-purple-800';
      case 'amber':
        return 'bg-amber-100 text-amber-800';
      case 'gray':
        return 'bg-gray-100 text-gray-800';
      case 'indigo':
        return 'bg-indigo-100 text-indigo-800';
      case 'pink':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = () => {
    return (order.completedQuantity / order.quantity) * 100;
  };

  const isOverdue = () => {
    return new Date() > order.dueDate && order.status !== 'completed';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
            {isOverdue() && <AlertTriangle className="w-5 h-5 text-red-500" />}
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <User className="w-4 h-4" />
            <span>{order.customerName}</span>
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(order.priority)}`}>
            {order.priority === 'low' && 'FAIBLE'}
            {order.priority === 'medium' && 'MOYENNE'}
            {order.priority === 'high' && 'ÉLEVÉE'}
            {order.priority === 'urgent' && 'URGENTE'}
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            {order.status === 'pending' && 'EN ATTENTE'}
            {order.status === 'in-production' && 'EN PRODUCTION'}
            {order.status === 'completed' && 'TERMINÉE'}
            {order.status === 'cancelled' && 'ANNULÉE'}
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Package className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Produit</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{order.clothingType.name}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Quantité</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{order.quantity} unités</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Date de livraison</span>
          </div>
          <span className={`text-sm font-medium ${isOverdue() ? 'text-red-600' : 'text-gray-900'}`}>
            {order.dueDate.toLocaleDateString()}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Temps estimé</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {Math.round(order.estimatedDuration / 60)}h {order.estimatedDuration % 60}m
          </span>
        </div>
      </div>

      {/* Description Tags */}
      {order.descriptionTags && order.descriptionTags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Description</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {order.descriptionTags.map((tag) => (
              <span
                key={tag.id}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTagColor(tag.color)}`}
                title={tag.label}
              >
                {tag.code}
              </span>
            ))}
          </div>
        </div>
      )}

      {order.status === 'in-production' && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Progression</span>
            <span className="text-sm font-medium text-gray-900">
              {order.completedQuantity}/{order.quantity} ({Math.round(calculateProgress())}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        {order.status === 'pending' && (
          <button
            onClick={() => onAssignMachine?.(order.id)}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Assigner Machine
          </button>
        )}
        {order.status === 'pending' && order.assignedMachine && (
          <button
            onClick={() => onStartProduction?.(order.id)}
            className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors duration-200"
          >
            Démarrer Production
          </button>
        )}
      </div>

      {order.assignedMachine && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Machine assignée</span>
            <span className="text-xs font-medium text-gray-900">{order.assignedMachine}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;