export const timeout = {
        slow: 30000,
        fast: 20000,
        start: (message, duration) => {
            setInterval(() => {
                throw new Error(message);
            }, duration)
        }
    };