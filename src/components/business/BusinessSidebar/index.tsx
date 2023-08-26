// Import necessary modules and components
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdLocalOffer } from "react-icons/md";

// Define the Link type to represent the links in the sidebar
type Link = {
    title: string; // Link title displayed in the sidebar
    href: string; // URL path of the link
    icon: React.ReactNode; // Icon component for the link
};

// Define default links for the BusinessSidebar if not provided
const _links: Link[] = [
    { title: 'Services', href: '/business/services', icon: <MdLocalOffer /> },
];

// Define the BusinessSidebar component
const BusinessSidebar = ({ links = _links }: { links?: Link[] }) => {
    const router = useRouter();

    // Function to check if a link is currently active
    const activeLink = (href: string): boolean => {
        const isActive: boolean =
            router.pathname === "/" && href === "/" // Check if it's the home page
                ? true
                : router.pathname.includes(href) && href !== "/" // Check if the current path includes the link's path (excluding home page)
                    ? true
                    : false;
        return isActive;
    };

    return (
        <>
            {/* Desktop Sidebar */}
            <nav className='hidden xl:block w-[280px] fixed left-0 top-0 h-screen bg-black'>
                <ul className='pt-14 px-1 space-y-8'>
                    {links.map((link) => {
                        return (
                            <li key={link.title}>
                                <Link
                                    className={cn(
                                        // Conditional class names based on active link
                                        "flex items-center py-3 text-[#8593AF] text-xl hover:bg-primary hover:bg-opacity-80 hover:text-white px-8 space-x-3 dropdown-menu-item-hover",
                                        {
                                            "text-white border-l-2 border-primary":
                                                activeLink(link.href), // Highlight active link
                                        }
                                    )}
                                    href={link.href}
                                >
                                    <span className=''>{link.icon}</span>
                                    <span className=''>{link.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Mobile Sidebar */}
            <nav className='xl:hidden fixed bottom-0 z-50 left-0 right-0 bg-neutral'>
                <ul className='w-screen flex items-center justify-evenly px-2 lg:px-7'>
                    {_links.map((link) => {
                        return (
                            <li className='' key={link.title}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        // Conditional class names based on active link
                                        "w-full text-[#8593AF] p-2 sm:px-5 text-base flex flex-col items-center justify-center space-y-1",
                                        {
                                            "text-primary": activeLink(
                                                link.href
                                            ), // Highlight active link
                                        }
                                    )}
                                >
                                    <span className=''>{link.icon}</span>
                                    <span className=''>{link.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </>
    );
};

export default BusinessSidebar;