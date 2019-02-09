const AuthorArtworkMuseumKNMII = require('../models/artwork/authorArtworkMuseumKNMII');
const format = require('date-format') ;

const getClient = async () => {
    return await AuthorArtworkMuseumKNMII.find();
}

const getAuthorArtworkMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'имя',
        'годы жизни',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='годы жизни'&&sort[1]=='descending')
        sort = '-yearsOfLife';
    else if(sort[0]=='годы жизни'&&sort[1]=='ascending')
        sort = 'yearsOfLife';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name_ru';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name_ru';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await AuthorArtworkMuseumKNMII.count();
        findResult = await AuthorArtworkMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('yearsOfLife name updatedAt _id');
    } else {
        count = await AuthorArtworkMuseumKNMII.count({
            $or: [
                {yearsOfLife: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}}
            ]
        });
        findResult = await AuthorArtworkMuseumKNMII
            .find({
                $or: [
                    {yearsOfLife: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('yearsOfLife name updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){

        data.push([findResult[i].name, findResult[i].yearsOfLife, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    console.log({data: data, count: count, row: row})
    return {data: data, count: count, row: row}
}

const addAuthorArtworkMuseumKNMII = async (object) => {
    try{
        let _object = new AuthorArtworkMuseumKNMII(object);
        await AuthorArtworkMuseumKNMII.create(_object);
    } catch(error) {
        console.log(error)
    }
}

const setAuthorArtworkMuseumKNMII = async (object, id) => {
    try{
        await AuthorArtworkMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.log(error)
    }
}

const deleteAuthorArtworkMuseumKNMII = async (id) => {
    try{
        await AuthorArtworkMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.log(error)
    }
}

const getIdsAuthorArtworkMuseumKNMII = async () => {
    try{
        return(await AuthorArtworkMuseumKNMII.find().select('_id name'));
    } catch(error) {
        console.log(error)
    }
}

module.exports.getClient = getClient;
module.exports.getIds = getIdsAuthorArtworkMuseumKNMII;
module.exports.deleteAuthorArtworkMuseumKNMII = deleteAuthorArtworkMuseumKNMII;
module.exports.getAuthorArtworkMuseumKNMII = getAuthorArtworkMuseumKNMII;
module.exports.setAuthorArtworkMuseumKNMII = setAuthorArtworkMuseumKNMII;
module.exports.addAuthorArtworkMuseumKNMII = addAuthorArtworkMuseumKNMII;