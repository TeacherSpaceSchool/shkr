const ItemSHKR = require('../models/itemSHKR');
const format = require('date-format') ;

const getById = async (id) => {
    return await ItemSHKR.findOne({_id: id})
}

const getClient = async (skip) => {
    return await ItemSHKR
        .find()
        .sort('-updatedAt')
        .skip(parseInt(skip))
        .limit(30)
}

const getItemSHKR = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'изображение',
        'имя',
        'материал/стиль',
        'описание',
        'год исполнения',
        'автор',
        'цена',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name';
    else if(sort[0]=='материал/стиль'&&sort[1]=='descending')
        sort = '-styleOrMaterial';
    else if(sort[0]=='материал/стиль'&&sort[1]=='ascending')
        sort = 'styleOrMaterial';
    else if(sort[0]=='год исполнения'&&sort[1]=='ascending')
        sort = 'date';
    else if(sort[0]=='год исполнения'&&sort[1]=='descending')
        sort = '-date';
    else if(sort[0]=='цена'&&sort[1]=='ascending')
        sort = 'price';
    else if(sort[0]=='цена'&&sort[1]=='descending')
        sort = '-price';
    else if(sort[0]=='автор'&&sort[1]=='ascending')
        sort = 'author';
    else if(sort[0]=='автор'&&sort[1]=='descending')
        sort = '-author';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await ItemSHKR.count();
        findResult = await ItemSHKR
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('image description name styleOrMaterial date price author updatedAt _id')
    } else {
        count = await ItemSHKR.count(
            {$or: [
                {description: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
                {author: {'$regex': search, '$options': 'i'}}
            ]}
        );
        findResult = await ItemSHKR
            .find(
                {$or: [
                    {description: {'$regex': search, '$options': 'i'}},
                    {name: {'$regex': search, '$options': 'i'}},
                    {price: {'$regex': search, '$options': 'i'}},
                    {author: {'$regex': search, '$options': 'i'}}
                ]}
            )
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('image description name styleOrMaterial date price author updatedAt _id')
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].image, findResult[i].name, findResult[i].styleOrMaterial, findResult[i].description, findResult[i].date, findResult[i].author, findResult[i].price, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addItemSHKR = async (object) => {
    try{
        let _object = new ItemSHKR(object);
        await ItemSHKR.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setItemSHKR = async (object, id) => {
    try{
        await ItemSHKR.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteItemSHKR = async (id) => {
    try{
        await ItemSHKR.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteItemSHKR = deleteItemSHKR;
module.exports.getItemSHKR = getItemSHKR;
module.exports.setItemSHKR = setItemSHKR;
module.exports.addItemSHKR = addItemSHKR;
module.exports.getById = getById;
