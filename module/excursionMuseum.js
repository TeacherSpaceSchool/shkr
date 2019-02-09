const ExcursionMuseumKNMII = require('../models/excursion/excursionMuseumKNMII');
const format = require('date-format') ;

const getClient = async () => {
    let types = await ExcursionMuseumKNMII.find().distinct('type_ru');
    let data = []
    for (let i = 0; i<types.length; i++){
        data.push(await ExcursionMuseumKNMII.find({type_ru: types[i]}).select('name_ru name_kg name_eng type_ru type_kg type_eng'))
    }
    return data
}

const getExcursionMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'имя',
        'тип',
        'ысым',
        'түрү',
        'name',
        'type',
        'создан',
        '_id'
    ]
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='фотографии'&&sort[1]=='descending')
        sort = '-photos';
    else if(sort[0]=='фотографии'&&sort[1]=='ascending')
        sort = 'photos';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name_ru';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name_ru';
    else if(sort[0]=='ысым'&&sort[1]=='descending')
        sort = '-name_kg';
    else if(sort[0]=='ысым'&&sort[1]=='ascending')
        sort = 'name_kg';
    else if(sort[0]=='name'&&sort[1]=='descending')
        sort = '-name_eng';
    else if(sort[0]=='name'&&sort[1]=='ascending')
        sort = 'name_eng';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-type_ru';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'type_ru';
    else if(sort[0]=='түрү'&&sort[1]=='descending')
        sort = '-type_kg';
    else if(sort[0]=='түрү'&&sort[1]=='ascending')
        sort = 'type_kg';
    else if(sort[0]=='type'&&sort[1]=='descending')
        sort = '-type_eng';
    else if(sort[0]=='type'&&sort[1]=='ascending')
        sort = 'type_eng';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == '') {
        count = await ExcursionMuseumKNMII.count();
        findResult = await ExcursionMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('name_ru name_kg name_eng type_ru type_kg type_eng updatedAt _id');
    } else {
        count = await ExcursionMuseumKNMII.count({
            $or: [
                {name_ru: {'$regex': search, '$options': 'i'}},
                {type_ru: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
                {type_kg: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {type_eng: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await ExcursionMuseumKNMII.find({
            $or: [
                {name_ru: {'$regex': search, '$options': 'i'}},
                {type_ru: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
                {type_kg: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {type_eng: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('name_ru type_ru name_kg type_kg name_eng type_eng updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].name_ru, findResult[i].type_ru, findResult[i].name_kg, findResult[i].type_kg, findResult[i].name_eng, findResult[i].type_eng, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}

}

const addExcursionMuseumKNMII = async (object) => {
    try{
        let _object = new ExcursionMuseumKNMII(object);
        await ExcursionMuseumKNMII.create(_object);
    } catch(error) {
        console.log(error)
    }
}

const setExcursionMuseumKNMII = async (object, id) => {
    try{
        await ExcursionMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.log(error)
    }
}

const deleteExcursionMuseumKNMII = async (id) => {
    try{
        await ExcursionMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.log(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteExcursionMuseumKNMII = deleteExcursionMuseumKNMII;
module.exports.getExcursionMuseumKNMII = getExcursionMuseumKNMII;
module.exports.setExcursionMuseumKNMII = setExcursionMuseumKNMII;
module.exports.addExcursionMuseumKNMII = addExcursionMuseumKNMII;