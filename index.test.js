// @ts-check

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

const numberWithLowerCaseDictionaryToEncodedLetters = [
    ['ABCDabcd', 4, 'D'],
    ['ABCDabcd', 6, 'b'],
    ['ABCDabcd', 9, 'AA'],
    ['ABCDabcd', 15, 'Ac'],
    ['ABCDabcd', 2984, 'abDd']
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

describe('Allow Lower Case Dictionaries', () => {
    setupNewEncoderForTesting()

    test('Default should not allow lower case dictionaries', () => {
        expect(encoder.allowLowerCaseDictionary).toBeFalsy()
    })

    test.each([true, 1, [123], { value: 1 }])(
        'allowLowerCaseDictionary with truthy value %p',
        (truthyTestValue) => {
            // @ts-ignore
            encoder.allowLowerCaseDictionary = truthyTestValue
            expect(encoder.allowLowerCaseDictionary).toBeTruthy()
        }
    )

    test.each([true, 1, [123], { value: 1 }])(
        'allowLowerCaseDictionary with truthy value in setup: new AlphanumericEncoder({ allowLowerCaseDictionary: %p })',
        (truthyTestValue) => {
            const setupEncoder = new AlphanumericEncoder({
                allowLowerCaseDictionary: truthyTestValue
            })
            expect(setupEncoder.allowLowerCaseDictionary).toBeTruthy()
        }
    )

    test.each([false, 0, null, undefined])(
        'allowLowerCaseDictionary with falsy value %p',
        (truthyTestValue) => {
            // @ts-ignore
            encoder.allowLowerCaseDictionary = truthyTestValue
            expect(encoder.allowLowerCaseDictionary).toBeFalsy()
        }
    )

    test.each([false, 0, null, undefined])(
        'allowLowerCaseDictionary with falsy value in setup: new AlphanumericEncoder({ allowLowerCaseDictionary: %p })',
        (truthyTestValue) => {
            const setupEncoder = new AlphanumericEncoder({
                allowLowerCaseDictionary: truthyTestValue
            })
            expect(setupEncoder.allowLowerCaseDictionary).toBeFalsy()
        }
    )

    test('Allow lower case dictionaries by using a config object', () => {
        encoder = new AlphanumericEncoder({ allowLowerCaseDictionary: true })
        expect(encoder.allowLowerCaseDictionary).toBeTruthy()
    })
})

describe('Dictionary Validation', () => {
    setupNewEncoderForTesting()
    test('Default dictionary should be capital alphabet in order', () => {
        expect(encoder.dictionary).toBe('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
    })

    test('Resetting the dictionary after changing it should be capital alphabet again', () => {
        encoder.dictionary = 'ABCD'
        encoder.resetDefaultDictionary()
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

    test.each([true, false])('Dictionary cannot be boolean %p', (input) => {
        expect(() => {
            // @ts-ignore
            encoder.dictionary = input
        }).toThrow(/boolean/)
    })

    test('Dictionary cannot be NaN', () => {
        expect(() => {
            // @ts-ignore
            encoder.dictionary = NaN
        }).toThrow(/NaN/)
    })

    test.each([true, false, null, undefined, '', NaN, { dictionary: 'ABC' }, ['ABC'], 'ABCDA'])(
        'Cannot pass bad dictionary arguments in constructor: new AlphanumericEncoder({dictionary: %p}',
        (dictionaryInput) => {
            expect(() => {
                // eslint-disable-next-line no-unused-vars
                const setupEncoder = new AlphanumericEncoder({
                    dictionary: dictionaryInput
                })
            }).toThrow()
        }
    )

    describe('Valid Dictionaries (no lower case)', () => {
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

        test('Allow setting dictionaries by using a config object', () => {
            encoder = new AlphanumericEncoder({ dictionary: 'abcd' })
            expect(encoder.dictionary).toBe('ABCD')
        })
    })

    describe('Valid Dictionaries (allow lower case)', () => {
        setupNewEncoderForTesting()

        test.each(expectedValidDictionaryValues)(
            'Expect %p to be a valid dictionary',
            (validDictionaryString) => {
                encoder.allowLowerCaseDictionary = true
                encoder.dictionary = validDictionaryString
                expect(encoder.dictionary).toBe(validDictionaryString)
            }
        )

        const complexDictionary = 'ABCD123abcd'
        test(`Expect ${complexDictionary} to be a valid dictionary`, () => {
            encoder.allowLowerCaseDictionary = true
            encoder.dictionary = complexDictionary
            expect(encoder.dictionary).toBe('ABCD123abcd')
        })

        test('Allow setting lower case dictionaries by using a config object', () => {
            encoder = new AlphanumericEncoder({
                allowLowerCaseDictionary: true,
                dictionary: 'abcd'
            })
            expect(encoder.dictionary).toBe('abcd')
        })

        test('Class should be configurable using externally defined object', () => {
            const configOptions = { allowLowerCaseDictionary: true, dictionary: 'abcd' }
            encoder = new AlphanumericEncoder(configOptions)
            expect(encoder.dictionary).toBe('abcd')
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

        test('Passing invalid dictionary in options should throw error', () => {
            expect(() => {
                encoder = new AlphanumericEncoder({ dictionary: 'ABC@#$' })
            }).toThrow(/must be alphanumeric/)
        })
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
                // @ts-ignore
                expect(encoder.encode(number)).toBe(letter)
            }
        )
    })

    describe('Encode with Custom Upper Case Dictionary', () => {
        test.each(numberWithDictionaryToEncodedLetters)(
            'Under dictionary %p, expect %p to encode to %p',
            (dictionary, number, letter) => {
                // @ts-ignore
                encoder.dictionary = dictionary
                // @ts-ignore
                expect(encoder.encode(number)).toBe(letter)
            }
        )
    })

    describe('Encode with Custom Lower Case Dictionary', () => {
        test.each(numberWithLowerCaseDictionaryToEncodedLetters)(
            'Under dictionary %p, expect %p to encode to %p',
            (dictionary, number, letter) => {
                encoder.allowLowerCaseDictionary = true
                // @ts-ignore
                encoder.dictionary = dictionary
                // @ts-ignore
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
                // @ts-ignore
                expect(encoder.decode(letter)).toBeUndefined()
            }
        )
    })

    describe('Decode with Default Dictionary', () => {
        test.each(numberToEncodedLetters)(
            'Under default dictionary, expect %p to be decoded from %p',
            (number, letter) => {
                // @ts-ignore
                expect(encoder.decode(letter)).toBe(number)
            }
        )
    })

    describe('Decode with Custom Upper Case Dictionary', () => {
        test.each(numberWithDictionaryToEncodedLetters)(
            'Under dictionary %p, expect %p to be decoded from %p',
            (dictionary, number, letter) => {
                // @ts-ignore
                encoder.dictionary = dictionary
                // @ts-ignore
                expect(encoder.decode(letter)).toBe(number)
            }
        )
    })

    describe('Decode with Custom Lower Case Dictionary', () => {
        test.each(numberWithLowerCaseDictionaryToEncodedLetters)(
            'Under dictionary %p, expect %p to be decoded from %p',
            (dictionary, number, letter) => {
                encoder.allowLowerCaseDictionary = true
                // @ts-ignore
                encoder.dictionary = dictionary
                // @ts-ignore
                expect(encoder.decode(letter)).toBe(number)
            }
        )
    })
})

describe('Test Deconstruction', () => {
    setupNewEncoderForTesting()

    test.each(['', undefined, null])(
        'Trying to deconstruct %p should return "undefined"',
        (badArgument) => {
            expect(encoder.deconstruct(badArgument)).toBeUndefined()
        }
    )

    test('Expect dictionaries containing numbers to throw an error', () => {
        expect(() => {
            encoder.dictionary = 'ABC123'
            encoder.deconstruct('C3')
        }).toThrow(/dictionary contains numbers/)
    })

    const deconstructionTestValues = [
        ['A', [1]],
        ['A1', [1, 1]],
        ['C7', [3, 7]],
        ['7C', [7, 3]],
        ['AE18', [31, 18]],
        ['18AE', [18, 31]],
        ['1', [1]],
        [1, [1]],
        [733, [733]],
        [[733], [733]],
        [['7C'], [7, 3]],
        ['7C82AA', [7, 3, 82, 27]],
        ['C3ABC123EFGH456', [3, 3, 731, 123, 92126, 456]],
        ['A1aB2B', [1, 1, undefined, 2, 2]],
        ['7AC!23A1%', [7, undefined, 23, 1, 1, undefined]],
        ['&', [undefined]]
    ]
    test.each(deconstructionTestValues)(
        'Under default dictionary, deconstructing %p should return array %p',
        // @ts-ignored
        (deconstructArgument, resultArray) => {
            // @ts-ignore
            expect(encoder.deconstruct(deconstructArgument)).toEqual(resultArray)
        }
    )
})
