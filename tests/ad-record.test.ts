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
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niz 99999.');

});

test('Validates invalid name', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        name: ''
    })).toThrow('Nazwa ogłoszenia nie może byc pusta, ani przekraczać 100 znaków.');
});

test('Validates invalid description', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        description: 'a'.repeat(1001)
    })).toThrow('Treść ogłoszenia nie może przekraczać 1000 znaków.');
});

test('Validates invalid url', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        url: 'a'.repeat(1001)
    })).toThrow('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');

    expect(() => new AdRecord({
        ...defaultObj,
        url: ''
    })).toThrow('Link ogłoszenia nie może być pusty, ani przekraczać 100 znaków.');
});

test('Validates invalid lat/lon', () => {
    expect(() => new AdRecord({ ...defaultObj, lat: 'a' as any , lon: 9 })).toThrow(
        'Nie można zlokalizować ogłoszenia.',
    );
    expect(() => new AdRecord({ ...defaultObj, lat: 9, lon: 'a' as any  })).toThrow(
        'Nie można zlokalizować ogłoszenia.',
    );
});

