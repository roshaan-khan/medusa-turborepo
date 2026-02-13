const { Client } = require('pg');

const client = new Client({
    connectionString: "postgres://postgres:postgres123@127.0.0.1:5432/postgres-db",
});

async function run() {
    try {
        console.log("Connecting to PG...");
        await client.connect();
        console.log("Connected successfully!");
        const res = await client.query('SELECT 1');
        console.log("Query result:", res.rows);
        await client.end();
    } catch (err) {
        console.error("Connection failed:", err.message);
        process.exit(1);
    }
}

run();
