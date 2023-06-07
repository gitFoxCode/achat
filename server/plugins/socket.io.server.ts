import { Server } from 'socket.io'
import DownloadAudio from 'node-youtube-audio'

export default defineNitroPlugin((nitroApp) => {
    const socketServer = new Server(3001, {
        serveClient: false,
        cors: {
            origin: '*'
        }
    })

    socketServer.on('connection', (socket) => {
        
        // socketServer.emit("message", {
        //     type: "join",
        //     user: "TE5T"
        // })

        socket.on("join", (data)=>{
            socketServer.emit("message", {
                type: "join",
                user: data.username
            })
        })

        socket.on("message", async (message)=>{

            if(message.content.startsWith('/')){
                const args = message.content.substring(1).split(/ +/)
                const command =  args.shift().toLowerCase()

                if(command === "radio"){
                    const streams = await getRadio(args.join(''))
                    if(!streams.error){
                        socketServer.emit("radio", streams)
                    
                        return socketServer.emit("message", {
                            type: "radio",
                            author: message.author,
                            content: `uruchomił muzykę z ${args}`
                        })
                    }else{
                        return socketServer.emit("message", {
                            type: "error",
                            author: message.author,
                            content: `Nie udało się uruchomić muzyki`
                        })
                    }
                }
            }

            socketServer.emit("message", {
                type: "user",
                author: message.author,
                content: message.content
            })
        })



    })
})

async function getRadio(URL){
    const response = {
        error: false
    }
    await new DownloadAudio(URL)
    .codec("libmp3lame")
    .outputDirectory("./server/data/audio")
    .fileExtension("mp3")
    .fileName("currentSong")
    .execute()
    .then((data)=>{
        // Ok
    })
    .catch((err)=>{
        response.error = true
    })
    return response
}
// async function getRadio(URL){
//     let audio_streams = {}
//     const response = await fetch("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent(URL))
//     console.log("https://images" + ~~(Math.random() * 33) + "-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=" + encodeURIComponent(URL))
//     console.log(response)
 
//     // .then(response => {
//     //     if (response.ok) {
//     //         console.log("response ok")
//     //         response.text().then(data => {
//     //             const regex = /(?:ytplayer\.config\s*=\s*|ytInitialPlayerResponse\s?=\s?)(.+?)(?:;var|;\(function|\)?;\s*if|;\s*if|;\s*ytplayer\.|;\s*<\/script)/gmsu
//     //             data = data.split('window.getPageData')[0]
//     //             data = data.replace('ytInitialPlayerResponse = null', '')
//     //             data = data.replace('ytInitialPlayerResponse=window.ytInitialPlayerResponse', '')
//     //             data = data.replace('ytplayer.config={args:{raw_player_response:ytInitialPlayerResponse}};', '')
//     //             var matches = regex.exec(data)
//     //             data = matches && matches.length > 1 ? JSON.parse(matches[1]) : false
//     //             if(!data){ return false }
//     //             var streams = []
//     //             var result = {}
//     //             if (data.streamingData) {
//     //                 if (data.streamingData.adaptiveFormats) {
//     //                     streams = streams.concat(data.streamingData.adaptiveFormats)
//     //                 }
//     //                 if (data.streamingData.formats) {
//     //                     streams = streams.concat(data.streamingData.formats);
//     //                 }
//     //             }else{
//     //                 return false
//     //             }

//     //             streams.forEach((stream,n)=>{
//     //                 const itag = stream.itag * 1
//     //                 let quality = ""
//     //                 switch (itag) {
//     //                     case 139:
//     //                         quality = "48kbps";
//     //                         break;
//     //                     case 140:
//     //                         quality = "128kbps";
//     //                         break;
//     //                     case 141:
//     //                         quality = "256kbps";
//     //                         break;
//     //                     case 249:
//     //                         quality = "webm_l";
//     //                         break;
//     //                     case 250:
//     //                         quality = "webm_m";
//     //                         break;
//     //                     case 251:
//     //                         quality = "webm_h";
//     //                         break;
//     //                 }
//     //                 if (quality) audio_streams[quality] = stream.url
//     //             })
//     //             return audio_streams

//     //         })
//     //     }
//     // })
// }