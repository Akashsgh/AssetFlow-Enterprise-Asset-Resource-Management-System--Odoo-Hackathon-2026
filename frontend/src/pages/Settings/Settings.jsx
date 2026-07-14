import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Bell, Shield, Palette, Globe, Save, Moon, Sun, 
  Check, Camera, Mail, Phone, Building2, Lock, Eye, EyeOff,
  Smartphone, Monitor, Key, AlertTriangle, ChevronRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { userService } from '../../services/userService';

const sections = [
  { id: 'profile', label: 'Profile', icon: User, desc: 'Your personal information' },
  { id: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alerts & updates' },
  { id: 'security', label: 'Security', icon: Shield, desc: 'Password & 2FA' },
  { id: 'appearance', label: 'Appearance', icon: Palette, desc: 'Theme & display' },
  { id: 'regional', label: 'Regional', icon: Globe, desc: 'Language & timezone' },
];

const ToggleSwitch = ({ enabled, onChange, label, desc }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-zinc-200 transition-all group">
    <div>
      <p className="font-semibold text-zinc-900 text-sm">{label}</p>
      {desc && <p className="text-xs text-zinc-500 mt-0.5">{desc}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-emerald-500' : 'bg-zinc-300'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
);

const InputField = ({ label, icon: Icon, type = 'text', value, onChange, placeholder, readOnly }) => (
  <div>
    <label className="block text-sm font-semibold text-zinc-700 mb-1.5">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all ${readOnly ? 'bg-zinc-50 text-zinc-500 cursor-not-allowed' : 'hover:border-zinc-300'}`}
      />
    </div>
  </div>
);

const Settings = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [profile, setProfile] = useState({
    name: '', email: '', phone: '', role: '', department: '', location: ''
  });

  const [notifSettings, setNotifSettings] = useState({
    emailAlerts: true, pushNotifications: true, maintenanceUpdates: true,
    bookingRequests: true, auditReminders: false, weeklyReport: true, criticalAlerts: true,
  });

  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [regional, setRegional] = useState({ language: 'English (US)', timezone: 'IST (UTC+5:30)', dateFormat: 'DD/MM/YYYY', currency: 'INR (₹)' });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user || !user._id) return;
        const res = await userService.getProfile(user._id);
        if (res.success) {
          const u = res.data;
          setProfile({
            name: u.name || '',
            email: u.email || '',
            phone: u.phone || '',
            role: u.role || '',
            department: u.department?.name || 'Unassigned',
            location: u.location || '',
          });
          if (u.notificationSettings) setNotifSettings(u.notificationSettings);
          if (u.preferences) {
            setRegional(u.preferences);
            setDarkMode(u.preferences.theme === 'dark');
          }
          setTwoFactor(u.twoFactorEnabled || false);
        }
      } catch (err) {
        toast.error('Failed to load user settings');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (activeSection === 'security' && passwords.current) {
        if (passwords.newPass !== passwords.confirm) {
          toast.error("New passwords don't match");
          setSaving(false);
          return;
        }
        await userService.changePassword({
          userId: user._id,
          currentPassword: passwords.current,
          newPassword: passwords.newPass
        });
        setPasswords({ current: '', newPass: '', confirm: '' });
      }

      if (activeSection === 'profile') {
        await userService.updateProfile({ userId: user._id, ...profile });
      } else {
        await userService.updateSettings({
          userId: user._id,
          preferences: { ...regional, theme: darkMode ? 'dark' : 'light' },
          notificationSettings: notifSettings,
          twoFactorEnabled: twoFactor
        });
      }
      
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Settings</h1>
        <p className="text-zinc-500 mt-1 font-medium">Manage your account preferences and system configuration.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="lg:w-60 flex-shrink-0 w-full">
          <nav className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-2 space-y-1">
            {sections.map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                className={`w-full flex items-center px-3 py-3 rounded-xl text-left transition-all group ${activeSection === id ? 'bg-zinc-900 text-white shadow-lg' : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900'}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transition-colors ${activeSection === id ? 'bg-white/10' : 'bg-zinc-100 group-hover:bg-zinc-200'}`}>
                  <Icon className={`w-4 h-4 ${activeSection === id ? 'text-white' : 'text-zinc-600'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">{label}</p>
                  <p className={`text-xs truncate ${activeSection === id ? 'text-zinc-400' : 'text-zinc-400'}`}>{desc}</p>
                </div>
                {activeSection === id && <ChevronRight className="w-4 h-4 text-zinc-400 flex-shrink-0" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden"
            >
              {activeSection === 'profile' && (
                <div>
                  <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
                    <h2 className="text-lg font-bold text-zinc-900">Profile Information</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Update your personal details and public profile.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="flex items-center gap-5 pb-6 border-b border-zinc-100">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-lg shadow-emerald-200">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-zinc-900 text-white rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors shadow-md">
                          <Camera className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div>
                        <p className="font-extrabold text-zinc-900 text-xl">{profile.name}</p>
                        <p className="text-zinc-500 text-sm font-medium">{profile.role} • {profile.department}</p>
                        <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                          Active
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField label="Full Name" icon={User} value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} placeholder="Your full name" />
                      <InputField label="Email Address" icon={Mail} value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} placeholder="name@company.com" />
                      <InputField label="Phone Number" icon={Phone} value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="+91 xxxxx xxxxx" />
                      <InputField label="Location" icon={Globe} value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} placeholder="City, Country" />
                      <InputField label="Job Role" icon={Building2} value={profile.role} readOnly />
                      <InputField label="Department" icon={Building2} value={profile.department} readOnly />
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'notifications' && (
                <div>
                  <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
                    <h2 className="text-lg font-bold text-zinc-900">Notification Preferences</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Choose what alerts and updates you receive.</p>
                  </div>
                  <div className="p-6 space-y-3">
                    <ToggleSwitch enabled={notifSettings.criticalAlerts} onChange={v => setNotifSettings({...notifSettings, criticalAlerts: v})} label="Critical Alerts" desc="Immediate notifications for high priority issues" />
                    <ToggleSwitch enabled={notifSettings.emailAlerts} onChange={v => setNotifSettings({...notifSettings, emailAlerts: v})} label="Email Notifications" desc="Receive alerts in your inbox" />
                    <ToggleSwitch enabled={notifSettings.pushNotifications} onChange={v => setNotifSettings({...notifSettings, pushNotifications: v})} label="Push Notifications" desc="Browser push notifications for real-time updates" />
                    <ToggleSwitch enabled={notifSettings.maintenanceUpdates} onChange={v => setNotifSettings({...notifSettings, maintenanceUpdates: v})} label="Maintenance Updates" desc="Track repair and maintenance ticket changes" />
                    <ToggleSwitch enabled={notifSettings.bookingRequests} onChange={v => setNotifSettings({...notifSettings, bookingRequests: v})} label="Booking Requests" desc="Alert when new asset booking is created" />
                    <ToggleSwitch enabled={notifSettings.auditReminders} onChange={v => setNotifSettings({...notifSettings, auditReminders: v})} label="Audit Reminders" desc="Reminders for upcoming scheduled audits" />
                    <ToggleSwitch enabled={notifSettings.weeklyReport} onChange={v => setNotifSettings({...notifSettings, weeklyReport: v})} label="Weekly Digest" desc="Summary of asset activity every Monday" />
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div>
                  <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
                    <h2 className="text-lg font-bold text-zinc-900">Security Settings</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Keep your account safe and secure.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Change Password</h3>
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-semibold text-zinc-700 mb-1.5">Current Password</label>
                          <div className="relative">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <input type={showPassword ? 'text' : 'password'} value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} placeholder="••••••••" className="w-full pl-10 pr-12 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600">
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <InputField label="New Password" icon={Key} type="password" value={passwords.newPass} onChange={e => setPasswords({...passwords, newPass: e.target.value})} placeholder="Min. 8 characters" />
                        <InputField label="Confirm New Password" icon={Key} type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} placeholder="Repeat new password" />
                      </div>
                    </div>

                    <div className="border-t border-zinc-100 pt-6 space-y-3">
                      <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider">Two-Factor Authentication</h3>
                      <ToggleSwitch enabled={twoFactor} onChange={setTwoFactor} label="Enable 2FA" desc="Add an extra layer of security to your account" />
                      {twoFactor && (
                        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start">
                          <Smartphone className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-emerald-900">Authenticator App Required</p>
                            <p className="text-xs text-emerald-700 mt-0.5">Scan the QR code with Google Authenticator or Authy to complete setup.</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-zinc-100 pt-6">
                      <div className="flex items-start p-4 bg-rose-50 border border-rose-100 rounded-xl">
                        <AlertTriangle className="w-5 h-5 text-rose-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-bold text-rose-900">Danger Zone</p>
                          <p className="text-xs text-rose-700 mt-0.5 mb-3">Deleting your account is irreversible and will remove all your data.</p>
                          <button className="text-xs font-bold text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">Delete Account</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'appearance' && (
                <div>
                  <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
                    <h2 className="text-lg font-bold text-zinc-900">Appearance</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Customize how AssetFlow looks for you.</p>
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider mb-4">Theme</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => setDarkMode(false)} className={`relative p-5 border-2 rounded-2xl flex flex-col items-center gap-4 transition-all ${!darkMode ? 'border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-100' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}>
                          {!darkMode && <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                          <div className="w-full h-20 bg-white border border-zinc-200 rounded-xl shadow-sm p-2 space-y-1.5">
                            <div className="h-3 bg-zinc-100 rounded w-1/2" />
                            <div className="h-2 bg-emerald-100 rounded w-3/4" />
                            <div className="h-2 bg-zinc-100 rounded w-2/3" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Sun className="w-4 h-4 text-amber-500" />
                            <span className="text-sm font-bold text-zinc-900">Light Mode</span>
                          </div>
                        </button>

                        <button onClick={() => setDarkMode(true)} className={`relative p-5 border-2 rounded-2xl flex flex-col items-center gap-4 transition-all ${darkMode ? 'border-emerald-500 bg-emerald-50/50 shadow-md shadow-emerald-100' : 'border-zinc-200 hover:border-zinc-300 bg-white'}`}>
                          {darkMode && <div className="absolute top-3 right-3 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>}
                          <div className="w-full h-20 bg-zinc-900 border border-zinc-700 rounded-xl shadow-sm p-2 space-y-1.5">
                            <div className="h-3 bg-zinc-700 rounded w-1/2" />
                            <div className="h-2 bg-emerald-900 rounded w-3/4" />
                            <div className="h-2 bg-zinc-700 rounded w-2/3" />
                          </div>
                          <div className="flex items-center gap-2">
                            <Moon className="w-4 h-4 text-zinc-500" />
                            <span className="text-sm font-bold text-zinc-900">Dark Mode</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    <div className="border-t border-zinc-100 pt-6">
                      <h3 className="text-sm font-bold text-zinc-700 uppercase tracking-wider mb-4">Display Density</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {['Compact', 'Default', 'Comfortable'].map((d, i) => (
                          <button key={d} className={`p-3 border-2 rounded-xl text-sm font-bold transition-all ${i === 1 ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-zinc-200 text-zinc-600 hover:border-zinc-300'}`}>
                            {d}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'regional' && (
                <div>
                  <div className="px-6 py-5 border-b border-zinc-100 bg-zinc-50/50">
                    <h2 className="text-lg font-bold text-zinc-900">Regional Settings</h2>
                    <p className="text-sm text-zinc-500 mt-0.5">Set your language, timezone, and formatting preferences.</p>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {[
                        { label: 'Language', key: 'language', options: ['English (US)', 'Hindi (हिंदी)', 'Spanish', 'French', 'German'] },
                        { label: 'Timezone', key: 'timezone', options: ['IST (UTC+5:30)', 'UTC', 'EST (UTC-5)', 'PST (UTC-8)', 'CET (UTC+1)'] },
                        { label: 'Date Format', key: 'dateFormat', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD', 'D MMM YYYY'] },
                        { label: 'Currency', key: 'currency', options: ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'] },
                      ].map(({ label, key, options }) => (
                        <div key={key}>
                          <label className="block text-sm font-semibold text-zinc-700 mb-1.5">{label}</label>
                          <select
                            value={regional[key]}
                            onChange={e => setRegional({...regional, [key]: e.target.value})}
                            className="w-full px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all hover:border-zinc-300 appearance-none"
                          >
                            {options.map(o => <option key={o}>{o}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="px-6 py-4 border-t border-zinc-100 bg-zinc-50/30 flex items-center justify-between">
                <p className="text-xs text-zinc-400 font-medium">Changes are saved to your account</p>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-emerald-200 transition-all active:scale-95 disabled:opacity-70"
                >
                  {saving ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />Saving...</>
                  ) : (
                    <><Save className="w-4 h-4 mr-2" />Save Changes</>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;
