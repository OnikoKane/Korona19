function  SearchList(val,data){
    let oldList= data;
    let value=val;
    let items=[];
    for(let i=0;i<oldList["w"].length;i++){
        let temp = oldList["w"][i];
        if(temp.match(value)){
            items.push(oldList["w"][i]);
        }
    }
    //console.log(oldList["w"][0]);

    return items;
}

export default SearchList;

