export default function DateChangerMessage(date){
    const today = ((new Date().getTime())/1000).toFixed(0);
    const resultMessageDate = date;
    const minutesBetween = (today/60)-(resultMessageDate/60);
    const hoursBetween = (today/3600)-(resultMessageDate/3600);
    const secondsBetween = (today-resultMessageDate);
    if (secondsBetween.toFixed(0) < 0){
        const fullDate = new Date(Number(resultMessageDate)*1000);
        return `${fullDate.getDate()}/${fullDate.getMonth()}/${fullDate.getFullYear()}`;
    }
    else if (secondsBetween.toFixed(0) <= 15){
        return "À l'instant";
    }
    else if (minutesBetween.toFixed(1) < 1){
        return `Il y a moins d'une minute`;
    }
    else if (minutesBetween.toFixed(0) < 60){
        return `Il y a ${minutesBetween.toFixed(0)} min`;
    }
    else if (hoursBetween.toFixed(0) < 24){
        return `Il y a ${hoursBetween.toFixed(0)}h`;
    }
    else{
        const fullDate = new Date(Number(resultMessageDate)*1000);
        return `${fullDate.getDate()}/${fullDate.getMonth()+1}/${fullDate.getFullYear()}`;
    }
}