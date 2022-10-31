/**
 * 1. Render songs
 * 2. Scroll top
 * 3. Play / pause / seek
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click 
 */

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const player = $('.player')
const playlist = $('.playlist')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')


const app = {
    currentIndex: 0,
    songs: [
        {
            name: "Chúng ta của hiện tại",
            singer: "Sơn Tùng",
            path: "./video/video1.mp3",
            image: "./img/img1.jpg"
        },
        {
            name: "Nơi này có anh",
            singer: "Sơn Tùng",
            path: "./video/video2.mp3",
            image: "./img/img1.jpg"
        },
        {
            name: "Lạc trôi",
            singer: "Sơn Tùng",
            path: "./video/video1.mp3",
            image: "./img/img1.jpg"
        },
        {
            name: "Chắc ai đó sẽ về",
            singer: "Sơn Tùng",
            path: "./video/video1.mp3",
            image: "./img/img1.jpg"
        },
        {
            name: "Anh sai rồi",
            singer: "Sơn Tùng",
            path: "./video/video1.mp3",
            image: "./img/img1.jpg"
        },
        {
            name: "Remember me",
            singer: "Sơn Tùng",
            path: "./video/video1.mp3",
            image: "./img/img1.jpg"
        },

    ],
    render: function () {
        const htmls = this.songs.map(function (song, index) {
            return `<div class="song">
                        <div class="thumb"
                            style="background-image: url('${song.image}');">
                        </div>
                        <div class="body">
                            <h3 class="title">${song.name}</h3>
                            <p class="author">${song.singer}</p>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>    
                    </div>`
        })
        playlist.innerHTML = htmls.join('')
    },
    handleEvents: function () {
        const cdWidth = cd.offsetWidth

        // Xử lí phóng to  / thu nhỏ CD
        document.onscroll = function () {
            const scrollTop = document.documentElement.scrollTop || window.scrollY
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        // Xử lí khi click play
        playBtn.onclick = function () {
            audio.play()
            player.classList.add('playing')
        }
    },

    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}`
        audio.src = this.currentSong.path
    },



    start: function () {
        // định nghĩa các thuộc tính cho object
        this.defineProperties()

        // lắng nghe và xử lí các sự kiện (DOM events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()
    }
}

app.start()