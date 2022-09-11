import React from 'react';

type Props = {
    title: string
    isActive?: boolean
}

const NavButton = ({title, isActive}: Props) => {
    return (
        <button className={`${isActive && 'bg-[#036756]'} text-white px-2 py-2 rounded hover:bg-[#036756] duration-150`}>
            {title}
        </button>
    );
};

export default NavButton;
