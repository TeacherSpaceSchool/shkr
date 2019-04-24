const NameSHKR = require('../models/nameSHKR/nameSHKR');
const format = require('date-format') ;

const getNameSHKR = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'фотография',
        'имя',
        'ысым',
        'name',
        'адрес',
        'телефоны',
        'email',
        'url',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='фотография'&&sort[1]=='descending')
        sort = '-photo';
    else if(sort[0]=='фотография'&&sort[1]=='ascending')
        sort = 'photo';
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
    else if(sort[0]=='адрес'&&sort[1]=='descending')
        sort = '-adress';
    else if(sort[0]=='адрес'&&sort[1]=='ascending')
        sort = 'adress';
    else if(sort[0]=='телефоны'&&sort[1]=='descending')
        sort = '-phonenumber';
    else if(sort[0]=='телефоны'&&sort[1]=='ascending')
        sort = 'phonenumber';
    else if(sort[0]=='email'&&sort[1]=='descending')
        sort = '-email';
    else if(sort[0]=='email'&&sort[1]=='ascending')
        sort = 'email';
    else if(sort[0]=='url'&&sort[1]=='descending')
        sort = '-url';
    else if(sort[0]=='url'&&sort[1]=='ascending')
        sort = 'url';
    if(search == '') {
        count = await NameSHKR.count();
        findResult = await NameSHKR
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photo name_ru name_kg name_eng adress phonenumber email url updatedAt _id');
    } else{
        count = await NameSHKR.count({
            $or: [
                {name_ru: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
                {adress: {'$regex': search, '$options': 'i'}},
                {phonenumber: {'$regex': search, '$options': 'i'}},
                {email: {'$regex': search, '$options': 'i'}},
                {url: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await NameSHKR
            .find({
                $or: [
                    {name_ru: {'$regex': search, '$options': 'i'}},
                    {name_eng: {'$regex': search, '$options': 'i'}},
                    {name_kg: {'$regex': search, '$options': 'i'}},
                    {adress: {'$regex': search, '$options': 'i'}},
                    {phonenumber: {'$regex': search, '$options': 'i'}},
                    {email: {'$regex': search, '$options': 'i'}},
                    {url: {'$regex': search, '$options': 'i'}},
                ]
            })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('photo name_ru name_kg name_eng updatedAt _id adress phonenumber email url');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].photo, findResult[i].name_ru, findResult[i].name_kg, findResult[i].name_eng, findResult[i].adress, findResult[i].phonenumber, findResult[i].email, findResult[i].url, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const getClient = async () => {
    return {
        data: await NameSHKR.find().select('photo name_ru name_kg name_eng adress phonenumber email url')
    }
}

const addNameSHKR = async (object) => {
    try{
        if(await NameSHKR.count()==0){
            let _object = new NameSHKR(object);
            await NameSHKR.create(_object);
        }
    } catch(error) {
        console.error(error)
    }
}

const setNameSHKR = async (object, id) => {
    try{
        await NameSHKR.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteNameSHKR = async (id) => {
    try{
        await NameSHKR.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteNameSHKR = deleteNameSHKR;
module.exports.getNameSHKR = getNameSHKR;
module.exports.setNameSHKR = setNameSHKR;
module.exports.addNameSHKR = addNameSHKR;