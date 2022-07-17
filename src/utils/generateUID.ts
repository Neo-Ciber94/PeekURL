import { nanoid } from 'nanoid'

const ID_SIZE = 16;

export function generateUID(): string {
    return nanoid(ID_SIZE);
}