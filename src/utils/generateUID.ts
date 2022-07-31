import { nanoid } from "nanoid";

const MIN_ID_SIZE = 4;
const ID_SIZE = 10;

export function generateUID(size?: number): string {
  if (size && size < MIN_ID_SIZE) {
    throw new Error(
      `Id size must be greater than ${MIN_ID_SIZE} but was ${size}`
    );
  }

  return nanoid(size || ID_SIZE);
}
