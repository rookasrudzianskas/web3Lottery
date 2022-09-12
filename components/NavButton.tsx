import React from 'react';

type Props = {
    title: string
    isActive?: boolean
    onClick?: () => void
}

const NavButton = ({title, isActive, onClick}: Props) => {
    return (
        <button onClick={onClick} className={`${isActive && 'bg-[#036756]'} font-bold text-white px-2 py-2 rounded hover:bg-[#036756] duration-150`}>
            {title}
        </button>
    );
};

export default NavButton;
