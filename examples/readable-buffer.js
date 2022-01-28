import { Body, ignoreBodyUsed, asBuffer } from '../esnext/index.js';
import { createReadStream } from 'fs';

await (async () => {

  // cwd is top level of this project
  const initial = createReadStream("./package.json");

  const body = new Body(initial);

  ignoreBodyUsed(body);

  console.log('Getting buffers');
  const bufferA = await asBuffer(body);
  console.log({ bufferA });
  const bufferB = await asBuffer(body);
  console.log({ bufferB });
  console.log(bufferA === bufferB, Buffer.isBuffer(bufferA), Buffer.isBuffer(bufferB));

})()
  .then(() => console.log("Complete"))
  .catch((error) => console.error(error));

console.log('Finished');
