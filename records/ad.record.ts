import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from 'uuid';

type AdRecordResults = [AdEntity[], FieldPacket[]];


export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewAdEntity) {
        const {name, description, id, url, lat, lon, price} = obj;

        if (!name || name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może byc pusta, ani przekraczać 100 znaków.');
        }
        if (description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.');
        }
        if (price < 0 || price > 999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niz 99999.');
        }
        if (!url || url.length > 100) {
            throw new ValidationError('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');
        }
        if (typeof lat !== "number" || typeof lon !== "number") {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.');
        }

        this.name = name;
        this.description = description;
        this.id = id;
        this.url = url;
        this.lat = lat;
        this.lon = lon;
        this.price = price;

    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {
                id, lat, lon
            } = result;
            return {
                id, lat, lon,
            };
        });

    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }

        await pool.execute(
            'INSERT INTO `ads`(`id`, `name`, `description`, `price`,`url`,`lat`,`lon`) VALUES(:id,:name,:description,:price,:url,:lat,:lon)',
            this,
        );
    }

}
