<template>
    <div class="flex flex-col h-screen">
        <nav>
            test
        </nav>
        <main class="flex flex-col-reverse mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl h-full overflow-y-scroll no-scrollbar pb-4">
            <div class="flex flex-col gap-3">
                 <nuxt-icon name="achat-logo" class="text-[10rem] block mx-auto"/>
                <template v-for="message in messages" v-key="message">
                    <SystemMessage :message="message.content" v-if="message.type === 'system'"/>
                    <ErrorMessage :message="message.content" v-if="message.type === 'error'"/>
                    <RadioMessage :message="message.content" :author="message.author" v-if="message.type === 'radio'"/>
                    <Joined :user="message.user" v-if="message.type === 'join'"/>
                    <Message :nickname="message.author" :message="message.content" v-if="message.type === 'user'"/>
                </template>
                 
            </div>
        </main>
        <div class="bg-black/20 p-4 flex gap-2 relative items-center mx-auto z-10 w-full px-4 sm:px-6 lg:px-8 max-w-7xl h-24 mt-auto">
            <div class="absolute right-4 -top-[4.05rem] bg-black/20 p-4 text-2xl -z-10 rounded-t-lg">
                <audio ref="audio" autoplay controls loop class="hidden"></audio>
                <button type="button" @click="toggleSound">
                    <nuxt-icon :name="soundState ? 'pause' : 'sound-on'" />
                </button>
            </div>
            <button type="button" class="bg-black/20 text-2xl w-14 h-14 flex items-center justify-center rounded-full aspect-square">
                <nuxt-icon name="video" />
            </button>
            <button type="button" class="bg-black/20 text-2xl w-14 h-14 flex items-center justify-center rounded-full aspect-square">
                <nuxt-icon name="camera" />
            </button>
            <input type="text" placeholder="Wyślij wiadomość..." class="rounded-full indent-4 bg-black/20 h-full w-full"  v-on:keyup.enter="sendMessage"/>
        </div>
    </div>
</template>

<script setup lang="ts">
const { $io } = useNuxtApp()

$io.connect()


const messages = ref([{
    type: "system",
    content: "Witamy na serwerze! (room#3123)",
    author: "System"
}])
const sendMessage = (ev) => {
    $io.emit("message", {
        type: "user",
        author: randomAuthor,
        content: ev.target.value
    });
    ev.target.value = ""
}


$io.connect()

$io.on("message", (message) => {
    messages.value.push(message)
})

// Sound 
const soundState = ref(false)

const audio = ref(null)

$io.on("radio", ()=>{
    audio.value.src = "/api/song"
    toggleSound()
})
const toggleSound = () =>{
    if(!audio.value.src){ return false }
    soundState.value = !soundState.value
    if(soundState.value){
        audio.value.play()
    }else{
        console.log("PAUSE")
        audio.value.pause()
    }
}







// Nicknames
const nicknames = [
  "AlphaWolf",
  "CrazyCat",
  "SilverDragon",
  "LuckyStar",
  "RainbowDash",
  "CaptainMarvel",
  "ShadowHunter",
  "MysticNinja",
  "ElectricDreams",
  "SunnySmiles",
  "NightFury",
  "RubyRose",
  "PhantomSoul",
  "GoldenEagle",
  "WhisperingWind",
  "ScarletWitch",
  "MoonlightShadow",
  "EmeraldEnigma",
  "ThunderBolt",
  "SapphireSkies"
]
const randomAuthor = nicknames[Math.floor(Math.random() * nicknames.length)];

$io.emit("join", {
    username: randomAuthor
})

// import {v4 as uuid} from "uuid"
// const message = ref<string>("")

// const { $socket } = useNuxtApp()
// const uid = uuid()

// onMounted(()=>{
//     $socket.onopen = () => {
//         localStorage.setItem(`connection-${uid}`, uid)
//         $socket.send(uid)
//     }
//     $socket.onmessage = ({data}: any) => {
//         console.log("data:", data)
//         message.value = data
//     }
//     $socket.onclose = ()=>{
//         console.log("Disconnected")
//     }
// })

</script>

<style>
body{
    background: rgb(13,40,89);
    background: linear-gradient(45deg, rgba(13,40,89,1) 0%, rgba(3,16,40,1) 100%);
    color: #fff;
}
.nuxt-icon {
    margin-bottom: 0;
}
</style>