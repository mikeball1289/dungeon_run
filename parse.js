let png = require("png-js");
let image = png.load(process.argv[2]);
image.decode( (data) => {
    let pixels = [];
    for (let i = 0; i < data.length; i += 4) {
        pixels.push((data[i] << 16) + (data[i + 1] << 8) + data[i + 2]);
    }

    let corners = [];
    for (let i = 0; i < pixels.length; i ++) {
        if (pixels[i] === 0x000000 && pixels[i - 1] === 0xFF0000 && pixels[i - image.width] === 0xFF0000) {
            corners.push( {
                x: i % image.width,
                y: Math.floor(i / image.width),
            } );
        }
    }

    let roomTemplates = corners.map( (c) => {
        let room = [[]];
        let tx = c.x;
        let ty = c.y;
        while (true) {
            if (pixels[ty * image.width + tx] === 0x000000) room[room.length - 1].push(1);
            else if (pixels[ty * image.width + tx] === 0xFFFFFF) room[room.length - 1].push(0);
            
            if (pixels[ty * image.width + tx] === 0xFF0000) {
                ty ++;
                tx = c.x;
                if (pixels[ty * image.width + tx] === 0xFF0000) break;
                room.push([]);
            } else {
                tx ++;
            }
        }
        return room;
    } );

    console.log(JSON.stringify(roomTemplates));
} );