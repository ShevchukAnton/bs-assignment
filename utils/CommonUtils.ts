export async function sleep(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export let mediumTimeout = 10000;
export let shortTimeout = 5000;


/**
 * Generates a random whole number between the specified min and max values (inclusive).
 * @param min - The minimum value (inclusive).
 * @param max - The maximum value (inclusive).
 * @returns A random whole number between min and max (inclusive).
 */
export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomString(length: number = 10, includeSpecials = false): string {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let specialSymbols = '!@#$%^&*)(_+-`~';
    if (includeSpecials) {
        characters += specialSymbols
    }
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter++;
    }
    return result;
}
