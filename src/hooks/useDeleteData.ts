import { deleteData } from "@/api/services/deleteData";
import { useMutation } from "@tanstack/react-query";

type WithId = { id: string };

export const useDeleteData = <T extends WithId>(url: string) => {
    return useMutation<T, Error, T>({
        mutationFn: async (data) => {
            await deleteData(`${url}/${data.id}`);
            return data;
        },
    });
};