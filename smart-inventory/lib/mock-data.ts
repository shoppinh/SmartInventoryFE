import { v4 as uuidv4 } from 'uuid';
import { 
  Item, 
  Order, 
  Supplier, 
  DashboardData
} from './types';

// Mock Items
export const items: Item[] = [
  {
    id: uuidv4(),
    name: 'Laptop',
    description: 'High-performance laptop for professionals',
    category: 'Electronics',
    price: 1299.99,
    quantity: 15,
    reorderLevel: 5,
    supplierId: '1',
    createdAt: new Date(2023, 1, 15).toISOString(),
    updatedAt: new Date(2023, 3, 20).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Smartphone',
    description: 'Latest model smartphone with advanced features',
    category: 'Electronics',
    price: 899.99,
    quantity: 25,
    reorderLevel: 10,
    supplierId: '1',
    createdAt: new Date(2023, 2, 10).toISOString(),
    updatedAt: new Date(2023, 4, 15).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Desk Chair',
    description: 'Ergonomic office chair for comfort',
    category: 'Furniture',
    price: 249.99,
    quantity: 8,
    reorderLevel: 3,
    supplierId: '2',
    createdAt: new Date(2023, 0, 5).toISOString(),
    updatedAt: new Date(2023, 2, 1).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Coffee Maker',
    description: 'Professional coffee machine for office use',
    category: 'Appliances',
    price: 129.99,
    quantity: 4,
    reorderLevel: 2,
    supplierId: '3',
    createdAt: new Date(2023, 3, 22).toISOString(),
    updatedAt: new Date(2023, 3, 22).toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse',
    category: 'Electronics',
    price: 49.99,
    quantity: 30,
    reorderLevel: 10,
    supplierId: '1',
    createdAt: new Date(2023, 4, 12).toISOString(),
    updatedAt: new Date(2023, 4, 12).toISOString(),
  },
];

// Mock Orders
export const orders: Order[] = [
  {
    id: uuidv4(),
    orderNumber: 'ORD-2023-001',
    customerId: '101',
    customerName: 'John Smith',
    status: 'completed',
    totalAmount: 2199.97,
    items: [
      {
        id: uuidv4(),
        orderId: '1',
        itemId: items[0].id,
        itemName: items[0].name,
        quantity: 1,
        unitPrice: items[0].price,
        totalPrice: items[0].price * 1,
      },
      {
        id: uuidv4(),
        orderId: '1',
        itemId: items[1].id,
        itemName: items[1].name,
        quantity: 1,
        unitPrice: items[1].price,
        totalPrice: items[1].price * 1,
      },
    ],
    createdAt: new Date(2023, 5, 10).toISOString(),
    updatedAt: new Date(2023, 5, 12).toISOString(),
  },
  {
    id: uuidv4(),
    orderNumber: 'ORD-2023-002',
    customerId: '102',
    customerName: 'Emily Johnson',
    status: 'pending',
    totalAmount: 249.99,
    items: [
      {
        id: uuidv4(),
        orderId: '2',
        itemId: items[2].id,
        itemName: items[2].name,
        quantity: 1,
        unitPrice: items[2].price,
        totalPrice: items[2].price * 1,
      },
    ],
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 5, 15).toISOString(),
  },
  {
    id: uuidv4(),
    orderNumber: 'ORD-2023-003',
    customerId: '103',
    customerName: 'Robert Brown',
    status: 'processing',
    totalAmount: 1429.97,
    items: [
      {
        id: uuidv4(),
        orderId: '3',
        itemId: items[0].id,
        itemName: items[0].name,
        quantity: 1,
        unitPrice: items[0].price,
        totalPrice: items[0].price * 1,
      },
      {
        id: uuidv4(),
        orderId: '3',
        itemId: items[3].id,
        itemName: items[3].name,
        quantity: 1,
        unitPrice: items[3].price,
        totalPrice: items[3].price * 1,
      },
    ],
    createdAt: new Date(2023, 5, 18).toISOString(),
    updatedAt: new Date(2023, 5, 18).toISOString(),
  },
];

// Mock Suppliers
export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechSource Inc.',
    contactName: 'David Wilson',
    email: 'david@techsource.com',
    phone: '(555) 123-4567',
    address: '123 Tech Blvd, San Francisco, CA',
    createdAt: new Date(2022, 10, 15).toISOString(),
    updatedAt: new Date(2023, 2, 10).toISOString(),
  },
  {
    id: '2',
    name: 'Office Comfort Solutions',
    contactName: 'Sarah Lee',
    email: 'sarah@officecomfort.com',
    phone: '(555) 987-6543',
    address: '456 Office Park, Chicago, IL',
    createdAt: new Date(2022, 9, 20).toISOString(),
    updatedAt: new Date(2023, 1, 5).toISOString(),
  },
  {
    id: '3',
    name: 'Kitchen Essentials',
    contactName: 'Michael Brown',
    email: 'michael@kitchenessentials.com',
    phone: '(555) 567-8901',
    address: '789 Culinary Lane, New York, NY',
    createdAt: new Date(2022, 11, 10).toISOString(),
    updatedAt: new Date(2023, 3, 15).toISOString(),
  },
];

// Mock Dashboard Data
export const dashboardData: DashboardData = {
  totalItems: items.length,
  lowStockItems: items.filter(item => item.quantity <= item.reorderLevel).length,
  pendingOrders: orders.filter(order => order.status === 'pending').length,
  completedOrders: orders.filter(order => order.status === 'completed').length,
  recentOrders: orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5),
  salesByCategory: [
    { category: 'Electronics', amount: 3000 },
    { category: 'Furniture', amount: 1500 },
    { category: 'Appliances', amount: 800 },
  ],
  stockLevels: items.map(item => ({
    itemName: item.name,
    quantity: item.quantity,
    reorderLevel: item.reorderLevel,
  })),
}; 