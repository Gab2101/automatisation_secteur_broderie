import React from 'react';
import { Machine } from '../types';
import { Settings, MapPin, TrendingUp, Clock } from 'lucide-react';

interface MachineCardProps {
  machine: Machine;
  onClick?: () => void;
}

const MachineCard: React.FC<MachineCardProps> = ({ machine, onClick }) => {
  const getStatusColor = (status: Machine['status']) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'busy':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'maintenance':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'offline':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: Machine['status']) => {
    switch (status) {
      case 'available':
        return '🟢';
      case 'busy':
        return '🟡';
      case 'maintenance':
        return '🔧';
      case 'offline':
        return '🔴';
      default:
        return '⚪';
    }
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer transform hover:-translate-y-1 ${
        machine.status === 'available' ? 'ring-2 ring-emerald-200' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{machine.name}</h3>
          <p className="text-sm text-gray-600 capitalize">{machine.type.replace('-', ' ')}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getStatusIcon(machine.status)}</span>
          <Settings className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border mb-4 ${getStatusColor(machine.status)}`}>
        {machine.status.charAt(0).toUpperCase() + machine.status.slice(1)}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-600">Efficiency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-20 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${machine.efficiency}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-900">{machine.efficiency}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Location</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{machine.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Last Maintenance</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {machine.maintenanceDate.toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 mb-2">Capabilities ({machine.capabilities.length})</p>
        <div className="flex flex-wrap gap-1">
          {machine.capabilities.slice(0, 3).map((capability) => (
            <span
              key={capability.id}
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800"
            >
              {capability.name}
            </span>
          ))}
          {machine.capabilities.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
              +{machine.capabilities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineCard;