import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, Globe, Save, Moon, Sun, Check } from 'lucide-react';
import toast from 'react-hot-toast';

const sections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'regional', label: 'Regional', icon: Globe },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true,
    maintenanceUpdates: true,
    bookingRequests: true,
    auditReminders: false,
    weeklyReport: true,
  });
  const [profile, setProfile] = useState({
    name: 'Sagar Mishra',
    email: 'sagar@assetflow.com',
    role: 'Frontend Developer',
    department: 'Engineering',
  });

  const handleSave = () => {
    toast.success('Settings saved successfully!');
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${enabled ? 'bg-emerald-500' : 'bg-zinc-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Settings</h1>
        <p className="text-zinc-500 mt-1">Manage your account preferences and system configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-56 flex-shrink-0">
          <nav className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-2 space-y-1">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeSection === id ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
              >
                <Icon className="w-4 h-4 mr-3" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6"
          >
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4">Profile Information</h2>
                <div className="flex items-center gap-5 pb-6 border-b border-zinc-100">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black">SM</div>
                  <div>
                    <p className="font-bold text-zinc-900 text-lg">{profile.name}</p>
                    <p className="text-zinc-500 text-sm">{profile.role}</p>
                    <button className="mt-2 text-sm font-semibold text-emerald-600 hover:underline">Change Avatar</button>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Full Name', key: 'name' },
                    { label: 'Email Address', key: 'email' },
                    { label: 'Job Role', key: 'role' },
                    { label: 'Department', key: 'department' },
                  ].map(({ label, key }) => (
                    <div key={key}>
                      <label className="block text-sm font-semibold text-zinc-700 mb-1.5">{label}</label>
                      <input
                        type="text"
                        value={profile[key]}
                        onChange={e => setProfile({ ...profile, [key]: e.target.value })}
                        className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive critical alerts via email' },
                    { key: 'maintenanceUpdates', label: 'Maintenance Updates', desc: 'Get notified when maintenance tickets are updated' },
                    { key: 'bookingRequests', label: 'Booking Requests', desc: 'Notify on new asset booking requests' },
                    { key: 'auditReminders', label: 'Audit Reminders', desc: 'Reminders for upcoming scheduled audits' },
                    { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive a weekly asset utilization digest' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-zinc-50 border border-zinc-100">
                      <div>
                        <p className="font-semibold text-zinc-900 text-sm">{label}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>
                      </div>
                      <ToggleSwitch
                        enabled={notifSettings[key]}
                        onChange={(val) => setNotifSettings({ ...notifSettings, [key]: val })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4">Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Confirm New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                  </div>
                  <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start">
                    <Shield className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-blue-800 font-medium">Two-factor authentication is currently disabled. Enable it to add an extra layer of security.</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4">Appearance</h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setDarkMode(false)}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${!darkMode ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                  >
                    <div className="w-14 h-10 bg-white border border-zinc-200 rounded-lg shadow-sm flex items-center justify-center">
                      <Sun className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900">Light Mode</span>
                      {!darkMode && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                  </button>
                  <button
                    onClick={() => setDarkMode(true)}
                    className={`p-4 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${darkMode ? 'border-emerald-500 bg-emerald-50' : 'border-zinc-200 hover:border-zinc-300'}`}
                  >
                    <div className="w-14 h-10 bg-zinc-900 border border-zinc-700 rounded-lg shadow-sm flex items-center justify-center">
                      <Moon className="w-5 h-5 text-zinc-300" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-zinc-900">Dark Mode</span>
                      {darkMode && <Check className="w-4 h-4 text-emerald-600" />}
                    </div>
                  </button>
                </div>
              </div>
            )}

            {activeSection === 'regional' && (
              <div className="space-y-6">
                <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-100 pb-4">Regional Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Language', options: ['English (US)', 'Hindi', 'Spanish', 'French'] },
                    { label: 'Timezone', options: ['IST (UTC+5:30)', 'UTC', 'EST (UTC-5)', 'PST (UTC-8)'] },
                    { label: 'Date Format', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
                    { label: 'Currency', options: ['USD ($)', 'INR (₹)', 'EUR (€)', 'GBP (£)'] },
                  ].map(({ label, options }) => (
                    <div key={label}>
                      <label className="block text-sm font-semibold text-zinc-700 mb-1.5">{label}</label>
                      <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all">
                        {options.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-zinc-100 flex justify-end">
              <button
                onClick={handleSave}
                className="flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
