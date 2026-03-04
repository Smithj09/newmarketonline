import { useState } from 'react';
import { Package, Users, DollarSign, TrendingUp, Plus, Edit, Trash2, Eye, X } from 'lucide-react';
import { Product } from '../types';

interface SellerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export function SellerDashboard({ isOpen, onClose, products, onAddProduct, onEditProduct, onDeleteProduct }: SellerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'analytics'>('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for dashboard
  const stats = {
    totalProducts: products.length,
    totalOrders: 124,
    totalRevenue: 2456.80,
    pendingOrders: 5,
    lowStockCount: products.filter(p => p.stock < 10).length,
    totalInventoryValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
  };

  // Filter products by search term
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Safe delete handler with confirmation
  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      onDeleteProduct(productId);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="relative min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="relative bg-white rounded-lg">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-pink-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6 text-pink-700" />
              </button>

              <div className="mb-8">
                <h1 className="text-3xl font-bold text-black">DorMark Seller Dashboard</h1>
                <p className="text-pink-600">Manage your store and track your sales</p>
              </div>

      {/* Navigation Tabs */}
      <div className="border-b border-black mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: DollarSign },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'dashboard' | 'products' | 'orders' | 'analytics')}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-black hover:border-pink-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Dashboard Stats */}
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Package className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-pink-600">Total Products</p>
                <p className="text-2xl font-bold text-black">{stats.totalProducts}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-lg">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-pink-600">Total Orders</p>
                <p className="text-2xl font-bold text-black">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-pink-600">Total Revenue</p>
                <p className="text-2xl font-bold text-black">${stats.totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
            <div className="flex items-center">
              <div className="p-3 bg-pink-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-pink-600">Pending Orders</p>
                <p className="text-2xl font-bold text-black">{stats.pendingOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-yellow-600">Low Stock Items</p>
                <p className="text-2xl font-bold text-black">{stats.lowStockCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-blue-600">Inventory Value</p>
                <p className="text-2xl font-bold text-black">${stats.totalInventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-black">Your Products</h2>
            <button 
              onClick={onAddProduct}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search products by name or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border-2 border-pink-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none"
            />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-black overflow-hidden">
            {filteredProducts.length === 0 ? (
              <div className="p-8 text-center">
                <Package className="w-12 h-12 text-pink-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {searchTerm ? 'No products found matching your search.' : 'No products added yet.'}
                </p>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-black">
                <thead className="bg-pink-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-pink-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-black">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-md object-cover" src={product.image_url} alt={product.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-black">{product.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{product.category}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">${product.price.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-black">{product.stock}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock > 10 
                            ? 'bg-pink-100 text-pink-800' 
                            : product.stock > 0 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-red-100 text-red-800'
                        }`}>
                          {product.stock > 10 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => onEditProduct(product)}
                            className="text-pink-600 hover:text-pink-900 p-1"
                            title="Edit product"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-black p-1" title="View details">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div>
          <h2 className="text-xl font-semibold text-black mb-6">Recent Orders</h2>
          <div className="bg-white rounded-xl shadow-sm border border-black overflow-hidden">
            <table className="min-w-full divide-y divide-black">
              <thead className="bg-pink-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-pink-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-pink-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-black">
                {[
                  { id: '#ORD-001', customer: 'John Doe', date: '2026-03-01', amount: 299.99, status: 'Completed' },
                  { id: '#ORD-002', customer: 'Jane Smith', date: '2026-02-28', amount: 149.99, status: 'Shipped' },
                  { id: '#ORD-003', customer: 'Robert Johnson', date: '2026-02-27', amount: 89.99, status: 'Processing' },
                  { id: '#ORD-004', customer: 'Emily Davis', date: '2026-02-26', amount: 199.99, status: 'Delivered' },
                  { id: '#ORD-005', customer: 'Michael Wilson', date: '2026-02-25', amount: 349.99, status: 'Pending' },
                ].map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-pink-600">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Completed' || order.status === 'Delivered' 
                          ? 'bg-pink-100 text-pink-800' 
                          : order.status === 'Shipped' 
                            ? 'bg-blue-100 text-blue-800' 
                            : order.status === 'Processing' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-pink-600 hover:text-pink-900">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div>
          <h2 className="text-xl font-semibold text-black mb-6">Sales Analytics</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
              <h3 className="text-lg font-medium text-black mb-4">Monthly Sales</h3>
              <div className="h-64 bg-pink-50 rounded-lg flex items-center justify-center">
                <p className="text-pink-600">Sales chart visualization</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-black">
              <h3 className="text-lg font-medium text-black mb-4">Top Selling Products</h3>
              <div className="h-64 bg-pink-50 rounded-lg flex items-center justify-center">
                <p className="text-pink-600">Top products chart</p>
              </div>
            </div>
          </div>
        </div>
      )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}