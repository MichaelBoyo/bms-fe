import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdLocalOffer } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

type Link = {
    title: string;
    href: string;
    icon: React.ReactNode;
};

const _links: Link[] = [
    { title: 'Services', href: '/user/services', icon: <MdLocalOffer /> },
    { title: 'Bookings', href: '/user/bookings', icon: <FaUsers /> },
];

const UserSidebar = ({ links = _links }: { links?: Link[] }) => {
    const router = useRouter();

    const activeLink = (href: string): boolean => {
        const isActive: boolean =
            router.pathname === "/" && href === "/"
                ? true
                : router.pathname.includes(href) && href !== "/"
                    ? true
                    : false;
        return isActive;
    };

    return (
        <>
            <nav className='hidden xl:block w-[280px] fixed left-0 bg-black top-0 h-screen border-r border-base-200'>
                <ul className='pt-14 px-1 space-y-8'>
                    {links.map((link) => {
                        return (
                            <li key={link.title}>
                                <Link
                                    className={cn(
                                        "flex items-center py-3 text-[#8593AF] text-xl hover:bg-primary hover:bg-opacity-80 hover:text-white px-8 space-x-3 dropdown-menu-item-hover",
                                        {
                                            "text-white border-l-2 border-primary":
                                                activeLink(link.href),
                                        }
                                    )}
                                    href={link.href}>
                                    <span className=''>{link.icon}</span>
                                    <span className=''>{link.title}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <nav className='xl:hidden fixed bottom-0 z-50 left-0 right-0 bg-neutral'>
                <ul className='w-screen flex items-center justify-evenly px-2 lg:px-7'>
                    {_links.map((link) => {
                        return (
                            <li className='' key={link.title}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "w-full text-[#8593AF] p-2 sm:px-5 text-base flex flex-col items-center justify-center space-y-1",
                                        {
                                            "text-primary": activeLink(
                                                link.href
                                            ),
                                        }
                                    )}>
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

export default UserSidebar;
