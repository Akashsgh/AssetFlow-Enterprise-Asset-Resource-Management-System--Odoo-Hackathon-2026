import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

function DashboardLayout({ children }) {
  return (
    <div>
      <Navbar />
      <Sidebar />
      {children}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
