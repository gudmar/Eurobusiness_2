export const getDefaultName = () => {
    const date = new Date();
    const name = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getMilliseconds()}`
    return name;
}
