import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { FaUser, FaCalendarAlt, FaShieldAlt, FaEdit, FaKey, FaCog, FaBell, FaChartLine, FaUsers, FaCamera, FaLayerGroup, FaDollarSign, FaUserFriends } from 'react-icons/fa'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import coverImg from '../../../assets/bg1.jpeg'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../LoadingSpinner'

const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole()
  const [activeTab, setActiveTab] = useState('overview')
  const axiosSecure = useAxiosSecure()

  // Fetch role-specific data
  const { data: statsData, isLoading: statsLoading } = useQuery({
    queryKey: ['profile-stats', user?.email, role],
    queryFn: async () => {
      if (!user?.email || !role) return null
      
      switch (role) {
        case 'admin':
          { const adminRes = await axiosSecure.get('/admin-summary')
          return { type: 'admin', ...adminRes.data } }
        case 'manager':
          { const managerRes = await axiosSecure.get(`/manager-overview/${user.email}`)
          return { type: 'manager', ...managerRes.data } }
        case 'member':
          { const memberRes = await axiosSecure.get(`/member-overview/${user.email}`)
          return { type: 'member', ...memberRes.data } }
        default:
          return null
      }
    },
    enabled: !!user?.email && !!role && !isRoleLoading,
    staleTime: 5 * 60 * 1000,
  })

  if (isRoleLoading || statsLoading) return <LoadingSpinner />
  const getRoleBadgeColor = (userRole) => {
    switch (userRole) {
      case 'admin':
        return 'bg-red-500 text-white'
      case 'manager':
        return 'bg-blue-500 text-white'
      case 'member':
        return 'bg-green-500 text-white'
      default:
        return 'bg-gray-500 text-white'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getQuickStats = () => {
    if (!statsData) return []

    switch (statsData.type) {
      case 'admin':
        return [
          {
            label: 'Total Users',
            value: statsData.totalUsers || 0,
            icon: FaUsers,
            color: 'text-purple-600'
          },
          {
            label: 'Total Clubs',
            value: (statsData.clubsSummary?.approved || 0) + (statsData.clubsSummary?.pending || 0),
            icon: FaLayerGroup,
            color: 'text-blue-600'
          },
          {
            label: 'Total Events',
            value: statsData.totalEvents || 0,
            icon: FaCalendarAlt,
            color: 'text-green-600'
          },
          {
            label: 'Total Revenue',
            value: `$${statsData.totalPayments || 0}`,
            icon: FaDollarSign,
            color: 'text-yellow-600'
          }
        ]
      case 'manager':
        return [
          {
            label: 'Clubs Managed',
            value: statsData.numClubs || 0,
            icon: FaLayerGroup,
            color: 'text-purple-600'
          },
          {
            label: 'Total Members',
            value: statsData.totalMembers || 0,
            icon: FaUserFriends,
            color: 'text-blue-600'
          },
          {
            label: 'Events Created',
            value: statsData.totalEvents || 0,
            icon: FaCalendarAlt,
            color: 'text-green-600'
          },
          {
            label: 'Revenue Earned',
            value: `$${statsData.totalPayments || 0}`,
            icon: FaDollarSign,
            color: 'text-yellow-600'
          }
        ]
      case 'member':
        return [
          {
            label: 'Clubs Joined',
            value: statsData.totalClubsJoined || 0,
            icon: FaLayerGroup,
            color: 'text-purple-600'
          },
          {
            label: 'Events Registered',
            value: statsData.totalEventsRegistered || 0,
            icon: FaCalendarAlt,
            color: 'text-blue-600'
          },
          {
            label: 'Upcoming Events',
            value: statsData.upcomingEvents?.length || 0,
            icon: FaChartLine,
            color: 'text-green-600'
          },
          {
            label: 'Available Events',
            value: statsData.upcomingEvents?.length || 0,
            icon: FaUsers,
            color: 'text-yellow-600'
          }
        ]
      default:
        return []
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaUser },
    { id: 'settings', label: 'Settings', icon: FaCog },
    { id: 'activity', label: 'Activity', icon: FaChartLine },
  ]

  const quickStats = getQuickStats()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="relative h-48 md:h-64">
            <img
              src={coverImg}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            {/* Edit Cover Button */}
            <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors">
              <FaCamera className="w-4 h-4" />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-20">
              {/* Avatar */}
              <div className="relative mb-4 md:mb-0">
                <img
                  src={user?.photoURL || '/default-avatar.png'}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                  <FaCamera className="w-3 h-3" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors shadow-md">
                  <FaEdit className="w-4 h-4" />
                  Edit Profile
                </button>
                <button className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors shadow-md">
                  <FaKey className="w-4 h-4" />
                  Change Password
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="mt-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {user?.displayName || 'User Name'}
                  </h1>
                  <p className="text-gray-600 mb-3">{user?.email}</p>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(role)}`}>
                    <FaShieldAlt className="w-3 h-3" />
                    {role?.charAt(0).toUpperCase() + role?.slice(1)}
                  </span>
                </div>
                
                <div className="mt-4 md:mt-0 text-right">
                  <p className="text-sm text-gray-500">Member since</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(user?.metadata?.creationTime)}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 text-lg">
                Welcome to ClubSphere! We're excited to have you as part of our community.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaUser className="w-5 h-5 text-blue-500" />
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{user?.displayName || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium text-gray-900">{user?.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium text-gray-900">Not provided</p>
                    </div>
                  </div>
                </div>

                {/* Account Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaShieldAlt className="w-5 h-5 text-green-500" />
                    Account Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Account Type</p>
                      <p className="font-medium text-gray-900">{role?.charAt(0).toUpperCase() + role?.slice(1)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Account Status</p>
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Active
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Last Login</p>
                      <p className="font-medium text-gray-900">{formatDate(user?.metadata?.lastSignInTime)}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FaChartLine className="w-5 h-5 text-purple-500" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    {quickStats.map((stat, index) => {
                      const Icon = stat.icon
                      return (
                        <div key={index} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 ${stat.color}`} />
                            <span className="text-sm text-gray-500">{stat.label}</span>
                          </div>
                          <span className="font-semibold text-gray-900">{stat.value}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <FaBell className="w-5 h-5 text-yellow-500" />
                      Notification Preferences
                    </h4>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Email notifications</span>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Push notifications</span>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Event reminders</span>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </label>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                      <FaShieldAlt className="w-5 h-5 text-blue-500" />
                      Privacy Settings
                    </h4>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Profile visibility</span>
                        <select className="select select-bordered select-sm">
                          <option>Public</option>
                          <option>Members only</option>
                          <option>Private</option>
                        </select>
                      </label>
                      <label className="flex items-center justify-between">
                        <span className="text-gray-700">Show online status</span>
                        <input type="checkbox" className="toggle toggle-primary" defaultChecked />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'activity' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUsers className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">Joined ClubSphere</p>
                      <p className="text-sm text-gray-500">{formatDate(user?.metadata?.creationTime)}</p>
                    </div>
                  </div>
                  
                  <div className="text-center py-8 text-gray-500">
                    <FaChartLine className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No recent activity to show</p>
                    <p className="text-sm">Start joining clubs and attending events to see your activity here!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
