import { useEffect } from "react";

const usePreventNavigation = (isFormChanged) => {
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (isFormChanged) {
                const message =
                    "You have unsaved changes, are you sure you want to leave?";
                e.returnValue = message;
                return message;
            }
        };

        const handleNavigation = (e) => {
            if (isFormChanged) {
                const confirmationMessage =
                    "You have unsaved changes, are you sure you want to leave?";
                if (!window.confirm(confirmationMessage)) {
                    e.preventDefault();
                }
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handleNavigation);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handleNavigation);
        };
    }, [isFormChanged]);
};

export default usePreventNavigation;
