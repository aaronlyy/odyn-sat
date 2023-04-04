import fs from 'fs';
import zonefile from 'dns-zonefile';
import dotenv from 'dotenv';
dotenv.config();
import { response } from "../util/response.js";

export const controllerRecordsPatch = (req, res) => {
  // get body
  const subdomain = req.body.subdomain;
  const ip = req.body.ip;
  if (!subdomain || !ip) {
    return res.status(422).json(response(false, 'Missing subdomain or ip in request body'));
  }

  // read file
  const raw = fs.readFileSync(process.env.BIND_PATH, 'utf-8');

  // parse file
  const json = zonefile.parse(raw);

  // check if subdomain exists
  if (!json['a']) {
    return res.status(422).json(response(false, 'Error readig A records'));
  }

  let found = false;

  json['a'].map((record, idx) => {
    if (record['name'] === subdomain) {
      json['a'][idx]['ip'] = ip;
      found = true;
    }
  });

  // if not found, create record
  if (!found) {
    json['a'].push({
      name: subdomain,
      ip
    })
  }

  // gen file
  const out = zonefile.generate(json);

  // save file
  fs.writeFileSync(process.env.BIND_PATH, out);

  // return
  return res.status(200).json(response(true, 'Record patched'));
}

export const controllerRecordsDelete = (req, res) => {
  // get body
  const subdomain = req.body.subdomain;
  if (!subdomain) {
    return res.status(422).json(response(false, 'Missing subdomain in request body'));
  }

  // read file
  const raw = fs.readFileSync(process.env.BIND_PATH, 'utf-8');

  // parse file
  const json = zonefile.parse(raw);

  // check if subdomain exists
  if (!json['a']) {
    return res.status(422).json(response(false, 'Error readig A records'));
  }

  let found = false;

  json['a'].map((record, idx) => {
    if (record['name'] === subdomain) {
      json['a'].splice(idx, 1);
      found = true;
    }
  });

  if (!found) {
    return res.status(404).json(response(false, 'Subdomain not found'))
  }

  // gen file
  const out = zonefile.generate(json);

  // save file
  fs.writeFileSync(process.env.BIND_PATH, out);
  
  // return
  return res.status(200).json(response(true, 'Record patched'));
}