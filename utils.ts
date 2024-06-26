function formatDate(inputDateStr : any) {
    const inputDate = new Date(inputDateStr);

    if (isNaN(inputDate.getTime())) {
        return "Invalid Date";
    }

    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

const serverUrl = "https://world-sport-action-api.h1zqeel.com";

export { formatDate, serverUrl }