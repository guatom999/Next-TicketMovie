export const GetLocalTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Adjust month to 1-based index
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}