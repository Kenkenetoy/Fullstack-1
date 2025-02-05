export default function PrimaryButton({
    as = 'button', // Default to <button>
    className = '',
    disabled,
    children,
    ...props
}) {
    const Tag = as; // Dynamically set the tag (e.g., 'button' or Link)

    return (
        <Tag
            {...props}
            className={
                `btn btn-primary w-full text-white ${
                    disabled && 'opacity-25'
                } ` + className
            }
            {...(as === 'button' && { disabled })} // Only pass 'disabled' if it's a <button>
        >
            {children}
        </Tag>
    );
}
