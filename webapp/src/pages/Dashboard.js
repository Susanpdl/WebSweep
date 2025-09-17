import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BarChart3, Globe, TrendingUp, Activity, Download, Search } from 'lucide-react';
import SweepDataModal from '../components/SweepDataModal';
import { SiGooglechrome, SiSafari } from 'react-icons/si';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { FiX } from 'react-icons/fi';

// Helper to format timestamp
function formatTime(ts) {
  if (!ts) return '';
  const date = new Date(ts);
  return date.toLocaleString();
}

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSweepModal, setShowSweepModal] = useState(false);
  const [showSweepPopup, setShowSweepPopup] = useState(false);
  const [showExtensionPopup, setShowExtensionPopup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // Fetch user_info from Firestore
    const fetchUserInfo = async () => {
      try {
        const userInfoRef = doc(db, 'user_info', currentUser.uid);
        const userInfoSnap = await getDoc(userInfoRef);
        console.log('userInfoSnap.exists:', userInfoSnap.exists());
        console.log('userInfoSnap.data:', userInfoSnap.data());
        if (userInfoSnap.exists()) {
          setUserData(userInfoSnap.data());
          // If domains is missing or empty, show popup
          if (!userInfoSnap.data().domains || userInfoSnap.data().domains.length === 0) {
            setShowExtensionPopup(true);
          } else {
            setShowExtensionPopup(false);
          }
        } else {
          setUserData(null);
          setShowExtensionPopup(true);
        }
        // Fetch user basic info from users collection
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserInfo(userDocSnap.data());
        } else {
          setUserInfo(null);
        }
      } catch (err) {
        console.error('Error fetching user_info:', err);
        setUserData(null);
        setShowExtensionPopup(true);
        setUserInfo(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, [currentUser, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Clean and sort data for Top Visits and Recent Activity
  const cleanedDomains = (userData?.domains || []).filter(
    d => d.domain && d.visitCount && d.lastVisitTime
  );
  const topVisits = [...cleanedDomains]
    .sort((a, b) => b.visitCount - a.visitCount);
  const recentActivity = [...cleanedDomains]
    .sort((a, b) => b.lastVisitTime - a.lastVisitTime);

  // Calculate Avg. Daily Visits
  let avgDailyVisits = 0;
  if (cleanedDomains.length > 1 && userData?.totalVisits) {
    const times = cleanedDomains.map(d => d.lastVisitTime);
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);
    // Calculate days between first and last visit (at least 1 day)
    const days = Math.max(1, Math.ceil((maxTime - minTime) / (1000 * 60 * 60 * 24)));
    avgDailyVisits = Math.round(userData.totalVisits / days);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.displayName || currentUser?.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <Globe className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-gray-900">{userData?.totalVisits}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Unique Domains</p>
                <p className="text-2xl font-bold text-gray-900">{userData?.uniqueDomains}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg. Daily Visits</p>
                <p className="text-2xl font-bold text-gray-900">{avgDailyVisits}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Visits */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Top Visits</h2>
            </div>
            <div className="p-6">
              {topVisits.length === 0 && (
                <div className="text-gray-500">No data available.</div>
              )}
              {topVisits.map((domain, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-sm font-semibold text-primary-600">
                      {index + 1}
                    </div>
                    <span className="ml-3 text-gray-900 font-medium">{domain.domain}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-gray-600 font-medium">{domain.visitCount} visits</span>
                    <span className="text-xs text-gray-400">Last: {formatTime(domain.lastVisitTime)}</span>
                    <button
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition-colors"
                      onClick={() => { setSelectedDomain(domain); setShowSweepPopup(true); }}
                    >
                      Sweep Data
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="p-6">
              {recentActivity.length === 0 && (
                <div className="text-gray-500">No recent activity.</div>
              )}
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <Activity className="h-4 w-4 text-gray-600" />
                    </div>
                    <span className="ml-3 text-gray-900 font-medium">{activity.domain}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-400">{formatTime(activity.lastVisitTime)}</span>
                    <span className="text-gray-600 font-medium">{activity.visitCount} visits</span>
                    <button
                      className="mt-2 px-3 py-1 bg-red-500 text-white rounded-full text-xs font-semibold hover:bg-red-600 transition-colors"
                      onClick={() => { setSelectedDomain(activity); setShowSweepPopup(true); }}
                    >
                      Sweep Data
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Extension Info */}
        <div className="mt-8 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Chrome Extension</h3>
              <p className="text-primary-100 mb-4">
                Install our Chrome extension to start tracking your browsing history automatically.
              </p>
              <div className="flex gap-3">
                <button className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Download Extension
                </button>
                <button 
                  onClick={() => setShowSweepModal(true)}
                  className="bg-secondary-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-secondary-600 transition-colors flex items-center"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Sweep Data
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <BarChart3 className="h-24 w-24 text-white opacity-20" />
            </div>
          </div>
        </div>

        {/* Sweep Data Modal */}
        <SweepDataModal
          isOpen={showSweepModal}
          onClose={() => setShowSweepModal(false)}
          userData={currentUser}
        />
      </div>
      {/* Extension Required Popup */}
      {showExtensionPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-scaleIn">
            {/* Close X */}
            <button onClick={() => setShowExtensionPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none">
              <FiX />
            </button>
            {/* Header Icon */}
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-4 mb-3 shadow-lg">
              <Download className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold mb-2 text-primary-700">Oops!</h2>
            <p className="mb-6 text-center text-gray-700 font-medium">You need to download the extension first to see your dashboard data.</p>
            <div className="flex space-x-8 mb-2">
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="bg-blue-100 rounded-full p-3 mb-1 transition-transform group-hover:scale-110 group-hover:bg-blue-200">
                  <SiGooglechrome size={48} className="text-blue-500" />
                </div>
                <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow hover:bg-blue-600 transition-colors">Get for Chrome</button>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="bg-gray-100 rounded-full p-3 mb-1 transition-transform group-hover:scale-110 group-hover:bg-gray-200">
                  <SiSafari size={48} className="text-gray-500" />
                </div>
                <button className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow hover:bg-gray-600 transition-colors">Get for Safari</button>
              </a>
            </div>
          </div>
          {/* Animations */}
          <style>{`
            .animate-fadeIn { animation: fadeIn 0.3s; }
            .animate-scaleIn { animation: scaleIn 0.3s; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
      {/* Sweep Data Popup */}
      {showSweepPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 animate-fadeIn">
          <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full flex flex-col items-center animate-scaleIn">
            <button onClick={() => setShowSweepPopup(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl focus:outline-none">
              <FiX />
            </button>
            <h2 className="text-xl font-bold mb-2 text-primary-700">Your Data</h2>
            <div className="w-full mb-4">
              <div className="mb-2"><span className="font-semibold">Domain:</span> {selectedDomain?.domain}</div>
              <div className="mb-2"><span className="font-semibold">Name:</span> {userInfo?.name || userInfo?.userName || '-'}</div>
              <div className="mb-2"><span className="font-semibold">Email:</span> {userInfo?.email || userInfo?.userEmail || '-'}</div>
              <div className="mb-2"><span className="font-semibold">Address:</span> {userInfo?.address ? `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.state} ${userInfo.address.zip}` : '-'}</div>
            </div>
            <button
              onClick={async () => {
                try {
                  // Send the exact data shown in the popup to n8n
                  const sweepPayload = {
                    name: userInfo?.name || userInfo?.userName || 'Unknown',
                    location: userInfo?.address ? `${userInfo.address.street}, ${userInfo.address.city}, ${userInfo.address.state} ${userInfo.address.zip}` : 'Unknown',
                    email: userInfo?.email || userInfo?.userEmail || 'Unknown',
                    target_company: selectedDomain?.domain || 'Unknown',
                    additional_context: `Account ID: ${currentUser?.uid || 'Unknown'}`
                  };

                  const response = await fetch('https://860ef85e140c.ngrok-free.app/webhook-test/data-sweep', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(sweepPayload)
                  });

                  if (!response.ok) {
                    console.error('n8n webhook returned error', response.status);
                    alert('Failed to send removal request. Please try again.');
                    return;
                  }

                  console.log('Removal request sent successfully to n8n');
                  alert('Removal request sent successfully!');
                  setShowSweepPopup(false);
                } catch (error) {
                  console.error('Failed to send removal request:', error);
                  alert('Failed to send removal request. Please try again.');
                }
              }}
              className="mt-2 px-6 py-2 bg-red-600 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition-colors"
            >
              Request removal
            </button>
          </div>
          <style>{`
            .animate-fadeIn { animation: fadeIn 0.3s; }
            .animate-scaleIn { animation: scaleIn 0.3s; }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 