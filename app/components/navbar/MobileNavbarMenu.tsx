import { Dispatch, SetStateAction } from 'react';
import { NavbarItem } from './NavbarItem';
import { MdMenu, MdClose } from 'react-icons/md';

interface Props extends MobileNavBtnProps {
    items: { title: string; href: string; }[];
}

interface MobileNavBtnProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

// Helper function to handle scroll locking
function toggleBodyScroll(isOpen: boolean) {
    // The logic is inverted because the function is called before the state changes
    // When isOpen is false, we're about to open the menu
    if (!isOpen) {
        // Save current scroll position and lock body when opening
        const scrollY = window.scrollY;
        document.body.dataset.scrollPosition = scrollY.toString();
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';
    } else {
        // Restore scroll position when closing
        const scrollY = parseInt(document.body.dataset.scrollPosition || '0');
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('width');
        window.scrollTo(0, scrollY);
    }
}

export function MobileNavbarButton({ isOpen, setIsOpen }: MobileNavBtnProps) {
    function toggleNavbar() {
        toggleBodyScroll(isOpen);
        setIsOpen(!isOpen);
    }

    return (
        <div className="h-full flex md:hidden items-center">
            <MdMenu
                className="cursor-pointer h-6 w-6 text-white hover:text-[#29b5f6] transition-colors duration-300"
                onClick={toggleNavbar}
            />
        </div>
    )
}

export function MobileNavbar({ items, isOpen, setIsOpen }: Props) {
    function toggleNavbar() {
        toggleBodyScroll(isOpen);
        setIsOpen(!isOpen);
    }

    return (
        <div
            className={`fixed top-0 left-0 w-full h-dvh backdrop-blur-[12px] backdrop-saturate-[150%] bg-[rgba(20,20,20,0.7)] transition-opacity duration-250 ease-in-out p-8 border-t border-[rgba(255,255,255,0.05)] ${
                isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="flex justify-end">
                <button
                    className="bg-transparent border-0 cursor-pointer p-0 text-white hover:text-[#29b5f6] transition-colors duration-300"
                    onClick={toggleNavbar}
                    aria-label="Close menu"
                >
                    <MdClose className="h-6 w-6" />
                </button>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
                {items.map((item, index) => (
                    <NavbarItem
                        key={index}
                        title={item.title}
                        href={item.href}
                        isMobile={true}
                        onClick={toggleNavbar}
                    />
                ))}
            </div>
        </div>
    );
}