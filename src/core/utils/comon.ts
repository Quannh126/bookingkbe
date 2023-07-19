export const convertDateToString = (date: Date): string => {
    return (
        ("00" + date.getFullYear()).slice(-4) +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2)
    );
};
export function sortObject(obj: Record<string, any>): Record<string, any> {
    const sorted: Record<string, any> = {};
    const str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}
// const converMoneyToWords = (): String => {
//     let t = [
//         "không",
//         "một",
//         "hai",
//         "ba",
//         "bốn",
//         "năm",
//         "sáu",
//         "bảy",
//         "tám",
//         "chín",
//     ];
//     return "";
// };
