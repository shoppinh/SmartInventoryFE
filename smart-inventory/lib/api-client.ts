import { v4 as uuidv4 } from 'uuid';
import { 
  Item, 
  Order, 
  Supplier, 
  DashboardData
} from './types';
import { 
  items as mockItems, 
  orders as mockOrders, 
  suppliers as mockSuppliers, 
  dashboardData as mockDashboardData 
} from './mock-data';

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Items API
export const itemsApi = {
  getAll: async (): Promise<Item[]> => {
    await delay(500);
    return [...mockItems];
  },
  
  getById: async (id: string): Promise<Item | undefined> => {
    await delay(300);
    return mockItems.find(item => item.id === id);
  },
  
  create: async (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>): Promise<Item> => {
    await delay(700);
    const newItem: Item = {
      ...item,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockItems.push(newItem);
    return newItem;
  },
  
  update: async (id: string, item: Partial<Item>): Promise<Item | undefined> => {
    await delay(500);
    const index = mockItems.findIndex(i => i.id === id);
    if (index === -1) return undefined;
    
    mockItems[index] = {
      ...mockItems[index],
      ...item,
      updatedAt: new Date().toISOString()
    };
    return mockItems[index];
  },
  
  delete: async (id: string): Promise<boolean> => {
    await delay(500);
    const index = mockItems.findIndex(i => i.id === id);
    if (index === -1) return false;
    
    mockItems.splice(index, 1);
    return true;
  }
};

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    await delay(500);
    return [...mockOrders];
  },
  
  getById: async (id: string): Promise<Order | undefined> => {
    await delay(300);
    return mockOrders.find(order => order.id === id);
  },
  
  create: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    await delay(700);
    const newOrder: Order = {
      ...order,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    return newOrder;
  },
  
  update: async (id: string, order: Partial<Order>): Promise<Order | undefined> => {
    await delay(500);
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) return undefined;
    
    mockOrders[index] = {
      ...mockOrders[index],
      ...order,
      updatedAt: new Date().toISOString()
    };
    return mockOrders[index];
  },
  
  delete: async (id: string): Promise<boolean> => {
    await delay(500);
    const index = mockOrders.findIndex(o => o.id === id);
    if (index === -1) return false;
    
    mockOrders.splice(index, 1);
    return true;
  }
};

// Suppliers API
export const suppliersApi = {
  getAll: async (): Promise<Supplier[]> => {
    await delay(500);
    return [...mockSuppliers];
  },
  
  getById: async (id: string): Promise<Supplier | undefined> => {
    await delay(300);
    return mockSuppliers.find(supplier => supplier.id === id);
  },
  
  create: async (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>): Promise<Supplier> => {
    await delay(700);
    const newSupplier: Supplier = {
      ...supplier,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    mockSuppliers.push(newSupplier);
    return newSupplier;
  },
  
  update: async (id: string, supplier: Partial<Supplier>): Promise<Supplier | undefined> => {
    await delay(500);
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index === -1) return undefined;
    
    mockSuppliers[index] = {
      ...mockSuppliers[index],
      ...supplier,
      updatedAt: new Date().toISOString()
    };
    return mockSuppliers[index];
  },
  
  delete: async (id: string): Promise<boolean> => {
    await delay(500);
    const index = mockSuppliers.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    mockSuppliers.splice(index, 1);
    return true;
  }
};

// Dashboard API
export const dashboardApi = {
  getData: async (): Promise<DashboardData> => {
    await delay(800);
    return {
      ...mockDashboardData,
      totalItems: mockItems.length,
      lowStockItems: mockItems.filter(item => item.quantity <= item.reorderLevel).length,
      pendingOrders: mockOrders.filter(order => order.status === 'pending').length,
      completedOrders: mockOrders.filter(order => order.status === 'completed').length,
      recentOrders: mockOrders
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5),
      stockLevels: mockItems.map(item => ({
        itemName: item.name,
        quantity: item.quantity,
        reorderLevel: item.reorderLevel,
      })),
    };
  }
}; 