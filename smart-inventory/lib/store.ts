import { create } from 'zustand';
import { Item, Order, Supplier } from './types';
import { itemsApi, ordersApi, suppliersApi } from './api-client';

interface AppState {
  // Items state
  items: Item[];
  loading: {
    items: boolean;
    orders: boolean;
    suppliers: boolean;
  };
  error: {
    items: string | null;
    orders: string | null;
    suppliers: string | null;
  };
  fetchItems: () => Promise<void>;
  createItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Item>;
  updateItem: (id: string, item: Partial<Item>) => Promise<Item | undefined>;
  deleteItem: (id: string) => Promise<boolean>;
  
  // Orders state
  orders: Order[];
  fetchOrders: () => Promise<void>;
  createOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  updateOrder: (id: string, order: Partial<Order>) => Promise<Order | undefined>;
  deleteOrder: (id: string) => Promise<boolean>;
  
  // Suppliers state
  suppliers: Supplier[];
  fetchSuppliers: () => Promise<void>;
  createSupplier: (supplier: Omit<Supplier, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Supplier>;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => Promise<Supplier | undefined>;
  deleteSupplier: (id: string) => Promise<boolean>;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  items: [],
  orders: [],
  suppliers: [],
  loading: {
    items: false,
    orders: false,
    suppliers: false,
  },
  error: {
    items: null,
    orders: null,
    suppliers: null,
  },
  
  // Items actions
  fetchItems: async () => {
    set(state => ({ loading: { ...state.loading, items: true }, error: { ...state.error, items: null } }));
    try {
      const items = await itemsApi.getAll();
      set({ items, loading: { ...get().loading, items: false } });
    } catch (error) {
      set({ 
        loading: { ...get().loading, items: false },
        error: { ...get().error, items: error instanceof Error ? error.message : 'Failed to fetch items' }
      });
    }
  },
  
  createItem: async (item) => {
    try {
      const newItem = await itemsApi.create(item);
      set(state => ({ items: [...state.items, newItem] }));
      return newItem;
    } catch (error) {
      set({ 
        error: { ...get().error, items: error instanceof Error ? error.message : 'Failed to create item' }
      });
      throw error;
    }
  },
  
  updateItem: async (id, item) => {
    try {
      const updatedItem = await itemsApi.update(id, item);
      if (updatedItem) {
        set(state => ({
          items: state.items.map(i => i.id === id ? updatedItem : i)
        }));
      }
      return updatedItem;
    } catch (error) {
      set({ 
        error: { ...get().error, items: error instanceof Error ? error.message : 'Failed to update item' }
      });
      throw error;
    }
  },
  
  deleteItem: async (id) => {
    try {
      const success = await itemsApi.delete(id);
      if (success) {
        set(state => ({
          items: state.items.filter(i => i.id !== id)
        }));
      }
      return success;
    } catch (error) {
      set({ 
        error: { ...get().error, items: error instanceof Error ? error.message : 'Failed to delete item' }
      });
      throw error;
    }
  },
  
  // Orders actions
  fetchOrders: async () => {
    set(state => ({ loading: { ...state.loading, orders: true }, error: { ...state.error, orders: null } }));
    try {
      const orders = await ordersApi.getAll();
      set({ orders, loading: { ...get().loading, orders: false } });
    } catch (error) {
      set({ 
        loading: { ...get().loading, orders: false },
        error: { ...get().error, orders: error instanceof Error ? error.message : 'Failed to fetch orders' }
      });
    }
  },
  
  createOrder: async (order) => {
    try {
      const newOrder = await ordersApi.create(order);
      set(state => ({ orders: [...state.orders, newOrder] }));
      return newOrder;
    } catch (error) {
      set({ 
        error: { ...get().error, orders: error instanceof Error ? error.message : 'Failed to create order' }
      });
      throw error;
    }
  },
  
  updateOrder: async (id, order) => {
    try {
      const updatedOrder = await ordersApi.update(id, order);
      if (updatedOrder) {
        set(state => ({
          orders: state.orders.map(o => o.id === id ? updatedOrder : o)
        }));
      }
      return updatedOrder;
    } catch (error) {
      set({ 
        error: { ...get().error, orders: error instanceof Error ? error.message : 'Failed to update order' }
      });
      throw error;
    }
  },
  
  deleteOrder: async (id) => {
    try {
      const success = await ordersApi.delete(id);
      if (success) {
        set(state => ({
          orders: state.orders.filter(o => o.id !== id)
        }));
      }
      return success;
    } catch (error) {
      set({ 
        error: { ...get().error, orders: error instanceof Error ? error.message : 'Failed to delete order' }
      });
      throw error;
    }
  },
  
  // Suppliers actions
  fetchSuppliers: async () => {
    set(state => ({ loading: { ...state.loading, suppliers: true }, error: { ...state.error, suppliers: null } }));
    try {
      const suppliers = await suppliersApi.getAll();
      set({ suppliers, loading: { ...get().loading, suppliers: false } });
    } catch (error) {
      set({ 
        loading: { ...get().loading, suppliers: false },
        error: { ...get().error, suppliers: error instanceof Error ? error.message : 'Failed to fetch suppliers' }
      });
    }
  },
  
  createSupplier: async (supplier) => {
    try {
      const newSupplier = await suppliersApi.create(supplier);
      set(state => ({ suppliers: [...state.suppliers, newSupplier] }));
      return newSupplier;
    } catch (error) {
      set({ 
        error: { ...get().error, suppliers: error instanceof Error ? error.message : 'Failed to create supplier' }
      });
      throw error;
    }
  },
  
  updateSupplier: async (id, supplier) => {
    try {
      const updatedSupplier = await suppliersApi.update(id, supplier);
      if (updatedSupplier) {
        set(state => ({
          suppliers: state.suppliers.map(s => s.id === id ? updatedSupplier : s)
        }));
      }
      return updatedSupplier;
    } catch (error) {
      set({ 
        error: { ...get().error, suppliers: error instanceof Error ? error.message : 'Failed to update supplier' }
      });
      throw error;
    }
  },
  
  deleteSupplier: async (id) => {
    try {
      const success = await suppliersApi.delete(id);
      if (success) {
        set(state => ({
          suppliers: state.suppliers.filter(s => s.id !== id)
        }));
      }
      return success;
    } catch (error) {
      set({ 
        error: { ...get().error, suppliers: error instanceof Error ? error.message : 'Failed to delete supplier' }
      });
      throw error;
    }
  },
})); 