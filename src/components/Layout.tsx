import { Navbar } from './Navbar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="bg-neutral">
                {children}
            </div>
        </>
    );
};
