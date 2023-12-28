export const doForEachItemInTheList = (list: unknown[], callback: (item: any) => void, index: number = 0) => {
    if (index >= list.length) return true;
    callback(list[index]);
    doForEachItemInTheList(list, callback, index + 1);
}