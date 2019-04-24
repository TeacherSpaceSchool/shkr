const ArtworkSHKR = require('../models/artwork/artworkSHKR');
const format = require('date-format') ;

const getById = async (id) => {
    return await ArtworkSHKR.findOne({_id: id}).select('year genre1 description_ru description_kg description_eng name_kg image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views').populate({path: 'genre', select: 'name_ru name_kg name_eng'}).populate({path: 'author', select: 'name yearsOfLife'})
}

const getStyleOrMaterial = async () => {
    return await ArtworkSHKR.find().distinct('genre1')
}

const view = async (id) => {
    while(id.includes('"'))
        id = id.replace('"', '')
    let data = await ArtworkSHKR
        .findOne({_id: id})
    if(data.views==undefined||data.views=='')
        data.views=0
    data = JSON.stringify(parseInt(data.views)+1)
    await ArtworkSHKR.findOneAndUpdate(
        {_id: id},
        {$set: {views: data}});
}

const getClient = async (search, sort, skip, genre) => {
    if(sort===''){
        return await ArtworkSHKR
            .find({genre: genre})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .select('year genre1 description_ru description_kg description_eng name_kg image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='styleOrMaterial'){
        return await ArtworkSHKR
            .find({genre: genre, genre1: search})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .select('year genre1 description_ru description_kg description_eng name_kg image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='author'){
        return await ArtworkSHKR
            .find({genre: genre, author: search})
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .select('year genre1 description_ru description_kg description_eng name_kg image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='date'){
          return await ArtworkSHKR
            .find({genre: genre, date: { '$regex': search, '$options': 'i' } })
            .sort('-updatedAt')
            .skip(parseInt(skip))
            .limit(30)
            .select('year genre1 description_ru description_kg description_eng name_kg image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    }
}

const getRandom = async (search, sort) => {
    if(sort==='')
        return await ArtworkSHKR.findRandom()
            .limit(4)
            .select('year genre1 description_ru description_kg description_eng image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    else if(sort==='author'){
        return await ArtworkSHKR.findRandom({author: search})
            .limit(4)
            .select('year genre1 description_ru description_kg description_eng image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    }
    else if(sort==='styleOrMaterial'){
        return await ArtworkSHKR.findRandom({$or: [{styleOrMaterial_ru: search}, {styleOrMaterial_kg: search}, {styleOrMaterial_eng: search}]})
            .limit(4)
            .select('year genre1 mage_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    }
    else if(sort==='date'){
        return await ArtworkSHKR.findRandom({date: {'$regex': search, '$options': 'i'}})
            .limit(4)
            .select('year genre1 description_ru description_kg description_eng image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else if(sort==='genre')
        return await ArtworkSHKR.findRandom({genre: search})
            .limit(4)
            .select('year genre1 description_ru description_kg description_eng image_whatermark image_whatermar_thumbnail name_ru styleOrMaterial_ru name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng date author genre views')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
}

const getArtworkSHKR = async (search, sort, skip) => {
    let findResult = [], data = [], count;
    const row = [
        'картина',
        'водяная марка',
        'имя',
        'материал/стиль',
        'описание',
        'ысым',
        'материалдык/стили',
        'баяндоо',
        'name',
        'material/style',
        'description',
        'размер',
        'период создания',
        'год исполнения',
        'просмотры',
        'автор',
        'тип',
        'жанр',
        'создан',
        '_id'
    ];
    if(sort == undefined||sort=='')
        sort = '-updatedAt';
    else if(sort[0]=='картина'&&sort[1]=='descending')
        sort = '-image';
    else if(sort[0]=='картина'&&sort[1]=='ascending')
        sort = 'image';
    else if(sort[0]=='водяная марка'&&sort[1]=='descending')
        sort = '-image_whatermark';
    else if(sort[0]=='водяная марка'&&sort[1]=='ascending')
        sort = 'image_whatermark';
    else if(sort[0]=='имя'&&sort[1]=='descending')
        sort = '-name_ru';
    else if(sort[0]=='имя'&&sort[1]=='ascending')
        sort = 'name_ru';
    else if(sort[0]=='материал/стиль'&&sort[1]=='descending')
        sort = '-styleOrMaterial_ru';
    else if(sort[0]=='материал/стиль'&&sort[1]=='ascending')
        sort = 'styleOrMaterial_ru';
    else if(sort[0]=='ысым'&&sort[1]=='descending')
        sort = '-name_kg';
    else if(sort[0]=='ысым'&&sort[1]=='ascending')
        sort = 'name_kg';
    else if(sort[0]=='материалдык/стили'&&sort[1]=='descending')
        sort = '-styleOrMaterial_kg';
    else if(sort[0]=='материалдык/стили'&&sort[1]=='ascending')
        sort = 'styleOrMaterial_kg';
    else if(sort[0]=='name'&&sort[1]=='descending')
        sort = '-name_eng';
    else if(sort[0]=='name'&&sort[1]=='ascending')
        sort = 'name_eng';
    else if(sort[0]=='biography'&&sort[1]=='descending')
        sort = '-styleOrMaterial_eng';
    else if(sort[0]=='biography'&&sort[1]=='ascending')
        sort = 'styleOrMaterial_eng';
    else if(sort[0]=='размер'&&sort[1]=='descending')
        sort = '-size';
    else if(sort[0]=='размер'&&sort[1]=='ascending')
        sort = 'size';
    else if(sort[0]=='просмотры'&&sort[1]=='ascending')
        sort = 'views';
    else if(sort[0]=='просмотры'&&sort[1]=='descending')
        sort = '-views';
    else if(sort[0]=='год исполнения'&&sort[1]=='ascending')
        sort = 'date';
    else if(sort[0]=='год исполнения'&&sort[1]=='descending')
        sort = '-date';
    else if(sort[0]=='тип'&&sort[1]=='ascending')
        sort = 'genre';
    else if(sort[0]=='тип'&&sort[1]=='descending')
        sort = '-genre';
    else if(sort[0]=='автор'&&sort[1]=='ascending')
        sort = '';
    else if(sort[0]=='автор'&&sort[1]=='descending')
        sort = '-';
    else if(sort[0]=='создан'&&sort[1]=='descending')
        sort = '-updatedAt';
    else if(sort[0]=='создан'&&sort[1]=='ascending')
        sort = 'updatedAt';
    if(search == ''){
        count = await ArtworkSHKR.count();
        findResult = await ArtworkSHKR
            .find()
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('year image genre1 image_whatermark name_ru styleOrMaterial_ru description_ru description_kg description_eng name_kg styleOrMaterial_kg name_eng styleOrMaterial_eng size date author genre preservation motion reproduced views updatedAt _id')
            .populate({path: 'genre', select: 'name_ru name_kg name_eng'})
            .populate({path: 'author', select: 'name yearsOfLife'})
    } else {
        count = await ArtworkSHKR.count(
            {$or: [
                {styleOrMaterial_ru: {'$regex': search, '$options': 'i'}},
                {styleOrMaterial_eng: {'$regex': search, '$options': 'i'}},
                {styleOrMaterial_kg: {'$regex': search, '$options': 'i'}},
                {name_ru: {'$regex': search, '$options': 'i'}},
                {name_eng: {'$regex': search, '$options': 'i'}},
                {name_kg: {'$regex': search, '$options': 'i'}},
                {preservation: {'$regex': search, '$options': 'i'}},
                {motion: {'$regex': search, '$options': 'i'}},
                {reproduced: {'$regex': search, '$options': 'i'}},
                {views: {'$regex': search, '$options': 'i'}}
            ]}
        );
        findResult = await ArtworkSHKR
            .find(
                {$or: [
                    {styleOrMaterial_ru: {'$regex': search, '$options': 'i'}},
                    {styleOrMaterial_eng: {'$regex': search, '$options': 'i'}},
                    {styleOrMaterial_kg: {'$regex': search, '$options': 'i'}},
                    {name_ru: {'$regex': search, '$options': 'i'}},
                    {name_eng: {'$regex': search, '$options': 'i'}},
                    {name_kg: {'$regex': search, '$options': 'i'}},
                    {preservation: {'$regex': search, '$options': 'i'}},
                    {motion: {'$regex': search, '$options': 'i'}},
                    {reproduced: {'$regex': search, '$options': 'i'}},
                    {views: {'$regex': search, '$options': 'i'}}
                ]}
            )
            .sort(sort)
            .skip(parseInt(skip))
            .limit(10)
            .select('year image image_whatermark genre1 name_ru styleOrMaterial_ru name_kg description_ru description_kg description_eng styleOrMaterial_kg name_eng styleOrMaterial_eng size date author genre preservation motion reproduced views updatedAt _id')
            .populate({
                path: 'genre',
                select: 'name_ru',
                match: {name_ru: {'$regex': search, '$options': 'i'}}
            }).populate({
                path: 'author',
                select: 'name',
                match: {name_ru: {'$regex': search, '$options': 'i'}}
            });
    }
    for (let i=0; i<findResult.length; i++){
        let genre1 = ''
        if(findResult[i].genre1 != undefined)
            genre1 = findResult[i].genre1
        let author = ''
        if(findResult[i].author != undefined)
            author = findResult[i].author.name+'\n'+findResult[i].author._id
        let genre = ''
        if(findResult[i].genre != undefined)
            genre = findResult[i].genre.name_ru+'\n'+findResult[i].genre._id
        let year = ''
        if(findResult[i].year != undefined)
            year = findResult[i].year
        data.push([findResult[i].image, findResult[i].image_whatermark, findResult[i].name_ru, findResult[i].styleOrMaterial_ru, findResult[i].description_ru, findResult[i].name_kg, findResult[i].styleOrMaterial_kg, findResult[i].description_kg, findResult[i].name_eng, findResult[i].styleOrMaterial_eng, findResult[i].description_eng, findResult[i].size, findResult[i].date, year, findResult[i].views, author, genre, genre1, format.asString('yyyy.dd.MM hh:mm', findResult[i].updatedAt), findResult[i]._id]);
    }
    return {data: data, count: count, row: row}
}

const addArtworkSHKR = async (object) => {
    try{
        let _object = new ArtworkSHKR(object);
        await ArtworkSHKR.create(_object);
    } catch(error) {
        console.error(error)
    }
}

const setArtworkSHKR = async (object, id) => {
    try{
        await ArtworkSHKR.findOneAndUpdate({_id: id}, {$set: object});
    } catch(error) {
        console.error(error)
    }
}

const deleteArtworkSHKR = async (id) => {
    try{
        await ArtworkSHKR.deleteMany({_id: {$in: id}});
    } catch(error) {
        console.error(error)
    }
}

module.exports.getStyleOrMaterial = getStyleOrMaterial;
module.exports.view = view;
module.exports.getClient = getClient;
module.exports.getRandom = getRandom;
module.exports.deleteArtworkSHKR = deleteArtworkSHKR;
module.exports.getArtworkSHKR = getArtworkSHKR;
module.exports.setArtworkSHKR = setArtworkSHKR;
module.exports.addArtworkSHKR = addArtworkSHKR;
module.exports.getById = getById;
