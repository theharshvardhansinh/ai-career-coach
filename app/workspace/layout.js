import ResponsiveDrawer from "./components/sidebar";
export default function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <ResponsiveDrawer />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
}
