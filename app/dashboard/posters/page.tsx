import { PosterGenerator } from "@/components/posters/poster-generator";
import DashboardLayout from "@/components/admin/layout/dashboard-layout";
import { Separator } from "@radix-ui/react-dropdown-menu";

export default function PostersPage() {
  return (
    <DashboardLayout>
      <div className='space-y-6'>
        <h1 className='text-3xl font-bold'>Generador de Póster Científico</h1>
        <p className='text-muted-foreground'>
          Crea y previsualiza tu póster para el congreso en tiempo real.
        </p>
      </div>
      <Separator className='my-6' />
      <PosterGenerator />
    </DashboardLayout>
  );
}
