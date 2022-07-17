import * as path from 'path';
import * as fs from 'fs/promises';

const URL = "http://data.iana.org/TLD/tlds-alpha-by-domain.txt";
const OUTPUT = "data/tld.data.ts";
const VAR_NAME = "TLD_LIST";

async function main() {
    console.log("Loading data...");

    const res = await fetch(URL);
    const text = await res.text();
    const dir = path.dirname(OUTPUT);

    if (!(await directoryExists(dir))) {
        await fs.mkdir(dir);
    }

    const outputPath = path.join(process.cwd(), OUTPUT);
    const lines = text.split("\n").slice(1); // skip first line
    const data = lines
        .map(s => s.trim().toLowerCase())
        .filter(s => s.length > 0)
        .map(s => `\t"${s}"`)

    const code = `const ${VAR_NAME} = \n[\n${data.join(",\n")}\n] as const;\n\nexport default ${VAR_NAME};`

    await fs.writeFile(outputPath, code);
    console.log(`Written ${data.length} top-level-domains names to ${outputPath}`)
}

async function directoryExists(path: string): Promise<boolean> {
    try {
        return await fs.stat(path).then(d => d.isDirectory())
    } catch {
        return false;
    }
}

main().catch(console.error);