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

        const handlePopState = (e) => {
            if (isFormChanged) {
                const confirmationMessage =
                    "You have unsaved changes, are you sure you want to leave?";
                if (!window.confirm(confirmationMessage)) {
                    history.pushState(null, "", window.location.href);
                    e.preventDefault();
                }
            }
        };

        // Menambahkan entry fiktif ke history stack
        history.pushState(null, "", window.location.href);

        window.addEventListener("beforeunload", handleBeforeUnload);
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            window.removeEventListener("popstate", handlePopState);
        };
    }, [isFormChanged]);
};

export default usePreventNavigation;
