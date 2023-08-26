import { Navbar } from "@/components/Navbar";
import BusinessSidebar from "@/components/business/BusinessSidebar";

const BusinessLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <section className='flex'>
                <BusinessSidebar />
                <section className='w-full xl:ml-[280px]'>
                    <Navbar />
                    <main className="w-full py-14 px-7 min-h-screen">
                        {children}
                    </main>
                </section>
            </section>
        </>
    );
};

export default BusinessLayout;
