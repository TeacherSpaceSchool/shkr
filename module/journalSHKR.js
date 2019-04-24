const JournalSHKR = require('../models/journalSHKR/journalSHKR');
const format = require('date-format') ;

const getClient = async () => {
    return await JournalSHKR.find();
}

const getJournalSHKR = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'журнал',
        'имя',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='журнал'&&sort[1]=='descending')
        sort = '-photos';
    else if(sort[0]=='журнал'&&sort[1]=='ascending')
        sort = 'photos';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name_ru';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name_ru';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == '') {
        count = await JournalSHKR.count();
        findResult = await JournalSHKR
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
    } else{
        count = await JournalSHKR.count({
            $or: [
                {name: {'$regex': search, '$options': 'i'}},
            ]
        });
        findResult = await JournalSHKR
            .find({
                $or: [
                    {name: {'$regex': search, '$options': 'i'}},
                ]
            })
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
    }
    for (let i=0; i<findResult.length; i++){
        let photos=findResult[i].photos.toString();
        while(photos.includes(',http://'))
            photos = photos.replace(',http://', '\nhttp://');
        data.push([photos, findResult[i].name, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addJournalSHKR = async (object) => {
    try{
        let _object = new JournalSHKR(object);
        await JournalSHKR.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setJournalSHKR = async (object, id) => {
    try{
        await JournalSHKR.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteJournalSHKR = async (id) => {
    try{
        await JournalSHKR.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.deleteJournalSHKR = deleteJournalSHKR;
module.exports.getJournalSHKR = getJournalSHKR;
module.exports.setJournalSHKR = setJournalSHKR;
module.exports.addJournalSHKR = addJournalSHKR;
module.exports.getClient = getClient;