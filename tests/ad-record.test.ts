import {AdRecord} from "../records/ad.record";

const defaultObj = {
    id: '123',
    name: 'Test name',
    description: 'lorem ipsum',
    url: 'https://megak.pl',
    price: 0,
    lat: 9,
    lon: 9
}

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.id).toBe('123');
    expect(ad.name).toBe('Test name');
    expect(ad.description).toBe('lorem ipsum');
    expect(ad.url).toBe('https://megak.pl');
    expect(ad.price).toBe(0);
    expect(ad.lat).toBe(9);
    expect(ad.lon).toBe(9);

});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        price: -3
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niz 99999.')


});
