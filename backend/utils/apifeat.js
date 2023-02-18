class Apifeat{
    constructor(query,strquery){
        this.query = query;
        this.strquery = strquery;
    }

    search(){
        const keyword = this.strquery.keyword ? {
            name:{
                $regex : this.strquery.keyword,
                $options: "i"
            }
        } : {}

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const query_copy = {...this.strquery};
        const toberemoved = ["keyword","page","limit"];

        toberemoved.forEach((ele)=>{
            delete query_copy.ele;
        })

        let string_query = JSON.stringify(query_copy);

        const price_filter = string_query.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>{
            `$${key}`
        })

        this.query = this.query.find(JSON.parse(price_filter));
        return this;
    }
    pagination(resultperpage){
        let pagenumber = Number(this.strquery.page);
         let skippages = resultperpage * (pagenumber - 1);
        this.query = this.query.limit(resultperpage).skip(skippages);

        return this;
    }
}
module.exports = Apifeat;