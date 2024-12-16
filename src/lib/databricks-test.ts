import { DBSQLClient } from '@databricks/sql';
import IDBSQLSession from '@databricks/sql/dist/contracts/IDBSQLSession';
import IOperation from '@databricks/sql/dist/contracts/IOperation';

const serverHostname: string = process.env.DATABRICKS_SERVER_HOSTNAME || '';
const httpPath: string       = process.env.DATABRICKS_HTTP_PATH || '';
const token: string          = process.env.DATABRICKS_TOKEN || '';

if (serverHostname == '' || httpPath == '' || token == '') {
  throw new Error("Cannot find Server Hostname, HTTP Path, or personal access token. " +
                  "Check the environment variables DATABRICKS_SERVER_HOSTNAME, " +
                  "DATABRICKS_HTTP_PATH, and DATABRICKS_TOKEN.");
}

const client: DBSQLClient = new DBSQLClient();
const connectOptions = {
  host: serverHostname,
  path: httpPath,
  token: token
};

client.connect(connectOptions)
  .then(async client => {
    const session: IDBSQLSession = await client.openSession();

    const queryOperation: IOperation = await session.executeStatement(
      'SELECT * FROM samples.nyctaxi.trips LIMIT 2',
      {
        runAsync: true,
        maxRows: 10000 // This option enables the direct results feature.
      }
    );

    const result = await queryOperation.fetchAll();

    await queryOperation.close();

    console.table(result);

    await session.close();
    client.close();
  })
  .catch((error) => {
    console.error(error);
});
