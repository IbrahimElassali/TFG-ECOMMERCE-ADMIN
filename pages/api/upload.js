import multiparty from 'multiparty';

export default async function handle(req, res) {
  const form = new multiparty.Form();
  console.log("llega aqui 3?");
  const {fields,files} = await new Promise((resolve,reject) =>{
    form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({fields, files});       
      });
  });
        console.log("Lenght:", files.file.length);
        console.log("Fields:", fields);
        return res.json('ok');
  
}

export const config = {
  api: { bodyParser: false }
};
