import multiparty from 'multiparty';

export default async function handle(req, res) {
  const form = new multiparty.Form();
  console.log("llega aqui 3?");
  
  form.parse(req, (err, fields, files) => {
    if (err) throw err;
    console.log("Lenght:", files.length);
    console.log("Fields:", fields);
    res.json('ok');
  });
}

export const config = {
  api: { bodyParser: false }
};
