function getCurrDate(){

    let today = new Date();
    var date = today.toLocaleString("default", {
      month: "long",
      day: "2-digit",
      year: "numeric",
    });

    return date;
}


module.exports={
    getCurrDate,
}