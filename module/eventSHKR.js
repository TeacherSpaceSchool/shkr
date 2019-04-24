const EventSHKR = require('../models/eventSHKR/eventSHKR');
const format = require('date-format') ;

const getById = async (id) => {
    return await EventSHKR.findOne({_id: id}).select('photos photos_thumbnail name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd')
}

const getType = async () => {
    return {ru: await EventSHKR.find().distinct('type_ru'), kg: await EventSHKR.find().distinct('type_kg'), eng: await EventSHKR.find().distinct('type_eng')}
}

const getClient = async (search, sort, skip) => {
    let today = new Date();
    if(sort===''){
        return await EventSHKR
            .find({dateEnd: {$gte: today}})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .sort('dateStart')
            .select('photos photos_thumbnail name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd')
    } else if(sort==='type'){
        return await EventSHKR
            .find({$and: [{dateEnd: {$gte: today}}, {$or: [{type_ru: search}, {type_kg: search}, {type_eng: search}]}]})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .sort('dateStart')
            .select('photos photos_thumbnail name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd')
    } else if(sort==='date'){
        search = new Date(search)
        return await EventSHKR
            .find({dateEnd: {$gte: search}})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .sort('dateStart')
            .select('photos photos_thumbnail name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd')
    }
}

const getRandom = async () => {
    let today = new Date();
    return await EventSHKR.findRandom({dateEnd: {$gte: today}})
        .limit(3)
        .select('photos photos_thumbnail name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd');
}

const getEventSHKR = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'фотографии',
        'дата начала',
        'дата окончания',
        'имя',
        'тип',
        'описание',
        'ысым',
        'түрү',
        'баяндоо',
        'name',
        'type',
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
    else if(sort[0]=='дата начала'&&sort[1]=='descending')
        sort = '-dateStart';
    else if(sort[0]=='дата начала'&&sort[1]=='ascending')
        sort = 'dateStart';
    else if(sort[0]=='дата окончания'&&sort[1]=='descending')
        sort = '-dateEnd';
    else if(sort[0]=='дата окончания'&&sort[1]=='ascending')
        sort = 'dateEnd';
    if(search == '') {
        count = await EventSHKR.count();
        findResult = await EventSHKR
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd updatedAt _id');
    } else {
        count = await EventSHKR.count({
            $or: [
                {name_ru: {'$regex': search, '$options': 'i'}},
                {type_ru: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
                {type_kg: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {type_eng: {'$regex': search, '$options': 'i'}},
                {description_eng: {'$regex': search, '$options': 'i'}},
                {description_ru: {'$regex': search, '$options': 'i'}},
                {description_kg: {'$regex': search, '$options': 'i'}},
                {dateStart: {'$regex': search, '$options': 'i'}},
                {dateEnd: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await EventSHKR
            .find({
                $or: [
                    {name_ru: {'$regex': search, '$options': 'i'}},
                    {type_ru: {'$regex': search, '$options': 'i'}},
                    {name_kg: {'$regex': search, '$options': 'i'}},
                    {type_kg: {'$regex': search, '$options': 'i'}},
                    {name_eng: {'$regex': search, '$options': 'i'}},
                    {type_eng: {'$regex': search, '$options': 'i'}},
                    {description_eng: {'$regex': search, '$options': 'i'}},
                    {description_ru: {'$regex': search, '$options': 'i'}},
                    {description_kg: {'$regex': search, '$options': 'i'}},
                    {dateStart: {'$regex': search, '$options': 'i'}},
                    {dateEnd: {'$regex': search, '$options': 'i'}},
                ]
            })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos name_ru name_kg name_eng type_ru type_kg type_eng dateStart description_eng description_ru description_kg dateEnd updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        let photos=findResult[i].photos.toString();
        while(photos.includes(',http://'))
            photos = photos.replace(',http://', '\nhttp://');
        data.push([photos, format.asString('yyyy.MM.dd hh:mm', findResult[i].dateStart), format.asString('yyyy.MM.dd hh:mm', findResult[i].dateEnd), findResult[i].name_ru, findResult[i].type_ru, findResult[i].description_ru, findResult[i].name_kg, findResult[i].type_kg, findResult[i].description_kg, findResult[i].name_eng, findResult[i].type_eng, findResult[i].description_eng, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addEventSHKR = async (object) => {
    try{
        let _object = new EventSHKR(object);
        await EventSHKR.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setEventSHKR = async (object, id) => {
    try{
        await EventSHKR.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteEventSHKR = async (id) => {
    try{
        await EventSHKR.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getById = getById;
module.exports.getClient = getClient;
module.exports.getType = getType;
module.exports.getRandom = getRandom;
module.exports.deleteEventSHKR = deleteEventSHKR;
module.exports.getEventSHKR = getEventSHKR;
module.exports.setEventSHKR = setEventSHKR;
module.exports.addEventSHKR = addEventSHKR;