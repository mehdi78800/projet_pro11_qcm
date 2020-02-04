
export default class Question {

    insertLocal(key, value){
        localStorage.setItem(key , JSON.stringify(value));
    }

    getLocal(key){
        console.log(localStorage.getItem(key));
    }

    getAllLocal(){
        var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            values.push({"clé": keys[i], "valeur": localStorage.getItem(keys[i])});
        }

        return values;
    }

    removeLocal(key){
        localStorage.removeItem(key);
    }

    clearLocal(){
        localStorage.clear();
    }

    keyGenerate(){
        return (new Date().getTime() + Math.floor((Math.random()*10000)+1)).toString(16);
    }
}
