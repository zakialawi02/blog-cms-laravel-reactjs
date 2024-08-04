import { Children } from "react";

const Card = ({ children, className = "" }) => {
    return (
        <div
            className={`bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md ${className}`}
        >
            {children}
        </div>
    );
};

export default Card;
