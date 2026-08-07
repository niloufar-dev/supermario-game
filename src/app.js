const line=document.querySelector('.line')
const supermario=document.querySelector('.supermario')
const score=document.querySelector('.score')
const live=document.querySelector('.lives')
const over=document.querySelector('#game-over')
const win =document.getElementById('win')
const finalscore=document.querySelectorAll('.final-score')
const timer=document.querySelector('.timer')
const helpbox=document.getElementById('help-box')

const blocks=[]
const coin=[]
const coinbot=[]
let left
let bottom
let minspace=500
let maxspace=1000
let min=500
let max=1000
let flag=0
let scorenum=0
let livenum=3
let hit=false
let time=30 

let hitsound=new Audio('./audio/Mario-Jump-2.mp3')
hitsound.volume=0.5
let mariosound=new Audio('./audio/8.mp3')
mariosound.volume=0.3
let oversound=new Audio('./audio/Game Over sound effect.mp3')
let winsound=new Audio('./audio/Victory Sound Effects1.mp3')
winsound.volume=0.4
let coinsound=new Audio('./audio/coin-upaif-14631.mp3')
coinsound.volume=0.5 
let gameover=false



mariosound.currentTime = 0
mariosound.play()
function rand(min,max){
    let x = (Math.floor(Math.random() * (max - min))) + min
    return x
}

for(let i=0 ; i<10 ; i++){
    blocks.push(rand(minspace,maxspace))
        minspace += 1000
        maxspace += 1000

        //////////////
        let div=document.createElement('div')
        div.classList.add('block')
        div.style.left=blocks[i]+'px'
        div.style.height =rand(50, 200) + 'px'
        line.append(div)
        console.log(blocks);
        
}
for(let i =0 ; i <40 ; i++){
    let a=rand(min,max)
     
        min += 500
        max += 500


    let star = document.createElement('div')
    star.classList.add('coin')
    let coinleft=star.style.left=a+'px'
    let coinbottom=rand(30,150) 
    star.style.bottom=coinbottom +'px'
    coinbot.push(coinbottom)
    console.log(coinleft);
    coin.push({
        left:a,
        bottom:coinbottom
     })
    
     line.appendChild(star)
     console.log(coin);
     

    const s = document.querySelectorAll('.coin')
console.log(s);


console.log(coin.bottom);
}  


let leftside =setInterval(()=>{
    left=parseInt(getComputedStyle(supermario).left) + 120
    bottom=parseInt(getComputedStyle(supermario).bottom) +70
    console.log(left);

    blocks.forEach((item)=>{
        if(left >= item && left <= (item +100)){
            if(supermario.classList.contains('jump')== false && hit==false && gameover==false){

        livenum--
        live.textContent=livenum
        hitsound.play()

        hit=true

        let blink = setInterval(()=>{
        supermario.classList.toggle('hurt')

        },100)


    setTimeout(()=>{
        clearInterval(blink)
        supermario.classList.remove('hurt')
        hit=false
    },900)


    if(livenum <= 0 && gameover ==false){
        livenum=0
        live.textContent=livenum
        over.classList.remove('hidden')
        gameover=true
        mariosound.pause() 
        oversound.play()       
        finalscore[0].textContent=scorenum
        clearInterval(times)
        
        over.classList.add('flex')
        
        
        supermario.style.animationPlayState='paused'
        line.style.animationPlayState='paused'
        
    }
}
        }
    })

      const playerRect = supermario.getBoundingClientRect();

    document.querySelectorAll(".coin").forEach((coin) => {

        const coinx = coin.getBoundingClientRect();

        if (
            playerRect.left < coinx.right &&
            playerRect.right > coinx.left &&
            playerRect.top < coinx.bottom &&
            playerRect.bottom > coinx.top
        ) {
            coin.style.display = "none";
            scorenum+=5
            score.textContent=scorenum
            coinsound.play()

        }})

        /////////////////////////////////
        flag++
        if (flag >= 4000) clearInterval(leftside)
    
    
},10)

let times=setInterval(()=>{

    time--
    timer.textContent=time
    if(time<10){
        timer.textContent='0'+time
    }
    if(time<=0){
        win.classList.remove('hidden')
        win.classList.add('flex')
        mariosound.pause()
        winsound.play()
        finalscore[1].textContent=scorenum
        supermario.style.animationPlayState='paused'
        line.style.animationPlayState='paused'
        clearInterval(times)
        
        
    }
},1000)

window.addEventListener('keydown',(e)=>{
    let mykey=e.keyCode

    mariosound.play()
    if (mykey ==32) {
            e.preventDefault()
            supermario.classList.add('jump')
            setTimeout(() => {
                supermario.classList.remove('jump')
            },900);
        }
})
addEventListener('touchstart',()=>{
    mariosound.play()
        supermario.classList.add('jump')
            setTimeout(() => {
                supermario.classList.remove('jump')
            },900);
})
    


