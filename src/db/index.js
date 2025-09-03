import fs from 'fs/promises';


const DB_SRC = 'src/db/data.json';


async function insert(input) {
    const stored = await select();

    if (stored === null) {
        return null;
    }

    const data = JSON.stringify([...stored, input], null, 4);

    try {
        await fs.writeFile(DB_SRC, data, 'utf8');
        return input;
    }

    catch (error) {
        console.error(`[ERROR] Failed to update "data.json": ${error}`);
        return null;
    }
}

async function select() {
    try {
        const data = await fs.readFile(DB_SRC, 'utf8');

        return JSON.parse(data);
    }

    catch (error) {
        if (error.code === 'ENOENT') {
            console.error('[WARN] File "data.json" not found (empty value returned)');

            return [];
        }

        console.error(`[ERROR] Failed to read "data.json": ${error}`);
        return null;
    }
}


export {
    insert,
    select,
};
