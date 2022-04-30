const AlphanumericEncoder = require('./index')

let encoder = new AlphanumericEncoder()

const numberToEncodedLetters = [
    [1, 'A'],
    [4, 'D'],
    [25, 'Y'],
    [26, 'Z'],
    [27, 'AA'],
    [52, 'AZ'],
    [53, 'BA'],
    [78, 'BZ'],
    [705, 'AAC'],
    [16384, 'XFD']
]

const numberWithDictionaryToEncodedLetters = [
    ['ABC', 4, 'AA'],
    ['123ABC', 4, 'A'],
    ['123ABC', 2, '2'],
    ['123ABC', 200, 'B32'],
    ['0123456789ABCDEF', 1, '0'],
    ['0123456789ABCDEF', 16, 'F'],
    ['0123456789ABCDEF', 17, '00'],
    ['0123456789ABCDEF', 272, 'FF'],
    ['EDCBA', 4, 'B'],
    ['EDCBA', 7, 'ED'],
    ['EDCBA', 26, 'AE'],
    ['EDCBA', 27, 'AD'],
    ['EDCBA', 31, 'EEE']
]

const expectedValidDictionaryValues = ['ABCD', 'ABcd', 'aBcD', 'ABC123']

const expectedInvalidDictionaryValuesWithRepeatingSymbols = ['ABCDA', 'ABCDa', 'ABCD1231']

const expectedInvalidDictionaryValuesWithImproperSymbols = ['ABC!', 'ABC@', 'ABC?', '&#$%(*)']

function setupNewEncoderForTesting() {
    beforeEach(() => {
        encoder = new AlphanumericEncoder()
    })

    afterEach(() => {
        encoder = null
    })
}

describe('Dictionary Validation', () => {
    setupNewEncoderForTesting()
    test('Default dictionary should be capital alphabet in order', () => {
        expect(encoder.dictionary).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    })

    test('Dictionary cannot be an empty string', () => {
        expect(() => {
            encoder.dictionary = ''
        }).toThrow(/empty string/)
    })

    test('Dictionary cannot be null', () => {
        expect(() => {
            encoder.dictionary = null
        }).toThrow(/null/)
    })

    test('Dictionary cannot be undefined', () => {
        expect(() => {
            encoder.dictionary = undefined
        }).toThrow(/undefined/)
    })

    describe('Valid Dictionaries', () => {
        setupNewEncoderForTesting()

        test.each(expectedValidDictionaryValues)(
            'Expect %p to be a valid dictionary',
            (validDictionaryString) => {
                encoder.dictionary = validDictionaryString
                expect(encoder.dictionary).toBe(validDictionaryString.toUpperCase())
            }
        )

        test('Dictionaries should be converted to uppercase', () => {
            encoder.dictionary = 'abcd'
            expect(encoder.dictionary).toBe('ABCD')
        })
    })

    describe('Invalid Dictionaries', () => {
        setupNewEncoderForTesting()

        test.each(expectedInvalidDictionaryValuesWithRepeatingSymbols)(
            'Expect %p to be a be invalid dictionary and throw error due to repeating symbol',
            (invalidDictionaryString) => {
                expect(() => {
                    encoder.dictionary = invalidDictionaryString
                }).toThrow(/repeating symbol/)
            }
        )

        test.each(expectedInvalidDictionaryValuesWithImproperSymbols)(
            'Expect %p to be a be invalid dictionary due to non-alphanumeric symbol',
            (invalidDictionaryString) => {
                expect(() => {
                    encoder.dictionary = invalidDictionaryString
                }).toThrow(/must be alphanumeric/)
            }
        )
    })
})

describe('Test Encoding', () => {
    setupNewEncoderForTesting()

    test('Expect 0 to return undefined', () => {
        expect(encoder.encode(0)).toBeUndefined()
    })

    test('Expect negative numbers to return undefined', () => {
        expect(encoder.encode(-1)).toBeUndefined()
    })

    test('Expect encoding numbers greater than Number.MAX_SAFE_INTEGER throws an error', () => {
        expect(() => {
            encoder.encode(Number.MAX_SAFE_INTEGER + 1)
        }).toThrow(/maximum safe integer/)
    })

    test('Expect non-integers to return value of floor: e.g. 1.5 = "B", 3.1 = "C", 4.9 = "D"', () => {
        expect(encoder.encode(2.5)).toBe('B')
        expect(encoder.encode(3.1)).toBe('C')
        expect(encoder.encode(4.9)).toBe('D')
    })

    describe('Encode with Default Dictionary', () => {
        test.each(numberToEncodedLetters)(
            'Under default dictionary, expect %p to encode to %p',
            (number, letter) => {
                expect(encoder.encode(number)).toBe(letter)
            }
        )
    })

    describe('Encode with Custom Dictionary', () => {
        test.each(numberWithDictionaryToEncodedLetters)(
            'Under dictionary %p, expect %p to encode to %p',
            (dictionary, number, letter) => {
                encoder.dictionary = dictionary
                expect(encoder.encode(number)).toBe(letter)
            }
        )
    })
})

describe('Test Decoding', () => {
    setupNewEncoderForTesting()

    test.each(['', undefined, null])('Trying to decode %p should return "undefined"', (letter) => {
        expect(encoder.decode(letter)).toBeUndefined()
    })

    test('Expect decoding strings to integers greater than Number.MAX_SAFE_INTEGER throws an error', () => {
        expect(() => {
            encoder.decode('BKTXHSOGHKKF')
        }).toThrow(/maximum safe integer/)
    })

    describe('Invalid Decode Values Using Default Dictionary', () => {
        const encodedWithNonexistentCharacter = [0, 2, -15, -1.7, 22.6, '16', 'D1', 'A#', '&']
        test.each(encodedWithNonexistentCharacter)(
            'Under default dictionary, trying to decode %p will return "undefined" due to character not existing in dictionary',
            (letter) => {
                expect(encoder.decode(letter)).toBeUndefined()
            }
        )
    })

    describe('Decode with Default Dictionary', () => {
        test.each(numberToEncodedLetters)(
            'Under default dictionary, expect %p to be decoded from %p',
            (number, letter) => {
                expect(encoder.decode(letter)).toBe(number)
            }
        )
    })

    describe('Decode with Custom Dictionary', () => {
        test.each(numberWithDictionaryToEncodedLetters)(
            'Under dictionary %p, expect %p to be decoded from %p',
            (dictionary, number, letter) => {
                encoder.dictionary = dictionary
                expect(encoder.decode(letter)).toBe(number)
            }
        )
    })
})
