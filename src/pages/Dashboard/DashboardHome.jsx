import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { PiHandWaving, PiFiles, PiCurrencyDollar, PiCheckCircle, PiClock } from 'react-icons/pi';
import { FaUsers } from "react-icons/fa";
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const DashboardHome = () => {
    const { user } = useAuth();
    const { role } = useRole();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ['analytics', role, user?.email],
        enabled: !!role && !!user?.email,
        queryFn: async () => {
            let res;
            if (role === 'admin' || role === 'super-admin') {
                res = await axiosSecure.get('/analytics/admin-stats');
            } else if (role === 'moderator') {
                res = await axiosSecure.get('/analytics/moderator-stats');
            } else {
                res = await axiosSecure.get(`/analytics/student-stats/${user.email}`);
            }
            return res.data;
        }
    });

    if (isLoading) return <div className="flex justify-center p-10"><span className="loading loading-spinner loading-lg"></span></div>;

    const renderStats = () => {
        if (role === 'admin' || role === 'super-admin') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full">
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-secondary">
                            <FaUsers className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Users</div>
                        <div className="stat-value text-secondary">{stats.totalUsers || 0}</div>
                        <div className="stat-desc">Students, Mods & Admins</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-primary">
                            <PiFiles className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Scholarships</div>
                        <div className="stat-value text-primary">{stats.totalScholarships || 0}</div>
                        <div className="stat-desc">Available opportunities</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-accent">
                            <PiFiles className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Applications</div>
                        <div className="stat-value text-accent">{stats.totalApplications || 0}</div>
                        <div className="stat-desc">Across all scholarships</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-success">
                            <PiCurrencyDollar className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Fees</div>
                        <div className="stat-value text-success">${stats.totalFees || 0}</div>
                        <div className="stat-desc">Application revenue</div>
                    </div>
                </div>
            );
        } else if (role === 'moderator') {
            return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full">
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-warning">
                            <PiClock className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending</div>
                        <div className="stat-value text-warning">{stats.pending || 0}</div>
                        <div className="stat-desc">Applications to review</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-info">
                            <PiFiles className="text-3xl" />
                        </div>
                        <div className="stat-title">Processing</div>
                        <div className="stat-value text-info">{stats.processing || 0}</div>
                        <div className="stat-desc">Currently being reviewed</div>
                    </div>
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-success">
                            <PiCheckCircle className="text-3xl" />
                        </div>
                        <div className="stat-title">Completed</div>
                        <div className="stat-value text-success">{stats.completed || 0}</div>
                        <div className="stat-desc">Review process finished</div>
                    </div>
                </div>
            );
        } else {
            // Student
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 w-full">
                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-primary">
                            <PiFiles className="text-3xl" />
                        </div>
                        <div className="stat-title">Total Applied</div>
                        <div className="stat-value text-primary">{stats.totalApplied || 0}</div>
                        <div className="stat-desc">Scholarships</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-warning">
                            <PiClock className="text-3xl" />
                        </div>
                        <div className="stat-title">Pending</div>
                        <div className="stat-value text-warning">{stats.pending || 0}</div>
                        <div className="stat-desc">Awaiting Review</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-info">
                            <PiFiles className="text-3xl" />
                        </div>
                        <div className="stat-title">Processing</div>
                        <div className="stat-value text-info">{stats.processing || 0}</div>
                        <div className="stat-desc">Under Review</div>
                    </div>

                    <div className="stat bg-base-100 shadow rounded-box">
                        <div className="stat-figure text-success">
                            <PiCheckCircle className="text-3xl" />
                        </div>
                        <div className="stat-title">Approved/Completed</div>
                        <div className="stat-value text-success">{stats.completed || 0}</div>
                        <div className="stat-desc">Review Complete</div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className="p-4">
            <div className="hero min-h-[30vh] bg-base-200/30 rounded-box mb-8">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <div className="flex justify-center mb-6">
                            <PiHandWaving className="text-6xl text-primary animate-pulse" />
                        </div>
                        <h1 className="text-4xl font-bold gradient-text mb-2">
                            Welcome Back, {user?.displayName?.split(' ')[0]}!
                        </h1>
                        <p className="py-2 text-lg opacity-80">
                            Here's what's happening with your <span className="font-bold uppercase">{(role)?.split('-').join(' ')}</span> dashboard today.
                        </p>
                    </div>
                </div>
            </div>

            {renderStats()}
        </div>
    );
};

export default DashboardHome;
