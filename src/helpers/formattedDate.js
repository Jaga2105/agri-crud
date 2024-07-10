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
  let dayDate = "";
  if(day<10){
    dayDate=`0${day}`
  }else{
    dayDate=`${day}`
  }
console.log(typeof day)
  const month = date.getMonth();
  const year = date.getFullYear();

  const formattedDate = `${dayDate} ${months[month]} ${year}`;

  return formattedDate;
};
