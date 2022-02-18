export const getKidsDisplayName = (name) => {
    var displayName = name.split(' ').map(word => word[0].toUpperCase()).join('');
    if (displayName.length == 1 && name.length >= 2) {
        displayName = name.substring(0,2).toUpperCase()
    } else if (displayName.length > 2) {
        displayName = displayName.substring(0, 2)
    }
    return displayName
}

export const getDateString = (date) => {
    return (('0'+date.getMonth()).slice(-2) 
            + '-' 
            + ('0'+date.getDate()).slice(-2) 
            + '-'
            + date.getFullYear()
            + ' (' 
            + ('0'+date.getHours()).slice(-2) 
            + ':' 
            + ('0'+date.getMinutes()).slice(-2))
            + ')'
}

export const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const isValidEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };