const VirtualMuseumKNMII = require('../models/virtualMuseum/virtualMuseumKNMII');
const format = require('date-format') ;

const getClient = async () => {
    return await VirtualMuseumKNMII.find();
}

const getVirtualMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'фотографии',
        'имя',
        'ысым',
        'name',
        'создан',
        '_id'
    ];
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
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == '') {
        count = await VirtualMuseumKNMII.count();
        findResult = await VirtualMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos name_ru name_kg name_eng updatedAt _id');
    } else{
        count = await VirtualMuseumKNMII.count({
            $or: [
                {name_ru: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await VirtualMuseumKNMII
            .find({
                $or: [
                    {name_ru: {'$regex': search, '$options': 'i'}},
                    {name_eng: {'$regex': search, '$options': 'i'}},
                    {name_kg: {'$regex': search, '$options': 'i'}},
                ]
            })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photos name_ru name_kg name_eng updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        let photos=findResult[i].photos.toString();
        while(photos.includes(',http://'))
            photos = photos.replace(',http://', '\nhttp://');
        data.push([photos, findResult[i].name_ru, findResult[i].name_kg, findResult[i].name_eng, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addVirtualMuseumKNMII = async (object) => {
    try{
        let _object = new VirtualMuseumKNMII(object);
        await VirtualMuseumKNMII.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setVirtualMuseumKNMII = async (object, id) => {
    try{
        await VirtualMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteVirtualMuseumKNMII = async (id) => {
    try{
        await VirtualMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteVirtualMuseumKNMII = deleteVirtualMuseumKNMII;
module.exports.getVirtualMuseumKNMII = getVirtualMuseumKNMII;
module.exports.setVirtualMuseumKNMII = setVirtualMuseumKNMII;
module.exports.addVirtualMuseumKNMII = addVirtualMuseumKNMII;
module.exports.getClient = getClient;