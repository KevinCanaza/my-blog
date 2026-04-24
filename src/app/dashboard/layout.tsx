import Navbar from '@/components/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="max-w-4xl mx-auto px-8 py-12">
                {children}
            </main>
        </>
    );
}