const AboutSHKR = require('../models/aboutSHKR/aboutSHKR');
const format = require('date-format') ;

const getClient = async () => {
    return await AboutSHKR.findOne();
}

const getAboutSHKR = async (search, sort, skip) => {
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
        count = await AboutSHKR.count();
        findResult = await AboutSHKR
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos biography_ru biography_kg biography_eng updatedAt _id');
    } else {
        count = await AboutSHKR.count({
            $or: [
                {biography_ru: {'$regex': search, '$options': 'i'}},
                {biography_eng: {'$regex': search, '$options': 'i'}},
                {biography_kg: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await AboutSHKR.find({
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

const addAboutSHKR = async (object) => {
    try{
        if(await AboutSHKR.count()==0){
            let _object = new AboutSHKR(object);
            await AboutSHKR.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setAboutSHKR = async (object, id) => {
    try{
        await AboutSHKR.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteAboutSHKR = async (id) => {
    try{
        await AboutSHKR.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteAboutSHKR = deleteAboutSHKR;
module.exports.getAboutSHKR = getAboutSHKR;
module.exports.setAboutSHKR = setAboutSHKR;
module.exports.addAboutSHKR = addAboutSHKR;