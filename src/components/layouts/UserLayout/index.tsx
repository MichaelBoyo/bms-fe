import { Navbar } from "@/components/Navbar";
import UserSidebar from "@/components/user/UserSidebar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <section className='flex'>
                <UserSidebar />
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

export default UserLayout;
