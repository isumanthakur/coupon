import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className='w-full'>
            {label && <label
                className='sr-only'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 bg-transparent outline-none border-b border-gray-500 w-full text-inherit placeholder:text-inherit ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
});

export default Input;
