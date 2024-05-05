// import { SequelizeInstance } from '../utility/DbHelper.js';

// export async function writeLog(data) {
//   const { query, body, agent, method, url, accessToken } = data;
//   const sqlQuery = `
//    INSERT INTO public.logging (agent, "method", url, query, body, accessToken)
//    VALUES (?, ?, ?, ?, ?, ?);
// `;
//   const result = await SequelizeInstance.query(sqlQuery, {
//     replacements: [agent, method, url, query, body, accessToken],
//     type: SequelizeInstance.QueryTypes.INSERT,
//   });
//   return result;
// }
