import { PaymentsManagement } from "@/components/payment/payments-management";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";

export default function PaymentsPage() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            Gestión de Pagos
          </h1>
          <p className='text-muted-foreground'>
            Supervisa todas las transacciones de las comunicaciones de los
            congresos.
          </p>
        </div>
        <PaymentsManagement />
      </div>
    </DashboardLayout>
  );
}
