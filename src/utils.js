export const formatDate = (str) => {
    const date = new Date(str)
    const dateStr = date.toString().slice(0, 10)
    return dateStr;
  };