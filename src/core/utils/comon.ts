export const convertDateToString = (date: Date): string => {
    return (
        ("00" + date.getFullYear()).slice(-4) +
        "-" +
        ("00" + (date.getMonth() + 1)).slice(-2) +
        "-" +
        ("00" + date.getDate()).slice(-2)
    );
};

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
