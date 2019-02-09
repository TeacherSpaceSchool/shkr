const GenreArtworkMuseumKNMII = require('../models/artwork/genreArtworkMuseumKNMII');
const format = require('date-format') ;

const getClient = async (search) => {
    if(search===''||search==='all')
        return await GenreArtworkMuseumKNMII.find();
    else
        return await GenreArtworkMuseumKNMII.findOne({_id: search});
}

const getGenreArtworkMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'фотографии',
        'имя',
        'описание',
        'ысым',
        'баяндоо',
        'name',
        'description',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='фотографии'&&sort[1]=='descending')
        sort = '-photo';
    else if(sort[0]=='фотографии'&&sort[1]=='ascending')
        sort = 'photo';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name_ru';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name_ru';
    else if(sort[0]=='описание'&&sort[1]=='descending')
        sort = '-description_ru';
    else if(sort[0]=='описание'&&sort[1]=='ascending')
        sort = 'description_ru';
    else if(sort[0]=='ысым'&&sort[1]=='descending')
        sort = '-name_kg';
    else if(sort[0]=='ысым'&&sort[1]=='ascending')
        sort = 'name_kg';
    else if(sort[0]=='баяндоо'&&sort[1]=='descending')
        sort = '-description_kg';
    else if(sort[0]=='баяндоо'&&sort[1]=='ascending')
        sort = 'description_kg';
    else if(sort[0]=='name'&&sort[1]=='descending')
        sort = '-name_eng';
    else if(sort[0]=='name'&&sort[1]=='ascending')
        sort = 'name_eng';
    else if(sort[0]=='description'&&sort[1]=='descending')
        sort = '-description_eng';
    else if(sort[0]=='description'&&sort[1]=='ascending')
        sort = 'description_eng';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await GenreArtworkMuseumKNMII.count();
        findResult = await GenreArtworkMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photo name_ru description_ru name_kg description_kg name_eng description_eng updatedAt _id');
    }
    else {
        count = await GenreArtworkMuseumKNMII.count({
            $or: [
                {description_ru: {'$regex': search, '$options': 'i'}},
                {description_eng: {'$regex': search, '$options': 'i'}},
                {description_kg: {'$regex': search, '$options': 'i'}},
                {name_ru: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await GenreArtworkMuseumKNMII.find({
            $or: [
                {description_ru: {'$regex': search, '$options': 'i'}},
                {description_eng: {'$regex': search, '$options': 'i'}},
                {description_kg: {'$regex': search, '$options': 'i'}},
                {name_ru: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photo name_ru description_ru name_kg description_kg name_eng description_eng updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].photo, findResult[i].name_ru, findResult[i].description_ru, findResult[i].name_kg, findResult[i].description_kg, findResult[i].name_eng, findResult[i].description_eng, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addGenreArtworkMuseumKNMII = async (object) => {
    try{
        let _object = new GenreArtworkMuseumKNMII(object);
        await GenreArtworkMuseumKNMII.create(_object);
    } catch(error) {
        console.log(error)
    }
}

const setGenreArtworkMuseumKNMII = async (object, id) => {
    try{
        await GenreArtworkMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.log(error)
    }
}

const deleteGenreArtworkMuseumKNMII = async (id) => {
    try{
        await GenreArtworkMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.log(error)
    }
}

const getIdsGenreArtworkMuseumKNMII = async () => {
    try{
        return(await GenreArtworkMuseumKNMII.find().select('_id name_ru'));
    } catch(error) {
        console.log(error)
    }
}

module.exports.getClient = getClient;
module.exports.getIds = getIdsGenreArtworkMuseumKNMII;
module.exports.deleteGenreArtworkMuseumKNMII = deleteGenreArtworkMuseumKNMII;
module.exports.getGenreArtworkMuseumKNMII = getGenreArtworkMuseumKNMII;
module.exports.setGenreArtworkMuseumKNMII = setGenreArtworkMuseumKNMII;
module.exports.addGenreArtworkMuseumKNMII = addGenreArtworkMuseumKNMII;