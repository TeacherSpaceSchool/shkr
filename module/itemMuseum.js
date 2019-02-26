const ItemMuseumKNMII = require('../models/itemMuseumKNMII');
const format = require('./const').stringifyDateTime ;

const getById = async (id) => {
    return await ItemMuseumKNMII.findOne({_id: id})
}

const getClient = async (skip) => {
    return await ItemMuseumKNMII
        .find()
        .sort('-updatedAt')
        .skip(parseInt(skip))
        .limit(30)
}

const getItemMuseumKNMII = async (search, sort, skip) => {
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
        count = await ItemMuseumKNMII.count();
        findResult = await ItemMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('image description name styleOrMaterial date price author updatedAt _id')
    } else {
        count = await ItemMuseumKNMII.count(
            {$or: [
                {description: {'$regex': search, '$options': 'i'}},
                {name: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
                {author: {'$regex': search, '$options': 'i'}}
            ]}
        );
        findResult = await ItemMuseumKNMII
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
        data.push([findResult[i].image, findResult[i].name, findResult[i].styleOrMaterial, findResult[i].description, findResult[i].date, findResult[i].author, findResult[i].price, format(findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addItemMuseumKNMII = async (object) => {
    try{
        let _object = new ItemMuseumKNMII(object);
        await ItemMuseumKNMII.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setItemMuseumKNMII = async (object, id) => {
    try{
        await ItemMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteItemMuseumKNMII = async (id) => {
    try{
        await ItemMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getClient = getClient;
module.exports.deleteItemMuseumKNMII = deleteItemMuseumKNMII;
module.exports.getItemMuseumKNMII = getItemMuseumKNMII;
module.exports.setItemMuseumKNMII = setItemMuseumKNMII;
module.exports.addItemMuseumKNMII = addItemMuseumKNMII;
module.exports.getById = getById;
