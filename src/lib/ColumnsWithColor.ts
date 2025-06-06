import { ColumnType } from "@/types";

export function ColumnsWithColorUtil (columns: ColumnType[] | undefined, colors: string[]): ColumnType[] | null{
    if(!columns){
        return null;
    }
    return columns.map((cl, index) => ({
        ...cl,
        color: colors[index]
    }))
};