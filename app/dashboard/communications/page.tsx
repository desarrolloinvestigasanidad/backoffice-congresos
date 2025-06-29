import { CommunicationsManagement } from "@/components/communications/communications-management";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";

export default function CommunicationsPage() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Gestión de Comunicaciones
          </h1>
          <p className='text-muted-foreground'>
            Revisa, acepta o rechaza las comunicaciones enviadas por los
            usuarios.
          </p>
        </div>
        <CommunicationsManagement />
      </div>
    </DashboardLayout>
  );
}
