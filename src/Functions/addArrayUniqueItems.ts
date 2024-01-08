const fillMapWithItems = (map: Map<unknown, boolean>, items: unknown[]) => {
    items.forEach((item: unknown) => map.set(item, true))
}

const getNotRepeatingItemsInOrder = (arr: unknown[], arrayOfItemsThatShouldNotBeUsed: unknown[] = []) => {
    const itemsThatOccuredSoFar = new Map();
    fillMapWithItems(itemsThatOccuredSoFar, arrayOfItemsThatShouldNotBeUsed);
    const result: unknown[] = arr.reduce((acc: unknown[], item: unknown) => {
        if (itemsThatOccuredSoFar.get(item)){
            return acc;
        } else {
            itemsThatOccuredSoFar.set(item, true);
            const nextAcc = [...acc, item];
            return nextAcc;
        }
    }, [])
    return result;
}

export const addUniqueArrayItems = (arrayTo: unknown[], arrayFrom: unknown[]) => {
    const itemsToAdd = getNotRepeatingItemsInOrder(arrayFrom, arrayTo);
    return [...arrayTo, ...itemsToAdd]
}