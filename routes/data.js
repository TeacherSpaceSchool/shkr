const express = require('express');
const router = express.Router();
const passportEngine = require('../module/passport');
const AboutMuseum = require('../module/aboutMuseum');
const VirtualMuseum = require('../module/virtualMuseum');
const TicketMuseum = require('../module/ticketMuseum');
const ExcursionMuseum = require('../module/excursionMuseum');
const GenreArtworkMuseum = require('../module/genreArtworkMuseum');
const AuthorArtworkMuseum = require('../module/authorArtworkMuseum');
const EventMuseum = require('../module/eventMuseum');
const ArtworkMuseum = require('../module/artworkMuseum');
const NameMuseum = require('../module/nameMuseum');
const myConst = require('../module/const');
const ItemMuseum = require('../module/itemMuseum');
const randomstring = require('randomstring');
const app = require('../app');
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

router.post('/getIds', async (req, res) => {
    await passportEngine.verifydeuser(req, res, async ()=>{
        if(req.body.name == 'Произведение'){
            await res.send({GenreArtworkMuseum: await GenreArtworkMuseum.getIds(), AuthorArtworkMuseum: await AuthorArtworkMuseum.getIds()});
        }
    });
});

router.post('/getclient', async (req, res) => {
    if(req.body.name == 'Музей'){
        await res.send(await NameMuseum.getClient())
    } else if(req.body.name == 'ДругиеСобытия'){
        await res.send(await EventMuseum.getRandom())
    } else if(req.body.name == 'СтилиИлиМатериал'){
        await res.send(await ArtworkMuseum.getStyleOrMaterial())
    } else if(req.body.name == 'Авторы'){
        await res.send(await AuthorArtworkMuseum.getClient())
    } else if(req.body.name == 'О музее'){
        await res.send(await AboutMuseum.getClient())
    } else if(req.body.name == 'Виртуальный музей'){
        await res.send(await VirtualMuseum.getClient())
    } else if(req.body.name == 'Просмотр'){
        await res.send(await ArtworkMuseum.view(req.body.data))
    } else if(req.body.name == 'ТипыСобытия'){
        await res.send(await EventMuseum.getType())
    } else if(req.body.name == 'Товары'){
        let data = JSON.parse(req.body.data)
        await res.send(await ItemMuseum.getClient(data.skip))
    } else if(req.body.name == 'События'){
        let data = JSON.parse(req.body.data)
        await res.send(await EventMuseum.getClient(data.search, data.sort, data.skip))
    } else if(req.body.name == 'Событие'){
        let data = JSON.parse(req.body.data)
        await res.send(await EventMuseum.getById(data.id))
    } else if(req.body.name == 'Произведение'){
        let data = JSON.parse(req.body.data)
        await res.send(await ArtworkMuseum.getById(data.id))
    } else if(req.body.name == 'Автор'){
        let data = JSON.parse(req.body.data)
        await res.send(await AuthorArtworkMuseum.getById(data.id))
    } else if(req.body.name == 'Галлерея'){
        let data = JSON.parse(req.body.data)
        await res.send(await ArtworkMuseum.getClient(data.search, data.sort, data.skip, data.genre))
    } else if(req.body.name == 'ДругиеГаллерея'){
        let data = JSON.parse(req.body.data)
        await res.send(await ArtworkMuseum.getRandom(data.search, data.sort))
    } else if(req.body.name == 'Экскурсии'){
        await res.send(await ExcursionMuseum.getClient())
    } else if(req.body.name == 'Жанры'){
        let data = JSON.parse(req.body.data)
        await res.send(await GenreArtworkMuseum.getClient(data.search))
    } else if(req.body.name == 'Товар'){
        let data = JSON.parse(req.body.data)
        await res.send(await ItemMuseum.getClient(data.skip))
    } else if(req.body.name == 'ТоварID'){
        let data = JSON.parse(req.body.data)
        await res.send(await ItemMuseum.getById(data.id))
    }
});

router.post('/get', async (req, res) => {
  await passportEngine.verifydeuser(req, res, async ()=>{
      if(req.body.name == 'О музее'){
          await res.send(await AboutMuseum.getAboutMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Виртуальный музей'){
          await res.send(await VirtualMuseum.getVirtualMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Билеты'){
          await res.send(await TicketMuseum.getTicketMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Экскурсия'){
          await res.send(await ExcursionMuseum.getExcursionMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Тип произведения'){
          await res.send(await GenreArtworkMuseum.getGenreArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Автор произведения'){
          await res.send(await AuthorArtworkMuseum.getAuthorArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Событие'){
          await res.send(await EventMuseum.getEventMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Товары'){
          await res.send(await ItemMuseum.getItemMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Произведение'){
          await res.send(await ArtworkMuseum.getArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
      } else if(req.body.name == 'Музей'){
          await res.send(await NameMuseum.getNameMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
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
        if(req.body.name == 'О музее'){
            await AboutMuseum.deleteAboutMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await AboutMuseum.getAboutMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Виртуальный музей'){
            await VirtualMuseum.deleteVirtualMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await VirtualMuseum.getVirtualMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Билеты'){
            await TicketMuseum.deleteTicketMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await TicketMuseum.getTicketMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Экскурсия'){
            await ExcursionMuseum.deleteExcursionMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await ExcursionMuseum.getExcursionMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Тип произведения'){
            await GenreArtworkMuseum.deleteGenreArtworkMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await GenreArtworkMuseum.getGenreArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Автор произведения'){
            await AuthorArtworkMuseum.deleteAuthorArtworkMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await AuthorArtworkMuseum.getAuthorArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Событие'){
            await EventMuseum.deleteEventMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await EventMuseum.getEventMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Товары'){
            await ItemMuseum.deleteItemMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await ItemMuseum.getItemMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Произведение'){
            await ArtworkMuseum.deleteArtworkMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await ArtworkMuseum.getArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Музей'){
            await NameMuseum.deleteNameMuseumKNMII(JSON.parse(req.body.deleted))
            await res.send(await NameMuseum.getNameMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
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
                        await image.print(font, 10, 10, 'KNMII')
                        await image.write(filepathWhatermark);
                        image = await Jimp.read(filepath)
                        await image.print(font, 10, 10, 'KNMII')
                        await image.resize(320, Jimp.AUTO)
                        await image.write(filepathWhatermarkThumbnail);
                    }
                })
            }
        }
        if(req.body.name == 'О музее'){
                data = {
                    photos: photos,
                    photos_thumbnail: photosThumbnail,
                    biography_ru: myNew.biography_ru,
                    biography_kg: myNew.biography_kg,
                    biography_eng: myNew.biography_eng
                }
            if(req.body.id==undefined)
                await AboutMuseum.addAboutMuseumKNMII(data)
            else
                await AboutMuseum.setAboutMuseumKNMII(data, req.body.id)
            await res.send(await AboutMuseum.getAboutMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Событие'){
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
                await EventMuseum.addEventMuseumKNMII(data)
            else
                await EventMuseum.setEventMuseumKNMII(data, req.body.id)
            await res.send(await EventMuseum.getEventMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Билеты'){
            data = {
                genre_ru: myNew.genre_ru,
                type_ru: myNew.type_ru,
                genre_kg: myNew.genre_kg,
                type_kg: myNew.type_kg,
                genre_eng: myNew.genre_eng,
                type_eng: myNew.type_eng,
                price: myNew.price
            }
            if(req.body.id==undefined)
                await TicketMuseum.addTicketMuseumKNMII(data)
            else
                await TicketMuseum.setTicketMuseumKNMII(data, req.body.id)
            await res.send(await TicketMuseum.getTicketMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Музей'){
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
                await NameMuseum.addNameMuseumKNMII(data)
            else
                await NameMuseum.setNameMuseumKNMII(data, req.body.id)
            await res.send(await NameMuseum.getNameMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Виртуальный музей'){
            data = {
                photos: photos,
                photos_thumbnail: photosThumbnail,
                name_ru: myNew.name_ru,
                name_kg: myNew.name_kg,
                name_eng: myNew.name_eng,
            }
            if(req.body.id==undefined)
                await VirtualMuseum.addVirtualMuseumKNMII(data)
            else
                await VirtualMuseum.setVirtualMuseumKNMII(data, req.body.id)
            await res.send(await VirtualMuseum.getVirtualMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Тип произведения'){
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
                await GenreArtworkMuseum.addGenreArtworkMuseumKNMII(data)
            else
                await GenreArtworkMuseum.setGenreArtworkMuseumKNMII(data, req.body.id)
            await res.send(await GenreArtworkMuseum.getGenreArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Экскурсия'){
            data = {
                name_ru: myNew.name_ru,
                type_ru: myNew.type_ru,
                name_kg: myNew.name_kg,
                type_kg: myNew.type_kg,
                name_eng: myNew.name_eng,
                type_eng: myNew.type_eng,
            }
            if(req.body.id==undefined)
                await ExcursionMuseum.addExcursionMuseumKNMII(data)
            else
                await ExcursionMuseum.setExcursionMuseumKNMII(data, req.body.id)
            await res.send(await ExcursionMuseum.getExcursionMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Произведение'){
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
                author: myNew.author,
                genre: myNew.genre,
                genre1: myNew.genre1,
                description_ru: myNew.description_ru,
                description_eng: myNew.description_eng,
                description_kg: myNew.description_kg,
            };
            if(req.body.id==undefined)
                await ArtworkMuseum.addArtworkMuseumKNMII(data)
            else
                await ArtworkMuseum.setArtworkMuseumKNMII(data, req.body.id)
            await res.send(await ArtworkMuseum.getArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Товары'){
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
                await ItemMuseum.addItemMuseumKNMII(data)
            else
                await ItemMuseum.setItemMuseumKNMII(data, req.body.id)
            await res.send(await ItemMuseum.getItemMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        } else if(req.body.name == 'Автор произведения'){
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
                await AuthorArtworkMuseum.addAuthorArtworkMuseumKNMII(data)
            else
                await AuthorArtworkMuseum.setAuthorArtworkMuseumKNMII(data, req.body.id)
            await res.send(await AuthorArtworkMuseum.getAuthorArtworkMuseumKNMII(req.body.search, req.body.sort, req.body.skip))
        }
    });
});

module.exports = router;
