const AuthorArtworkMuseumKNMII = require('../models/artwork/authorArtworkMuseumKNMII');
const format = require('date-format') ;

const getById = async (id) => {
    return await AuthorArtworkMuseumKNMII.findOne({_id: id})
}

const getClient = async () => {
    return await AuthorArtworkMuseumKNMII.find();
}

const getAuthorArtworkMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'фотография',
        'имя',
        'годы жизни',
        'биография',
        'өмүр баяны',
        'biography',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='фотография'&&sort[1]=='descending')
        sort = '-photos';
    else if(sort[0]=='фотография'&&sort[1]=='ascending')
        sort = 'photos';
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
    else if(sort[0]=='биография'&&sort[1]=='descending')
        sort = '-biography_ru';
    else if(sort[0]=='биография'&&sort[1]=='ascending')
        sort = 'biography_ru';
    else if(sort[0]=='өмүр баяны'&&sort[1]=='descending')
        sort = '-biography_kg';
    else if(sort[0]=='өмүр баяны'&&sort[1]=='ascending')
        sort = 'biography_kg';
    else if(sort[0]=='biography'&&sort[1]=='descending')
        sort = '-biography_eng';
    else if(sort[0]=='biography'&&sort[1]=='ascending')
        sort = 'biography_eng';
    if(search == ''){
        count = await AuthorArtworkMuseumKNMII.count();
        findResult = await AuthorArtworkMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos yearsOfLife biography_ru biography_kg biography_eng name updatedAt _id');
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
            .select('photos yearsOfLife biography_ru biography_kg biography_eng name updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].photos, findResult[i].name, findResult[i].yearsOfLife, findResult[i].biography_ru, findResult[i].biography_kg, findResult[i].biography_eng, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addAuthorArtworkMuseumKNMII = async (object) => {
    try{
        let _object = new AuthorArtworkMuseumKNMII(object);
        await AuthorArtworkMuseumKNMII.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setAuthorArtworkMuseumKNMII = async (object, id) => {
    try{
        await AuthorArtworkMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteAuthorArtworkMuseumKNMII = async (id) => {
    try{
        await AuthorArtworkMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
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
module.exports.getById = getById;