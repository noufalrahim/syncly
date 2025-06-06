import apiClient from "../apiClient";

export const deleteData = async (url: string): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        await apiClient.delete(url, {
            headers: {
                "x-auth-token": token,
                "Content-Type": "application/json",
            },
        });
        console.log("Data deleted successfully");
    } catch (error) {
        throw new Error(`An error occurred while deleting data: ${error}`);
    }
};