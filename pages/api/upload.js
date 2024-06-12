export default async function handle(req, res) {
  await mongooseConnect();
  await isAdminRequest(req, res);

  const form = new multiparty.Form();
  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    if (!files || !files.file || files.file.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
    });

    const links = [];
    for (const file of files.file) {
      const ext = file.originalFilename.split('.').pop();
      const newFilename = `${Date.now()}.${ext}`;
      const fileContent = fs.readFileSync(file.path);
      const mimeType = mime.lookup(file.path) || 'application/octet-stream';

      await client.send(new PutObjectCommand({
        Bucket: bucketName,
        Key: newFilename,
        Body: fileContent,
        ACL: 'public-read',
        ContentType: mimeType,
      }));

      const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
      links.push(link);
    }

    return res.status(200).json({ links });
  } catch (error) {
    console.error('Error uploading files:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

export const config = {
  api: { bodyParser: false },
};
