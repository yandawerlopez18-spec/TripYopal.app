import AdminDashboard from "../components/dashboard/AdminDashboard";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-slate-900">Panel administrativo</h1>
        <p className="mt-2 text-slate-600">Vista de gestión para monitorear usuarios, eventos, lugares y rutas del proyecto.</p>
        <div className="mt-8">
          <AdminDashboard />
        </div>
      </div>
    </main>
  );
}
