export const formatCurrency = (value: number | string) => {
    if (value <= 1) return value + "";
    return Boolean(value) ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
}