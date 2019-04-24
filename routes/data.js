const express = require('express');
const router = express.Router();
const passportEngine = require('../module/passport');
const AboutSHKR = require('../module/aboutSHKR');
const JournalSHKR = require('../module/journalSHKR');
const GenreArtworkSHKR = require('../module/genreArtworkSHKR');
const AuthorArtworkSHKR = require('../module/authorArtworkSHKR');
const EventSHKR = require('../module/eventSHKR');
const ArtworkSHKR = require('../module/artworkSHKR');
const NameSHKR = require('../module/nameSHKR');
const myConst = require('../module/const');
const ItemSHKR = require('../module/itemSHKR');
const randomstring = require('randomstring');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

router.post('/getIds', async (req, res) => {
    await passportEngine.verifydeuser(req, res, async ()=>{
        if(req.body.name == 'Произведение'){
            await res.send({GenreArtworkMuseum: await GenreArtworkSHKR.getIds(), AuthorArtworkMuseum: await AuthorArtworkSHKR.getIds()});
        }
    });
});

router.post('/getclient', async (req, res) => {
    if(req.body.name == 'Музей'){
        await res.send(await NameSHKR.getClient())
    } else if(req.body.name == 'ДругиеСобытия'){
        await res.send(await EventSHKR.getRandom())
    } else if(req.body.name == 'СтилиИлиМатериал'){
        await res.send(await ArtworkSHKR.getStyleOrMaterial())
    } else if(req.body.name == 'Авторы'){
        await res.send(await AuthorArtworkSHKR.getClient())
    } else if(req.body.name == 'О музее'){
        await res.send(await AboutSHKR.getClient())
    } else if(req.body.name == 'Журналы'){
        await res.send(await JournalSHKR.getClient())
    } else if(req.body.name == 'Просмотр'){
        await res.send(await ArtworkSHKR.view(req.body.data))
    } else if(req.body.name == 'ТипыСобытия'){
        await res.send(await EventSHKR.getType())
    } else if(req.body.name == 'Товары'){
        let data = JSON.parse(req.body.data)
        await res.send(await ItemSHKR.getClient(data.skip))
    } else if(req.body.name == 'События'){
        let data = JSON.parse(req.body.data)
        await res.send(await EventSHKR.getClient(data.search, data.sort, data.skip))
    } else if(req.body.name == 'Событие'){
        let data = JSON.parse(req.body.data)
        await res.send(await EventSHKR.getById(data.id))
    } else if(req.body.name == 'Произведение'){
        let data = JSON.parse(req.body.data)
        await res.send(await ArtworkSHKR.getById(data.id))
    } else if(req.body.name == 'Автор'){
        let data = JSON.parse(req.body.data)
        await res.send(await AuthorArtworkSHKR.getById(data.id))
    } else if(req.body.name == 'Галлерея'){
        let data = JSON.parse(req.body.data)
        await res.send(await ArtworkSHKR.getClient(data.search, data.sort, data.skip, data.genre))
    } else if(req.body.name == 'ДругиеГаллерея'){
        let data = JSON.parse(req.body.data)
        await res.send(await ArtworkSHKR.getRandom(data.search, data.sort))
    } else if(req.body.name == 'Жанры'){
        let data = JSON.parse(req.body.data)
        await res.send(await GenreArtworkSHKR.getClient(data.search))
    } else if(req.body.name == 'Товар'){
        let data = JSON.parse(req.body.data)
        await res.send(await ItemSHKR.getClient(data.skip))
    } else if(req.body.name == 'ТоварID'){
        let data = JSON.parse(req.body.data)
        await res.send(await ItemSHKR.getById(data.id))
    }
});

router.post('/get', async (req, res) => {
  await passportEngine.verifydeuser(req, res, async ()=>{
      if(req.body.name == 'О СХКР'){
          await res.send(await AboutSHKR.getAboutSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Виртуальный музей'){
          await res.send(await JournalSHKR.getJournalSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Тип произведения'){
          await res.send(await GenreArtworkSHKR.getGenreArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Автор произведения'){
          await res.send(await AuthorArtworkSHKR.getAuthorArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Событие'){
          await res.send(await EventSHKR.getEventSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Товары'){
          await res.send(await ItemSHKR.getItemSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Произведение'){
          await res.send(await ArtworkSHKR.getArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'СХКР'){
          await res.send(await NameSHKR.getNameSHKR(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Журналы'){
          await res.send(await JournalSHKR.getJournalSHKR(req.body.search, req.body.sort, req.body.skip))
      }
  });
});

router.post('/delete', async (req, res) => {
    await passportEngine.verifydeuser(req, res, async ()=>{
        if(req.body.oldFile!=undefined) {
            let photos = req.body.oldFile.split('\n');
            for(let i=0; i<photos.length; i++){
                if(photos[i].length>0){
                    fs.unlink(photos[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                    fs.unlink(photos[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                }
            }
        }
        if(req.body.name == 'О СХКР'){
            await AboutSHKR.deleteAboutSHKR(JSON.parse(req.body.deleted))
            await res.send(await AboutSHKR.getAboutSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Журналы'){
            await JournalSHKR.deleteJournalSHKR(JSON.parse(req.body.deleted))
            await res.send(await JournalSHKR.getJournalSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Тип произведения'){
            await GenreArtworkSHKR.deleteGenreArtworkSHKR(JSON.parse(req.body.deleted))
            await res.send(await GenreArtworkSHKR.getGenreArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Автор произведения'){
            await AuthorArtworkSHKR.deleteAuthorArtworkSHKR(JSON.parse(req.body.deleted))
            await res.send(await AuthorArtworkSHKR.getAuthorArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Событие'){
            await EventSHKR.deleteEventSHKR(JSON.parse(req.body.deleted))
            await res.send(await EventSHKR.getEventSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Товары'){
            await ItemSHKR.deleteItemSHKR(JSON.parse(req.body.deleted))
            await res.send(await ItemSHKR.getItemSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Произведение'){
            await ArtworkSHKR.deleteArtworkSHKR(JSON.parse(req.body.deleted))
            await res.send(await ArtworkSHKR.getArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'СХКР'){
            await NameSHKR.deleteNameSHKR(JSON.parse(req.body.deleted))
            await res.send(await NameSHKR.getNameSHKR(req.body.search, req.body.sort, req.body.skip))
        }
    });
});

router.post('/add', async (req, res) => {
    await passportEngine.verifydeuser(req, res, async ()=>{
        let data, myNew = JSON.parse(req.body.new), photos = [], whatermark = [], photosThumbnail = [], whatermarkThumbnail = []
        if(req.body.oldFile!=undefined) {
            if(req.body.name == 'Произведение'){
                whatermark = req.body.oldFileWhatermark.split('\n');
                for(let i = 0; i< whatermark.length; i++){
                    whatermarkThumbnail.push(whatermark[i].replace('images', 'thumbnail'))
                }
            }
            photos = req.body.oldFile.split('\n');
            for(let i = 0; i< photos.length; i++){
                photosThumbnail.push(photos[i].replace('images', 'thumbnail'))
            }
        }
        if(req.body.fileLength>0) {
            for(let i=0; i<photos.length; i++){
                if(photos[i].length>0){
                    fs.unlink(photos[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                    fs.unlink(photosThumbnail[i].replace(myConst.url + 'thumbnail/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                    if(req.body.name == 'Произведение'){
                        fs.unlink(whatermark[i].replace(myConst.url + 'images/', path.join(app.dirname, 'public', 'images')+'\\'), ()=>{console.log('successfully deleted');})
                        fs.unlink(whatermarkThumbnail[i].replace(myConst.url + 'thumbnail/', path.join(app.dirname, 'public', 'thumbnail')+'\\'), ()=>{console.log('successfully deleted');})
                    }
                }
            }
            photos = []
            photosThumbnail = []
            whatermark = []
            whatermarkThumbnail = []
            for (let i = 0; i < parseInt(req.body.fileLength); i++) {
                let filename = randomstring.generate(7) + req.body['fileName' + i];
                let filepath = path.join(app.dirname, 'public', 'images', filename);
                let filepathThumbnail = path.join(app.dirname, 'public', 'thumbnail', filename);
                let fstream = fs.createWriteStream(filepath);
                let stream = await req.body['file' + i].pipe(fstream);
                photos.push(myConst.url + 'images/' + filename)
                photosThumbnail.push(myConst.url + 'thumbnail/' + filename)
                let filepathWhatermark = '';
                let filepathWhatermarkThumbnail = '';
                if(req.body.name == 'Произведение') {
                    let filenameWhatermark = randomstring.generate(7) + req.body['fileName' + i];
                    filepathWhatermark = path.join(app.dirname, 'public', 'images', filenameWhatermark);
                    filepathWhatermarkThumbnail = path.join(app.dirname, 'public', 'thumbnail', filenameWhatermark);
                    whatermark.push(myConst.url + 'images/' + filenameWhatermark)
                    whatermarkThumbnail.push(myConst.url + 'thumbnail/' + filenameWhatermark)
                }
                stream.on('finish', async () => {
                    if(req.body.name != 'Журналы') {
                        let image = await Jimp.read(filepath)
                        if(image.bitmap.width>1500||image.bitmap.height>1500) {
                            await image.resize(1500, Jimp.AUTO);
                            await image.write(filepath);
                        }
                        image = await Jimp.read(filepath)
                        await image.resize(320, Jimp.AUTO);
                        await image.write(filepathThumbnail);
                        if(req.body.name == 'Произведение') {
                            let font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
                            image = await Jimp.read(filepath)
                            await image.print(font, 10, 10, '')
                            await image.write(filepathWhatermark);
                            image = await Jimp.read(filepath)
                            await image.print(font, 10, 10, '')
                            await image.resize(320, Jimp.AUTO)
                            await image.write(filepathWhatermarkThumbnail);
                        }
                    }
                    if(i===parseInt(req.body.fileLength)-1)
                    {
                        if(req.body.name == 'О СХКР'){
                            data = {
                                photos: photos,
                                photos_thumbnail: photosThumbnail,
                                biography_ru: myNew.biography_ru,
                                biography_kg: myNew.biography_kg,
                                biography_eng: myNew.biography_eng
                            }
                            if(req.body.id==undefined)
                                await AboutSHKR.addAboutSHKR(data)
                            else
                                await AboutSHKR.setAboutSHKR(data, req.body.id)
                            await res.send(await AboutSHKR.getAboutSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'Событие'){
                            data = {
                                photos: photos,
                                photos_thumbnail: photosThumbnail,
                                dateStart: new Date(myNew.dateStart),
                                dateEnd: new Date(myNew.dateEnd),
                                type_ru: myNew.type_ru,
                                name_ru: myNew.name_ru,
                                type_eng: myNew.type_eng,
                                name_eng: myNew.name_eng,
                                type_kg: myNew.type_kg,
                                description_ru: myNew.description_ru,
                                description_eng: myNew.description_eng,
                                description_kg: myNew.description_kg,
                                name_kg: myNew.name_kg,
                            }
                            if(req.body.id==undefined)
                                await EventSHKR.addEventSHKR(data)
                            else
                                await EventSHKR.setEventSHKR(data, req.body.id)
                            await res.send(await EventSHKR.getEventSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'СХКР'){
                            data = {
                                photo: photos,
                                photo_thumbnail: photosThumbnail,
                                name_ru: myNew.name_ru,
                                name_kg: myNew.name_kg,
                                name_eng: myNew.name_eng,
                                adress: myNew.adress,
                                phonenumber: myNew.phonenumber,
                                email: myNew.email,
                                url: myNew.url
                            }
                            if(req.body.id==undefined)
                                await NameSHKR.addNameSHKR(data)
                            else
                                await NameSHKR.setNameSHKR(data, req.body.id)
                            await res.send(await NameSHKR.getNameSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'Журналы'){
                            data = {
                                photos: photos,
                                name: myNew.name,
                            }
                            if(req.body.id==undefined)
                                await JournalSHKR.addJournalSHKR(data)
                            else
                                await JournalSHKR.setJournalSHKR(data, req.body.id)
                            await res.send(await JournalSHKR.getJournalSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'Тип произведения'){
                            data = {
                                photo: photos,
                                photo_thumbnail: photosThumbnail,
                                name_ru: myNew.name_ru,
                                description_ru: myNew.description_ru,
                                name_kg: myNew.name_kg,
                                description_kg: myNew.description_kg,
                                name_eng: myNew.name_eng,
                                description_eng: myNew.description_eng,
                            }
                            if(req.body.id==undefined)
                                await GenreArtworkSHKR.addGenreArtworkSHKR(data)
                            else
                                await GenreArtworkSHKR.setGenreArtworkSHKR(data, req.body.id)
                            await res.send(await GenreArtworkSHKR.getGenreArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'Произведение'){
                            if(myNew.author=='')
                                myNew.author=null
                            if(myNew.genre=='')
                                myNew.genre=null
                            data = {
                                views: 0,
                                image_whatermark: whatermark,
                                image: photos,
                                image_thumbnail: photosThumbnail,
                                image_whatermar_thumbnail: whatermarkThumbnail,
                                name_ru: myNew.name_ru,
                                name_kg: myNew.name_kg,
                                name_eng: myNew.name_eng,
                                styleOrMaterial_ru: myNew.styleOrMaterial_ru,
                                styleOrMaterial_kg: myNew.styleOrMaterial_kg,
                                styleOrMaterial_eng: myNew.styleOrMaterial_eng,
                                size: myNew.size,
                                date: myNew.date,
                                year: myNew.year,
                                author: myNew.author,
                                genre: myNew.genre,
                                genre1: myNew.genre1,
                                description_ru: myNew.description_ru,
                                description_eng: myNew.description_eng,
                                description_kg: myNew.description_kg,
                            };
                            if(req.body.id==undefined)
                                await ArtworkSHKR.addArtworkSHKR(data)
                            else
                                await ArtworkSHKR.setArtworkSHKR(data, req.body.id)
                            await res.send(await ArtworkSHKR.getArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'Товары'){
                            data = {
                                image: photos,
                                image_thumbnail: photosThumbnail,
                                description: myNew.description,
                                name: myNew.name,
                                styleOrMaterial: myNew.styleOrMaterial,
                                date: myNew.date,
                                price: myNew.price,
                                author: myNew.author
                            };
                            if(req.body.id==undefined)
                                await ItemSHKR.addItemSHKR(data)
                            else
                                await ItemSHKR.setItemSHKR(data, req.body.id)
                            await res.send(await ItemSHKR.getItemSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                        else if(req.body.name == 'Автор произведения'){
                            data = {
                                yearsOfLife: myNew.yearsOfLife,
                                name: myNew.name,
                                biography_ru: myNew.biography_ru,
                                biography_kg: myNew.biography_kg,
                                photos: photos,
                                photos_thumbnail: photosThumbnail,
                                biography_eng: myNew.biography_eng
                            }
                            console.log(data)
                            if(req.body.id==undefined)
                                await AuthorArtworkSHKR.addAuthorArtworkSHKR(data)
                            else
                                await AuthorArtworkSHKR.setAuthorArtworkSHKR(data, req.body.id)
                            await res.send(await AuthorArtworkSHKR.getAuthorArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
                        }
                    }
                })
            }
        }
        else {
            if(req.body.name == 'О СХКР'){
                data = {
                    photos: photos,
                    photos_thumbnail: photosThumbnail,
                    biography_ru: myNew.biography_ru,
                    biography_kg: myNew.biography_kg,
                    biography_eng: myNew.biography_eng
                }
                if(req.body.id==undefined)
                    await AboutSHKR.addAboutSHKR(data)
                else
                    await AboutSHKR.setAboutSHKR(data, req.body.id)
                await res.send(await AboutSHKR.getAboutSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'Событие'){
                data = {
                    photos: photos,
                    photos_thumbnail: photosThumbnail,
                    dateStart: new Date(myNew.dateStart),
                    dateEnd: new Date(myNew.dateEnd),
                    type_ru: myNew.type_ru,
                    name_ru: myNew.name_ru,
                    type_eng: myNew.type_eng,
                    name_eng: myNew.name_eng,
                    type_kg: myNew.type_kg,
                    description_ru: myNew.description_ru,
                    description_eng: myNew.description_eng,
                    description_kg: myNew.description_kg,
                    name_kg: myNew.name_kg,
                }
                if(req.body.id==undefined)
                    await EventSHKR.addEventSHKR(data)
                else
                    await EventSHKR.setEventSHKR(data, req.body.id)
                await res.send(await EventSHKR.getEventSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'СХКР'){
                data = {
                    photo: photos,
                    photo_thumbnail: photosThumbnail,
                    name_ru: myNew.name_ru,
                    name_kg: myNew.name_kg,
                    name_eng: myNew.name_eng,
                    adress: myNew.adress,
                    phonenumber: myNew.phonenumber,
                    email: myNew.email,
                    url: myNew.url
                }
                if(req.body.id==undefined)
                    await NameSHKR.addNameSHKR(data)
                else
                    await NameSHKR.setNameSHKR(data, req.body.id)
                await res.send(await NameSHKR.getNameSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'Журналы'){
                data = {
                    photos: photos,
                    name: myNew.name,
                }
                if(req.body.id==undefined)
                    await JournalSHKR.addJournalSHKR(data)
                else
                    await JournalSHKR.setJournalSHKR(data, req.body.id)
                await res.send(await JournalSHKR.getJournalSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'Тип произведения'){
                data = {
                    photo: photos,
                    photo_thumbnail: photosThumbnail,
                    name_ru: myNew.name_ru,
                    description_ru: myNew.description_ru,
                    name_kg: myNew.name_kg,
                    description_kg: myNew.description_kg,
                    name_eng: myNew.name_eng,
                    description_eng: myNew.description_eng,
                }
                if(req.body.id==undefined)
                    await GenreArtworkSHKR.addGenreArtworkSHKR(data)
                else
                    await GenreArtworkSHKR.setGenreArtworkSHKR(data, req.body.id)
                await res.send(await GenreArtworkSHKR.getGenreArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'Произведение'){
                if(myNew.author=='')
                    myNew.author=null
                if(myNew.genre=='')
                    myNew.genre=null
                data = {
                    views: 0,
                    image_whatermark: whatermark,
                    image: photos,
                    image_thumbnail: photosThumbnail,
                    image_whatermar_thumbnail: whatermarkThumbnail,
                    name_ru: myNew.name_ru,
                    name_kg: myNew.name_kg,
                    name_eng: myNew.name_eng,
                    styleOrMaterial_ru: myNew.styleOrMaterial_ru,
                    styleOrMaterial_kg: myNew.styleOrMaterial_kg,
                    styleOrMaterial_eng: myNew.styleOrMaterial_eng,
                    size: myNew.size,
                    date: myNew.date,
                    year: myNew.year,
                    author: myNew.author,
                    genre: myNew.genre,
                    genre1: myNew.genre1,
                    description_ru: myNew.description_ru,
                    description_eng: myNew.description_eng,
                    description_kg: myNew.description_kg,
                };
                if(req.body.id==undefined)
                    await ArtworkSHKR.addArtworkSHKR(data)
                else
                    await ArtworkSHKR.setArtworkSHKR(data, req.body.id)
                await res.send(await ArtworkSHKR.getArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'Товары'){
                data = {
                    image: photos,
                    image_thumbnail: photosThumbnail,
                    description: myNew.description,
                    name: myNew.name,
                    styleOrMaterial: myNew.styleOrMaterial,
                    date: myNew.date,
                    price: myNew.price,
                    author: myNew.author
                };
                if(req.body.id==undefined)
                    await ItemSHKR.addItemSHKR(data)
                else
                    await ItemSHKR.setItemSHKR(data, req.body.id)
                await res.send(await ItemSHKR.getItemSHKR(req.body.search, req.body.sort, req.body.skip))
            }
            else if(req.body.name == 'Автор произведения'){
                data = {
                    yearsOfLife: myNew.yearsOfLife,
                    name: myNew.name,
                    biography_ru: myNew.biography_ru,
                    biography_kg: myNew.biography_kg,
                    photos: photos,
                    photos_thumbnail: photosThumbnail,
                    biography_eng: myNew.biography_eng
                }
                console.log(data)
                if(req.body.id==undefined)
                    await AuthorArtworkSHKR.addAuthorArtworkSHKR(data)
                else
                    await AuthorArtworkSHKR.setAuthorArtworkSHKR(data, req.body.id)
                await res.send(await AuthorArtworkSHKR.getAuthorArtworkSHKR(req.body.search, req.body.sort, req.body.skip))
            }

        }
    });
});

module.exports = router;
