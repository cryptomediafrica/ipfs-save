// connect to Moralis server
const serverUrl = "https://0erlqbhytxjl.usemoralis.com:2053/server";
const appId = "KFNDGj1htqTiQygjIwWjHuSxt4QP6OXb2tQ19pT4";
Moralis.start({ serverUrl, appId });

// upload an image
uploadImage = async () => {
    const data = fileInput.files[0]
    const file = new Moralis.file(data.name, data)
    await file.saveIPFS();
    console.log(file.ipfs(), file.hash());
    return file.ipfs()
}
//upload metadata
uploadMetadata = async (imageURL) => {
    const name = document.getElementById('metadataName').Value;
    const description = document.getElementById('metadataDescription').value;

    const metadata = {
        "name": name,
        "description": description,
        "image": imageURL
    }
    const file = new Moralis.file("file.json", {base64 : btoa(JSON.stringify(metadata))});
    await file.saveIPFS();

    console.log(file.ipfs());
}

save = async () => {
    const image = await uploadImage();
    await uploadMetadata(image)
}
