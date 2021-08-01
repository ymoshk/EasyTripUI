const formatDateToHours = (date) => {
    return new Intl.DateTimeFormat('he-IL', {
        hour: '2-digit',
        minute: '2-digit',
    }).format(date);
}

export default formatDateToHours;
