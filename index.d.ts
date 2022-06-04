// @ts-check

// Manually generated from https://www.typescriptlang.org/play

declare class AlphanumericEncoder {
    constructor(configOptions?: {
        allowLowerCaseDictionary?: boolean | undefined
        dictionary?: string | undefined
    })
    private _defaultDictionary
    private _dictionaryInUse
    private _allowLowerCaseDictionary

    set allowLowerCaseDictionary(arg: boolean)
    get allowLowerCaseDictionary(): boolean

    set dictionary(arg: string)
    get dictionary(): string

    resetDefaultDictionary(): void

    encode(integerToEncode: number): string | undefined

    decode(stringToDecode: string): number | undefined

    deconstruct(stringToDeconstruct: string): (number | undefined)[] | undefined
}

export = AlphanumericEncoder
