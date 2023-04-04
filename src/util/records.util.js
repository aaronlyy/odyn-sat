// functions to update, add & delete a records from a bind9 zonefile

import dotenv from 'dotenv';
dotenv.config();
import zonefile from 'dns-zonefile';
import fs from 'fs';


export const readZonefile = () => {
  const raw = fs.readFileSync(process.env.BIND_PATH, 'utf-8');
  return zonefile.parse(raw);
}

export const recordExists = (subdomain, json) => {
  if (!json['a']) {
    return false;
  }
  json['a'].map((record) => {
    if(record['name'] === subdomain) {
      return true;
    }
  })
}

export const updateRecord = async (subdomain, ip) => {
  // read & parse zonefile
  // check if records exists
  // update record
  // save file
}

export const addRecord = (subdomain, ip) => {
  // read zonefile
  // check if record already exists
  // create record
  // save file
}

export const deleteRecord = (subdomain) => {
  // read zonefile
  // check if record exists
  // delete record
  // save file
}