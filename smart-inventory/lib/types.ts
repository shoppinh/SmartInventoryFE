// Item model
export interface Item {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
  reorderLevel: number;
  supplierId: string;
  createdAt: string;
  updatedAt: string;
}

// Order model
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  totalAmount: number;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  itemId: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

// Supplier model
export interface Supplier {
  id: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

// Dashboard data
export interface DashboardData {
  totalItems: number;
  lowStockItems: number;
  pendingOrders: number;
  completedOrders: number;
  recentOrders: Order[];
  salesByCategory: CategorySales[];
  stockLevels: StockLevel[];
}

export interface CategorySales {
  category: string;
  amount: number;
}

export interface StockLevel {
  itemName: string;
  quantity: number;
  reorderLevel: number;
} 