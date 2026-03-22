/* ============================================
   SUPABASE DATA LAYER FOR LET'S ORDER AGRI
   Replaces static mock data with live Supabase queries.
   ============================================ */

import { supabase } from '../lib/supabaseClient';

// =============================================
// CACHE for item types (rarely changes)
// =============================================
let _itemCache = null;

// =============================================
// ITEM TYPES
// =============================================
export async function fetchItemTypes() {
    if (_itemCache) return _itemCache;
    const { data } = await supabase.from('items').select('*').order('category');
    _itemCache = (data || []).map(c => ({
        id: c.id, name: c.name, icon: c.icon, unit: c.unit,
        avgPrice: Number(c.avg_price), category: c.category,
    }));
    return _itemCache;
}

// Sync fallback — returns cached or empty
export function getItemTypes() {
    return _itemCache || [];
}

// =============================================
// USERS
// =============================================
export async function fetchUsers(role) {
    let q = supabase.from('users').select('*').order('created_at', { ascending: false });
    if (role) q = q.eq('role', role);
    const { data } = await q;
    return (data || []).map(mapUser);
}

export async function fetchUserById(id) {
    const { data } = await supabase.from('users').select('*').eq('id', id).single();
    return data ? mapUser(data) : null;
}

export async function fetchUserByPhone(phone) {
    const { data } = await supabase.from('users').select('*').eq('phone', phone).single();
    return data ? mapUser(data) : null;
}

function mapUser(u) {
    const avatars = { seller: '🏬', buyer: '🏬', consumer: '🛒', admin: '👤' };
    return {
        id: u.id, name: u.name, role: u.role, phone: u.phone,
        location: u.location, avatar: avatars[u.role] || '👤',
        joinDate: u.created_at?.split('T')[0] || '', is_verified: u.is_verified,
    };
}

// =============================================
// LISTINGS
// =============================================
export async function fetchListings(sellerId) {
    let q = supabase.from('listings').select('*, item:items(*)').order('created_at', { ascending: false });
    if (sellerId) q = q.eq('seller_id', sellerId);
    const { data } = await q;
    return (data || []).map(mapListing);
}

export async function insertListing(listing) {
    const { data, error } = await supabase.from('listings').insert(listing).select('*, item:items(*)').single();
    if (error) throw error;
    return mapListing(data);
}

function mapListing(l) {
    return {
        id: l.id, sellerId: l.seller_id, item: l.item_id,
        itemInfo: l.item ? { id: l.item.id, name: l.item.name, icon: l.item.icon, unit: l.item.unit, avgPrice: Number(l.item.avg_price) } : null,
        quantity: Number(l.quantity), unit: l.unit,
        productDate: l.product_date, location: l.location,
        expectedPrice: l.expected_price ? Number(l.expected_price) : null,
        status: l.status, clusterId: l.cluster_id,
        createdAt: l.created_at?.split('T')[0] || '',
    };
}

// =============================================
// CLUSTERS
// =============================================
export async function fetchClusters() {
    const { data } = await supabase.from('clusters').select('*, item:items(*)').order('created_at', { ascending: false });
    return (data || []).map(mapCluster);
}

function mapCluster(c) {
    return {
        id: c.id, item: c.item_id,
        itemInfo: c.item ? { id: c.item.id, name: c.item.name, icon: c.item.icon, unit: c.item.unit, avgPrice: Number(c.item.avg_price) } : null,
        totalQuantity: Number(c.total_quantity), unit: c.unit || c.item?.unit || 'kg',
        avgPrice: c.avg_price ? Number(c.avg_price) : (c.item ? Number(c.item.avg_price) : 0),
        status: c.status, location: c.location || '',
        fulfillment: c.fulfillment || 0,
    };
}

// =============================================
// ORDERS
// =============================================
export async function fetchOrders(buyerId) {
    let q = supabase.from('orders').select('*, item:items(*), buyer:users!orders_buyer_id_fkey(name, phone, location)').order('created_at', { ascending: false });
    if (buyerId) q = q.eq('buyer_id', buyerId);
    const { data } = await q;
    return (data || []).map(mapOrder);
}

export async function insertOrder(order) {
    const { data, error } = await supabase.from('orders').insert(order).select().single();
    if (error) throw error;
    return data;
}

export async function updateOrderStatus(orderId, status) {
    const { error } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (error) throw error;
}

function mapOrder(o) {
    return {
        id: o.id, buyerId: o.buyer_id, clusterId: o.cluster_id, item: o.item_id,
        itemInfo: o.item ? { id: o.item.id, name: o.item.name, icon: o.item.icon, unit: o.item.unit } : null,
        buyerInfo: o.buyer || null,
        quantity: Number(o.quantity), unit: o.unit,
        totalPrice: Number(o.total_price), pricePerUnit: o.price_per_unit ? Number(o.price_per_unit) : null,
        status: o.status, orderDate: o.created_at?.split('T')[0] || '',
        deliveryDate: o.delivery_date || '', deliveryAddress: o.delivery_address || '',
        paymentStatus: o.payment_status || 'pending',
    };
}

// =============================================
// PAYMENTS
// =============================================
export async function fetchPayments(sellerId) {
    let q = supabase.from('payments').select('*').order('created_at', { ascending: false });
    if (sellerId) q = q.eq('seller_id', sellerId);
    const { data } = await q;
    return (data || []).map(mapPayment);
}

function mapPayment(p) {
    return {
        id: p.id, orderId: p.order_id, sellerId: p.seller_id,
        amount: Number(p.amount), method: p.method || 'UPI',
        status: p.status, date: p.created_at?.split('T')[0] || '',
        txnRef: p.transaction_ref || '',
    };
}

// =============================================
// PLATFORM STATS (computed from live data)
// =============================================
export async function fetchPlatformStats() {
    const [{ count: sellers }, { count: buyers }, { count: consumers }, { count: orders }, { count: clusters }] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'seller'),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'buyer'),
        supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'consumer'),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('clusters').select('*', { count: 'exact', head: true }),
    ]);
    return {
        totalSellers: sellers || 0, totalBuyers: buyers || 0,
        totalConsumers: consumers || 0, totalTransactions: orders || 0,
        activeClusters: clusters || 0, itemsSupported: 16,
        totalRevenue: 0, avgPriceIncrease: 23,
    };
}

// =============================================
// CONSUMER PRODUCE CATALOG
// Uses listings + items to build a live catalog
// =============================================
export async function fetchProduceCatalog() {
    const items = await fetchItemTypes();
    return items.map(c => ({
        id: c.id, item: c.id, name: c.name, icon: c.icon,
        price: c.avgPrice, unit: c.unit, freshness: 'Farm fresh',
        farmOrigin: 'Kerala', available: true, rating: 4.5, reviews: 0,
    }));
}

// =============================================
// CONSUMER ORDERS (orders by consumer users)
// =============================================
export async function fetchConsumerOrders(consumerId) {
    const orders = await fetchOrders(consumerId);
    return orders.map(o => ({
        id: o.id, consumerId: o.buyerId,
        items: [{ item: o.item, qty: o.quantity, price: o.totalPrice }],
        total: o.totalPrice, status: o.status,
        orderDate: o.orderDate, deliveryDate: o.deliveryDate,
        address: o.deliveryAddress,
    }));
}

// =============================================
// INVOICES (from orders)
// =============================================
export async function fetchInvoices(buyerId) {
    const orders = await fetchOrders(buyerId);
    return orders.map(o => ({
        id: o.id, orderId: o.id, buyerId: o.buyerId,
        amount: o.totalPrice, status: o.paymentStatus,
        date: o.orderDate, dueDate: '',
    }));
}

// =============================================
// MONTHLY DATA (for charts — synthetic for now)
// =============================================
export const monthlyData = [
    { month: 'Sep', supply: 4200, demand: 3800, transactions: 180 },
    { month: 'Oct', supply: 5100, demand: 4600, transactions: 230 },
    { month: 'Nov', supply: 3900, demand: 4200, transactions: 195 },
    { month: 'Dec', supply: 6200, demand: 5800, transactions: 310 },
    { month: 'Jan', supply: 7500, demand: 6900, transactions: 385 },
    { month: 'Feb', supply: 8100, demand: 7200, transactions: 420 },
];

// =============================================
// HELPER FUNCTIONS (unchanged)
// =============================================
export function formatCurrency(amount) {
    return '₹' + Number(amount).toLocaleString('en-IN');
}

export function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function getItemInfo(itemId) {
    const items = getItemTypes();
    return items.find(c => c.id === itemId) || null;
}

// =============================================
// SYNC COMPAT HELPERS (for pages that need them)
// =============================================
export async function getUserById(id) {
    return fetchUserById(id);
}

export async function getListingsBySeller(sellerId) {
    return fetchListings(sellerId);
}

export async function getOrdersByBuyer(buyerId) {
    return fetchOrders(buyerId);
}

export async function getPaymentsBySeller(sellerId) {
    return fetchPayments(sellerId);
}

// Preload item cache on import
fetchItemTypes();
