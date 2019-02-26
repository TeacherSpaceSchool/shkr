const AboutMuseumKNMII = require('../models/aboutMuseum/aboutMuseumKNMII');
const format = require('date-format') ;

const getClient = async () => {
    return await AboutMuseumKNMII.findOne();
}

const getAboutMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'фотографии',
        'биография',
        'өмүр баяны',
        'biography',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='фотографии'&&sort[1]=='descending')
        sort = '-photos';
    else if(sort[0]=='фотографии'&&sort[1]=='ascending')
        sort = 'photos';
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
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await AboutMuseumKNMII.count();
        findResult = await AboutMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos biography_ru biography_kg biography_eng updatedAt _id');
    } else {
        count = await AboutMuseumKNMII.count({
            $or: [
                {biography_ru: {'$regex': search, '$options': 'i'}},
                {biography_eng: {'$regex': search, '$options': 'i'}},
                {biography_kg: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await AboutMuseumKNMII.find({
            $or: [
                {biography_ru: {'$regex': search, '$options': 'i'}},
                {biography_eng: {'$regex': search, '$options': 'i'}},
                {biography_kg: {'$regex': search, '$options': 'i'}},
            ]
        })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos biography_ru biography_kg biography_eng updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        let photos=findResult[i].photos.toString();
        while(photos.includes(',http://'))
            photos = photos.replace(',http://', '\nhttp://');
        data.push([photos, findResult[i].biography_ru, findResult[i].biography_kg, findResult[i].biography_eng, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addAboutMuseumKNMII = async (object) => {
    try{
        if(await AboutMuseumKNMII.count()==0){
            let _object = new AboutMuseumKNMII(object);
            await AboutMuseumKNMII.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setAboutMuseumKNMII = async (object, id) => {
    try{
        await AboutMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteAboutMuseumKNMII = async (id) => {
    try{
        await AboutMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteAboutMuseumKNMII = deleteAboutMuseumKNMII;
module.exports.getAboutMuseumKNMII = getAboutMuseumKNMII;
module.exports.setAboutMuseumKNMII = setAboutMuseumKNMII;
module.exports.addAboutMuseumKNMII = addAboutMuseumKNMII;