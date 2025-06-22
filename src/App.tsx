import React, { useState } from 'react';
import { Factory, Package, BarChart3, Settings, Plus, Users, Clock } from 'lucide-react';
import MachineCard from './components/MachineCard';
import OrderCard from './components/OrderCard';
import StatsCard from './components/StatsCard';
import OperatorCard from './components/OperatorCard';
import MachineSelectionModal from './components/MachineSelectionModal';
import MachineConfigurationModal from './components/MachineConfigurationModal';
import NewOrderModal from './components/NewOrderModal';
import NewOperatorModal from './components/NewOperatorModal';
import EditOperatorModal from './components/EditOperatorModal';
import TimeManagementDashboard from './components/TimeManagementDashboard';
import { useProductionManager } from './hooks/useProductionManager';
import { Order, Machine, Operator, DescriptionTag } from './types';
import { clothingTypes } from './data/mockData';
import { descriptionTags as initialDescriptionTags } from './data/mockData';

function App() {
  const {
    machines,
    orders,
    operators,
    productionTimeCategories,
    errorTimeCategories,
    stats,
    addOrder,
    addOperator,
    updateOperator,
    updateMachine,
    addProductionTime,
    updateProductionTime,
    deleteProductionTime,
    addErrorTime,
    updateErrorTime,
    deleteErrorTime,
    assignMachineToOrder,
    startProduction,
    getAvailableMachinesForOrder
  } = useProductionManager();

  const [activeTab, setActiveTab] = useState<'dashboard' | 'machines' | 'orders' | 'operators' | 'time-management'>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [showMachineModal, setShowMachineModal] = useState(false);
  const [showMachineConfigModal, setShowMachineConfigModal] = useState(false);
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showNewOperatorModal, setShowNewOperatorModal] = useState(false);
  const [showEditOperatorModal, setShowEditOperatorModal] = useState(false);
  const [customTags, setCustomTags] = useState<DescriptionTag[]>([]);

  const allDescriptionTags = [...initialDescriptionTags, ...customTags];

  const handleAssignMachine = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowMachineModal(true);
    }
  };

  const handleMachineConfiguration = (machine: Machine) => {
    setSelectedMachine(machine);
    setShowMachineConfigModal(true);
  };

  const handleOperatorEdit = (operator: Operator) => {
    setSelectedOperator(operator);
    setShowEditOperatorModal(true);
  };

  const handleMachineSelection = (machineId: string, orderId: string) => {
    assignMachineToOrder(machineId, orderId);
  };

  const handleMachineUpdate = (machineId: string, name: string, descriptionTags: DescriptionTag[]) => {
    updateMachine(machineId, name, descriptionTags);
  };

  const handleOperatorUpdate = (operatorId: string, operatorData: {
    name: string;
    language: string;
    strengths: DescriptionTag[];
  }) => {
    updateOperator(operatorId, operatorData);
  };

  const handleStartProduction = (orderId: string) => {
    startProduction(orderId);
  };

  const handleAddOrder = (orderData: {
    orderNumber: string;
    customerName: string;
    clothingType: any;
    quantity: number;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate: Date;
    descriptionTags: DescriptionTag[];
  }) => {
    addOrder(orderData);
  };

  const handleAddOperator = (operatorData: {
    name: string;
    language: string;
    strengths: DescriptionTag[];
  }) => {
    addOperator(operatorData);
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const activeOrders = orders.filter(order => order.status === 'in-production');
  const completedOrders = orders.filter(order => order.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <Factory className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Gestionnaire de Production</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowNewOrderModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Nouvelle Commande</span>
              </button>
              <Settings className="w-6 h-6 text-gray-400 cursor-pointer hover:text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', name: 'Tableau de Bord', icon: BarChart3 },
              { id: 'machines', name: 'Machines', icon: Factory },
              { id: 'orders', name: 'Commandes', icon: Package },
              { id: 'operators', name: 'Opérateurs', icon: Users },
              { id: 'time-management', name: 'Gestion des Temps', icon: Clock }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Commandes"
                value={stats.totalOrders}
                icon={Package}
                color="blue"
                trend={{ value: 12, isPositive: true }}
              />
              <StatsCard
                title="Productions Actives"
                value={stats.activeProductions}
                icon={Factory}
                color="amber"
              />
              <StatsCard
                title="Machines Disponibles"
                value={stats.availableMachines}
                icon={Settings}
                color="emerald"
              />
              <StatsCard
                title="Efficacité Moyenne"
                value={`${stats.efficiency}%`}
                icon={BarChart3}
                color="blue"
                trend={{ value: 5, isPositive: true }}
              />
            </div>

            {/* Recent Activities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Productions Actives</h2>
                <div className="space-y-4">
                  {activeOrders.slice(0, 3).map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                  {activeOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune production active
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Commandes en Attente</h2>
                <div className="space-y-4">
                  {pendingOrders.slice(0, 3).map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onAssignMachine={handleAssignMachine}
                      onStartProduction={handleStartProduction}
                    />
                  ))}
                  {pendingOrders.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Aucune commande en attente
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'machines' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Machines de Production</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-emerald-400 rounded-full"></span>
                  <span className="text-sm text-gray-600">Disponible</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-amber-400 rounded-full"></span>
                  <span className="text-sm text-gray-600">Occupée</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 bg-red-400 rounded-full"></span>
                  <span className="text-sm text-gray-600">Maintenance</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {machines.map((machine) => (
                <MachineCard 
                  key={machine.id} 
                  machine={machine} 
                  onClick={() => handleMachineConfiguration(machine)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Commandes de Production</h2>
            
            {/* Order Status Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <div className="text-blue-600 border-blue-500 py-2 px-1 border-b-2 font-medium text-sm">
                  Toutes les Commandes ({orders.length})
                </div>
              </nav>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onAssignMachine={handleAssignMachine}
                  onStartProduction={handleStartProduction}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'operators' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Opérateurs</h2>
              <button 
                onClick={() => setShowNewOperatorModal(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter un Opérateur</span>
              </button>
            </div>

            {operators.length === 0 ? (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun opérateur</h3>
                <p className="text-gray-600 mb-6">
                  Commencez par ajouter des opérateurs à votre équipe de production.
                </p>
                <button 
                  onClick={() => setShowNewOperatorModal(true)}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Ajouter le premier opérateur</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {operators.map((operator) => (
                  <OperatorCard 
                    key={operator.id} 
                    operator={operator} 
                    onEdit={() => handleOperatorEdit(operator)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'time-management' && (
          <TimeManagementDashboard
            productionTimeCategories={productionTimeCategories}
            errorTimeCategories={errorTimeCategories}
            onAddProductionTime={addProductionTime}
            onUpdateProductionTime={updateProductionTime}
            onDeleteProductionTime={deleteProductionTime}
            onAddErrorTime={addErrorTime}
            onUpdateErrorTime={updateErrorTime}
            onDeleteErrorTime={deleteErrorTime}
          />
        )}
      </main>

      {/* Machine Selection Modal */}
      <MachineSelectionModal
        isOpen={showMachineModal}
        onClose={() => setShowMachineModal(false)}
        order={selectedOrder}
        machines={machines}
        onSelectMachine={handleMachineSelection}
      />

      {/* Machine Configuration Modal */}
      <MachineConfigurationModal
        isOpen={showMachineConfigModal}
        onClose={() => setShowMachineConfigModal(false)}
        machine={selectedMachine}
        allDescriptionTags={allDescriptionTags}
        onSave={handleMachineUpdate}
      />

      {/* New Order Modal */}
      <NewOrderModal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        onAddOrder={handleAddOrder}
        clothingTypes={clothingTypes}
      />

      {/* New Operator Modal */}
      <NewOperatorModal
        isOpen={showNewOperatorModal}
        onClose={() => setShowNewOperatorModal(false)}
        onAddOperator={handleAddOperator}
        allDescriptionTags={allDescriptionTags}
      />

      {/* Edit Operator Modal */}
      <EditOperatorModal
        isOpen={showEditOperatorModal}
        onClose={() => setShowEditOperatorModal(false)}
        operator={selectedOperator}
        onUpdateOperator={handleOperatorUpdate}
        allDescriptionTags={allDescriptionTags}
      />
    </div>
  );
}

export default App;