import { ResponseBuilder } from "../esnext/response-builder.js";
import { PartialResponse } from "../esnext/partial-response.js";
import { Response } from "../esnext/response.js";

const builder = new ResponseBuilder({
  replaceSubsequentFullResponses: true
});

builder
  .with(new PartialResponse(undefined, { headers: { 'Link': '<.acl>; rel="acl"' }}))
  .with(new PartialResponse(undefined, { headers: { 'Link': '<../>; rel="up"' }}))
  .with(new Response(Buffer.from("Hey! 1")))
  .with(new PartialResponse(undefined, { headers: { 'Link': '<./next>; rel="next"' } }))
  .with(new Response(Buffer.from("Hey! 2")))
  .build()
  .then(
    response => {
      response.headers.forEach((value, name) => console.log(`Header: ${name}: ${value}`));
      console.log('Body:', response.body.toString());
    }
  );

