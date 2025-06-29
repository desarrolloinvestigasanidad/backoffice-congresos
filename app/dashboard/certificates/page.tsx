import DashboardLayout from "@/components/admin/layout/dashboard-layout";
// --- 1. IMPORTAMOS EL COMPONENTE PRINCIPAL DEL PANEL DE CERTIFICADOS ---
import CertificatesDashboard from "@/components/certificates/certificates-dashboard";

export default function CertificatesPage() {
  // Renombrado para mayor claridad
  return (
    <DashboardLayout>
      {/* El componente CertificatesDashboard ya tiene su propio título interno, 
        así que no necesitamos añadir uno aquí, pero lo dejamos por si quieres 
        un título general para la sección.
      */}
      <h1 className='text-3xl font-bold mb-6'>Gestión de Certificados</h1>

      {/* --- 2. RENDERIZAMOS EL PANEL COMPLETO --- */}
      <CertificatesDashboard />
    </DashboardLayout>
  );
}
