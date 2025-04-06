const key = "guardlight.auth.user";

export const getStoredUser = () => {
    return localStorage.getItem(key);
};

export const setStoredUser = (user: string | null) => {
    if (user) {
        localStorage.setItem(key, user);
    } else {
        localStorage.removeItem(key);
    }
};

export async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
