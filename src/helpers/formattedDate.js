export const formattedDate = (dateObj) => {
    const date= dateObj['$d'];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${day} ${months[month]} ${year}`;

  return formattedDate;
};
