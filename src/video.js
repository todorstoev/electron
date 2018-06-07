const constraints = {
    audio: false,
    video: {
        mandatory: {
            minWidth: 853,
            minHeight: 480,
            minWidth: 853,
            minHeight: 480
        }
    }
}

let video = {
    init: (nav, video) => {
        nav.getUserMedia = navigator.webkitGetUserMedia;
        nav.getUserMedia(constraints,
            stream => {
                video.src = window.URL.createObjectURL(stream)
            },
            error => {
                console.log(error)
            })
    },
    captureBytes: (videoEl, ctxd, canvasEl) => {
    
        ctxd.drawImage(videoEl, 0, 0);
        return canvasEl.toDataURL('image/png');
    }
}

module.exports = video;