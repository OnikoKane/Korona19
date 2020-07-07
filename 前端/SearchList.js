function  SearchList(val,data){
    let oldList= data;
    let value=val;
    let items=[];
    for(let i=0;i<oldList["q"].length;i++){
        let temp = oldList["q"][i];
        if(temp.match(value)){
            items.push(oldList["q"][i]);
        }
    }
    //console.log(oldList["q"][0]);

    return items;
}

export default SearchList;

