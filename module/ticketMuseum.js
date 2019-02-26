const TicketMuseumKNMII = require('../models/ticket/ticketMuseumKNMII');
const format = require('./const').stringifyDateTime ;

const getTicketMuseumKNMII = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'жанр',
        'тип',
        'жанр_kg',
        'түрү',
        'genre',
        'type',
        'цена',
        'создан',
        '_id'
    ]
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='жанр'&&sort[1]=='descending')
        sort = '-genre_ru';
    else if(sort[0]=='жанр'&&sort[1]=='ascending')
        sort = 'genre_ru';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-type_ru';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'type_ru';
    else if(sort[0]=='жанр_kg'&&sort[1]=='descending')
        sort = '-genre_kg';
    else if(sort[0]=='жанр_kg'&&sort[1]=='ascending')
        sort = 'genre_kg';
    else if(sort[0]=='түрү'&&sort[1]=='descending')
        sort = '-type_kg';
    else if(sort[0]=='түрү'&&sort[1]=='ascending')
        sort = 'type_kg';
    else if(sort[0]=='genre'&&sort[1]=='descending')
        sort = '-genre_eng';
    else if(sort[0]=='genre'&&sort[1]=='ascending')
        sort = 'genre_eng';
    else if(sort[0]=='type'&&sort[1]=='descending')
        sort = '-type_eng';
    else if(sort[0]=='type'&&sort[1]=='ascending')
        sort = 'type_eng';
    if(search == '') {
        count = await TicketMuseumKNMII.count();
        findResult = await TicketMuseumKNMII
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('genre_ru type_ru genre_kg type_kg genre_eng type_eng price updatedAt _id');
    } else {
        count = await TicketMuseumKNMII.count({
            $or: [
                {genre_ru: {'$regex': search, '$options': 'i'}},
                {type_ru: {'$regex': search, '$options': 'i'}},
                {genre_kg: {'$regex': search, '$options': 'i'}},
                {type_kg: {'$regex': search, '$options': 'i'}},
                {genre_eng: {'$regex': search, '$options': 'i'}},
                {type_eng: {'$regex': search, '$options': 'i'}},
                {price: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await TicketMuseumKNMII.find({
                $or: [
                    {genre_ru: {'$regex': search, '$options': 'i'}},
                    {type_ru: {'$regex': search, '$options': 'i'}},
                    {genre_kg: {'$regex': search, '$options': 'i'}},
                    {type_kg: {'$regex': search, '$options': 'i'}},
                    {genre_eng: {'$regex': search, '$options': 'i'}},
                    {type_eng: {'$regex': search, '$options': 'i'}},
                    {price: {'$regex': search, '$options': 'i'}},
                ]
            })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('genre_ru type_ru genre_kg type_kg genre_eng type_eng price updatedAt _id');
    }
    for (let i=0; i<findResult.length; i++){
        data.push([findResult[i].genre_ru, findResult[i].type_ru, findResult[i].genre_kg, findResult[i].type_kg, findResult[i].genre_eng, findResult[i].type_eng, findResult[i].price, format(findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addTicketMuseumKNMII = async (object) => {
    try{
        let _object = new TicketMuseumKNMII(object);
        await TicketMuseumKNMII.create(_object);
    } catch(error) {
        console.error(error)
        return true
    }
}

const setTicketMuseumKNMII = async (object, id) => {
    try{
        await TicketMuseumKNMII.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteTicketMuseumKNMII = async (id) => {
    try{
        await TicketMuseumKNMII.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteTicketMuseumKNMII = deleteTicketMuseumKNMII;
module.exports.getTicketMuseumKNMII = getTicketMuseumKNMII;
module.exports.setTicketMuseumKNMII = setTicketMuseumKNMII;
module.exports.addTicketMuseumKNMII = addTicketMuseumKNMII;