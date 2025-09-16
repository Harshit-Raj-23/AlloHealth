const Card = ({
    title,
    subtitle,
    icon,
    footerText,
    onFooterClick,
    children,
}) => {
    return (
        <div className="bg-white border rounded-lg p-6 flex flex-col">
            <div className="text-xl font-semibold flex items-center mb-1">
                <span className="mr-2 text-blue-600">{icon}</span>
                {title}
            </div>
            <div className="text-sm text-gray-500 mb-4">{subtitle}</div>

            <ul className="flex flex-col gap-3 mb-4">{children}</ul>

            {footerText && (
                <button
                    onClick={onFooterClick}
                    className="cursor-pointer block w-full border mt-2 py-2 rounded-lg font-medium bg-white text-gray-700 hover:bg-blue-50 transition text-center"
                >
                    {footerText}
                </button>
            )}
        </div>
    );
};

export default Card;
