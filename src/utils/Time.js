function GetDate() {
    const currentDate = new Date();
    return `${String(currentDate.getDate()).padStart(2, '0')}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${currentDate.getFullYear()}`;
}

function GetTime() {
    const currentDate = new Date();
    return `${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`;;
}

function GetTimeDate() {
    return `${GetDate()}_${GetTime()}`;
}

function GetTimestamp() {
    return new Date().getTime();
}

module.exports = { GetDate, GetTime, GetTimeDate, GetTimestamp };