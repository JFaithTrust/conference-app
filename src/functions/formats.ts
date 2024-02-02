export const formatDate = (dateString: string, isCalendar: boolean) => {
    const year = dateString?.slice(0, 4);
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth();
  
    const months = [
      "Yanvar",
      "Fevral",
      "Mart",
      "Aprel",
      "May",
      "Iyun",
      "Iyul",
      "August",
      "Sentabr",
      "Octabr",
      "Noyabr",
      "Dekabr",
    ];
  
    const formattedDate = `${day} - ${months[month]}`;
    const formattedDateCalander = `${day < 10 ? `0${day}` : day}-${
      month < 10 ? `0${month}` : month
    }-${year}`;
  
    return isCalendar ? formattedDateCalander : formattedDate;
  };
  