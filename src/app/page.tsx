import Header from "@/components/Header";
import FaqBot from "@/components/dashboard/FaqBot";
import FileExpiryReminder from "@/components/dashboard/FileExpiryReminder";
import DailyQuote from "@/components/dashboard/DailyQuote";
import CleanupBot from "@/components/dashboard/CleanupBot";
import AppLauncher from "@/components/dashboard/AppLauncher";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="p-4 sm:p-6 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <FaqBot />
          </div>
          <div className="space-y-6">
            <DailyQuote />
            <FileExpiryReminder />
          </div>
          <div className="lg:col-span-3">
             <AppLauncher />
          </div>
          <div className="lg:col-span-3">
            <CleanupBot />
          </div>
        </div>
      </main>
    </div>
  );
}
