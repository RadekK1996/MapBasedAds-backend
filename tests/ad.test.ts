import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";


afterAll(async () => {
    await pool.end();
});

const defaultObj = {
    id: '1235',
    name: 'Testowy',
    description: 'lorem ipsum lorem ipsum',
    url: 'https://megakartoflisko.pl',
    price: 2,
    lat: 20,
    lon: 20
}

test('AdRecord.getOne returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('abc');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abc');
    expect(ad.description).toBe('Testowy');
});


test('AdRecord.getOne returns null from database for unexisting entry.', async () => {
    const ad = await AdRecord.getOne('---');

    expect(ad).toBeNull();
});

test('AdRecord.findAll returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries where searching for "a" ', async () => {
    const ads = await AdRecord.findAll('a');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecord.findAll returns empty array of found entries where searching for something that does not exist. ', async () => {
    const ads = await AdRecord.findAll('---------------------------');

    expect(ads).toEqual([]);

});

test('AdRecord.findAll returns smaller amount of data.', async () => {
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();

});

test('AdRecord.insert returns new UUID..', async () => {
    const {id, ...rest} = defaultObj;
    const ad = new AdRecord(rest);
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
});

test('AdRecord.insert inserts data to database.', async () => {
    const {id, ...rest} = defaultObj;
    const ad = new AdRecord(rest);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
});




