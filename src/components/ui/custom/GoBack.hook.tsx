import { useRouter } from "@tanstack/react-router";

export default function useGoBack() {
    const router = useRouter();

    const back = () => {
        if (window.history.length > 1) {
            router.history.back(); // Go back in browser history
        } else {
            router.navigate({ to: "/", replace: true }); // Fallback for direct visits
        }
    };

    return { back };
}
