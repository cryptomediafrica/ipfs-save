// connect to Moralis server
const serverUrl = "https://0erlqbhytxjl.usemoralis.com:2053/server";
const appId = "KFNDGj1htqTiQygjIwWjHuSxt4QP6OXb2tQ19pT4";
Moralis.start({ serverUrl, appId });

login = async () => {
    await Moralis.Web3.authenticate()
.then(async function (user) {
   let _username = document.getElementById('username',username).value;
   let _password = document.getElementById('password' ,password).value;
     if(_username != '' || _password != ''){
        if(_username != ''){user.set("name", _username);}
        if(_password != ''){user.set("name", _password);}
        await user.save();
     }
     console.log("logged in user:", user);
     console.log(user.get("ethAddress"));
     window.location.href = "ipfssave.html";   
   })
}

async function listenToUpdates(){
   let query = new Moralis.Query("EthTransactions");
   let subscription = await query.subscribe();

   subscription.on("create",(object)=>{
     console.log("new transaction!!");
     console.log(object);
   });
}
   listenToUpdates();
document.getElementById("btn-login").onclick = login;



// upload an image
uploadImage = async () => {
    const data = fileInput.files[0]
    const file = new Moralis.File(data.name, data)
    await file.saveIPFS();
    console.log(file.ipfs(), file.hash());
    alert( "successfully uploaded")
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
    const file = new Moralis.File("file.json", {base64 : btoa(JSON.stringify(metadata))});
    await file.saveIPFS();

    console.log(file.ipfs());
}

save = async () => {
    const image = await uploadImage();
    await uploadMetadata(image)
}
async function fetchIPFSDoc(ipfsHash) {
    const url = `https://gateway.moralisipfs.com/ipfs/${ipfsHash}`;
    const response = await fetch(url);
    return await response.json();
}
