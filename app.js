import zonefile from 'dns-zonefile';
import fs from 'fs'

const updateRecord = (subdomain, ip) => {
  const raw = fs.readFileSync('./bind/db.its-fulda.de', 'utf-8');
  const json = zonefile.parse(raw);
  if (!json['a']) {
  }
  json['a'].map((record, idx) => {
    if (record['name'] === subdomain) {
      json['a'][idx]['ip'] = ip
      return;
    }
  })
  const out = zonefile.generate(json);
  fs.writeFileSync('./bind/db.its-fulda.de', out);
}

updateRecord('mail02', '8.8.8.8')