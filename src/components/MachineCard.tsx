import React from 'react';
import { Machine } from '../types';
import { Settings, MapPin, TrendingUp, Clock, Tag } from 'lucide-react';

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

  const getTagColor = (color?: string) => {
    const colorMap: Record<string, string> = {
      blue: 'bg-blue-100 text-blue-800',
      red: 'bg-red-100 text-red-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
      amber: 'bg-amber-100 text-amber-800',
      gray: 'bg-gray-100 text-gray-800',
      indigo: 'bg-indigo-100 text-indigo-800',
      pink: 'bg-pink-100 text-pink-800',
      emerald: 'bg-emerald-100 text-emerald-800',
      teal: 'bg-teal-100 text-teal-800',
      orange: 'bg-orange-100 text-orange-800',
      violet: 'bg-violet-100 text-violet-800',
      rose: 'bg-rose-100 text-rose-800',
      cyan: 'bg-cyan-100 text-cyan-800',
      lime: 'bg-lime-100 text-lime-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      sky: 'bg-sky-100 text-sky-800',
      fuchsia: 'bg-fuchsia-100 text-fuchsia-800',
      slate: 'bg-slate-100 text-slate-800',
      zinc: 'bg-zinc-100 text-zinc-800',
      neutral: 'bg-neutral-100 text-neutral-800',
      stone: 'bg-stone-100 text-stone-800'
    };
    return colorMap[color || 'gray'] || 'bg-gray-100 text-gray-800';
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

      {/* Description Tags */}
      {machine.descriptionTags && machine.descriptionTags.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2 mb-2">
            <Tag className="w-4 h-4 text-gray-500" />
            <span className="text-xs text-gray-500">Description</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {machine.descriptionTags.map((tag) => (
              <span
                key={tag.id}
                className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getTagColor(tag.color)}`}
                title={`${tag.label} (${tag.code})`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineCard;