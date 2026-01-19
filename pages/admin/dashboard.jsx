import React, { useState, useEffect } from 'react';
import Layout from '../../components/admin/Layout';
import { apiAdmin } from '../../utils/api';
import { Users, Gift, Scroll, Clock } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        wedding: 0,
        birthday: 0,
        metatah: 0,
        recentOrders: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiAdmin.getOrders();
                const { wedding, birthday, metatah } = response.data;

                // Combine all for recent list, add type for identification
                const allOrders = [
                    ...wedding.map(o => ({ ...o, type: 'Wedding', date: o.created_at })),
                    ...birthday.map(o => ({ ...o, type: 'Birthday', date: o.created_at })),
                    ...metatah.map(o => ({ ...o, type: 'Metatah', date: o.created_at }))
                ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5); // Get top 5 recent

                setStats({
                    wedding: wedding.length,
                    birthday: birthday.length,
                    metatah: metatah.length,
                    recentOrders: allOrders
                });
            } catch (error) {
                console.error('Failed to fetch dashboard data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const StatCard = ({ title, count, icon: Icon, color }) => (
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{count}</h3>
            </div>
            <div className={`p-4 rounded-full ${color}/10 text-${color}-600`}>
                <Icon className={`w-8 h-8 text-${color}-600`} />
            </div>
        </div>
    );

    return (
        <Layout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
                <p className="text-gray-600">Welcome back, Admin!</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard
                    title="Wedding Orders"
                    count={loading ? '-' : stats.wedding}
                    icon={Users}
                    color="pink"
                />
                <StatCard
                    title="Birthday Orders"
                    count={loading ? '-' : stats.birthday}
                    icon={Gift}
                    color="orange"
                />
                <StatCard
                    title="Metatah Orders"
                    count={loading ? '-' : stats.metatah}
                    icon={Scroll}
                    color="purple"
                />
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800 flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        Recent Orders
                    </h2>
                </div>

                {loading ? (
                    <div className="p-8 text-center text-gray-400">Loading activity...</div>
                ) : stats.recentOrders.length === 0 ? (
                    <div className="p-8 text-center text-gray-400">No orders found yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                                <tr>
                                    <th className="px-6 py-3">Order ID</th>
                                    <th className="px-6 py-3">Customer</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stats.recentOrders.map((order) => (
                                    <tr key={`${order.type}-${order.id}`} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                        <td className="px-6 py-4">{order.nama_pemesan}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.type === 'Wedding' ? 'bg-pink-100 text-pink-700' :
                                                    order.type === 'Metatah' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-orange-100 text-orange-700'
                                                }`}>
                                                {order.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(order.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                    order.status === 'processed' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {order.status || 'pending'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </Layout>
    );
}
