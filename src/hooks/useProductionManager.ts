import { useState, useEffect } from 'react';
import { Machine, Order, ProductionStats, ClothingType, DescriptionTag } from '../types';
import { machines as initialMachines, orders as initialOrders } from '../data/mockData';

export const useProductionManager = () => {
  const [machines, setMachines] = useState<Machine[]>(initialMachines);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [stats, setStats] = useState<ProductionStats>({
    totalOrders: 0,
    completedOrders: 0,
    activeProductions: 0,
    availableMachines: 0,
    efficiency: 0
  });

  // Calculate stats whenever machines or orders change
  useEffect(() => {
    const totalOrders = orders.length;
    const completedOrders = orders.filter(order => order.status === 'completed').length;
    const activeProductions = orders.filter(order => order.status === 'in-production').length;
    const availableMachines = machines.filter(machine => machine.status === 'available').length;
    const avgEfficiency = machines.reduce((sum, machine) => sum + machine.efficiency, 0) / machines.length;

    setStats({
      totalOrders,
      completedOrders,
      activeProductions,
      availableMachines,
      efficiency: Math.round(avgEfficiency)
    });
  }, [machines, orders]);

  const addOrder = (orderData: {
    orderNumber: string;
    customerName: string;
    clothingType: ClothingType;
    quantity: number;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    dueDate: Date;
    descriptionTags: DescriptionTag[];
  }) => {
    const newOrder: Order = {
      id: orderData.orderNumber,
      customerName: orderData.customerName,
      clothingType: orderData.clothingType,
      quantity: orderData.quantity,
      priority: orderData.priority,
      orderDate: new Date(),
      dueDate: orderData.dueDate,
      status: 'pending',
      estimatedDuration: orderData.clothingType.estimatedTime * orderData.quantity,
      completedQuantity: 0,
      descriptionTags: orderData.descriptionTags
    };

    setOrders(prev => [...prev, newOrder]);
  };

  const assignMachineToOrder = (machineId: string, orderId: string) => {
    setMachines(prev => prev.map(machine => 
      machine.id === machineId 
        ? { ...machine, status: 'busy' as const, currentOrder: orderId }
        : machine
    ));

    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, assignedMachine: machineId }
        : order
    ));
  };

  const startProduction = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'in-production' as const }
        : order
    ));

    // Simulate production progress
    setTimeout(() => {
      simulateProductionProgress(orderId);
    }, 2000);
  };

  const simulateProductionProgress = (orderId: string) => {
    const progressInterval = setInterval(() => {
      setOrders(prev => {
        const updatedOrders = prev.map(order => {
          if (order.id === orderId && order.status === 'in-production') {
            const increment = Math.floor(Math.random() * 3) + 1;
            const newCompleted = Math.min(order.completedQuantity + increment, order.quantity);
            
            if (newCompleted >= order.quantity) {
              // Complete the order
              setMachines(prevMachines => prevMachines.map(machine => 
                machine.currentOrder === orderId
                  ? { ...machine, status: 'available' as const, currentOrder: undefined }
                  : machine
              ));
              
              clearInterval(progressInterval);
              return { ...order, status: 'completed' as const, completedQuantity: newCompleted };
            }
            
            return { ...order, completedQuantity: newCompleted };
          }
          return order;
        });
        
        return updatedOrders;
      });
    }, 3000);
  };

  const getAvailableMachinesForOrder = (order: Order): Machine[] => {
    return machines.filter(machine => 
      machine.status === 'available' &&
      machine.capabilities.some(capability => 
        order.clothingType.requiredMachines.includes(machine.type)
      )
    );
  };

  return {
    machines,
    orders,
    stats,
    addOrder,
    assignMachineToOrder,
    startProduction,
    getAvailableMachinesForOrder
  };
};