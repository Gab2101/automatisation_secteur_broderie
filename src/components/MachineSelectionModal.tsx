import React from 'react';
import { Machine, Order } from '../types';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface MachineSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  machines: Machine[];
  onSelectMachine: (machineId: string, orderId: string) => void;
}

const MachineSelectionModal: React.FC<MachineSelectionModalProps> = ({
  isOpen,
  onClose,
  order,
  machines,
  onSelectMachine
}) => {
  if (!isOpen || !order) return null;

  const compatibleMachines = machines.filter(machine => 
    machine.capabilities.some(capability => capability.id === order.clothingType.id) &&
    machine.status === 'available'
  );

  const handleMachineSelect = (machineId: string) => {
    onSelectMachine(machineId, order.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-96 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Select Machine</h2>
            <p className="text-sm text-gray-600 mt-1">
              Choose a machine for {order.clothingType.name} production
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-80">
          {compatibleMachines.length === 0 ? (
            <div className="text-center py-8">
              <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No compatible machines available</p>
            </div>
          ) : (
            <div className="space-y-3">
              {compatibleMachines.map((machine) => (
                <div
                  key={machine.id}
                  onClick={() => handleMachineSelect(machine.id)}
                  className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                        <div>
                          <h3 className="font-medium text-gray-900">{machine.name}</h3>
                          <p className="text-sm text-gray-600">{machine.type.replace('-', ' ')} • {machine.location}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm text-gray-600">Efficiency</span>
                        <span className="text-sm font-medium text-gray-900">{machine.efficiency}%</span>
                      </div>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${machine.efficiency}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MachineSelectionModal;