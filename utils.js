function replacespec(text){
    try{
        let urlspec = /url\(.*?\)/g;
        let texturlspec = /trl\([\s\S]*?\)/g;
        let imgspec = /img\(.*?\)/g;
        let boldspec = /bold\([\s\S]*?\)/g;
        let customoption = /custom\([\s\S]*?\)/g;
        let audiospec = /audio\(.*?\)/g;
        text = text.replace(/&/g, "&amp;");
        text = text.replace(/</g, "&lt;");
        text = text.replace(/>/g, "&gt;");
        text = text.replace(/"/g, "&quot;");

        try{
            let spec = text.match(audiospec);
            for(let i = 0; i<spec.length; i++){
                text = text.replace(spec[i], `<audio controls src="${spec[i].slice(6, -1)}"></audio>`)
            }
        } catch{}

        try{
            let spec = text.match(imgspec);
            for(let i = 0; i<spec.length; i++){
                text = text.replace(spec[i], `</br><img class="w-100 bordert" src=${spec[i].slice(4, -1)}></br>`);
            }
        } catch{}

        try{
            let spec = text.match(texturlspec);
            for(let i = 0; i<spec.length; i++){
                let args = (spec[i].slice(4, -1)).split(",")
                text = text.replace(spec[i], `<a href="${args[1]}" title="${args[1]}">${args[0]}</a>`)
            }
        } catch{}

        try{
            let spec = text.match(urlspec);
            for(let i = 0; i<spec.length; i++){
                text = text.replace(spec[i], `<a href="${spec[i].slice(4, -1)}" title="${spec[i].slice(4, -1)}">${spec[i].slice(4, -1).slice(0, 50)}...</a>`)
            }
        } catch{}

        try{
            let spec = text.match(boldspec);
            for(let i = 0; i<spec.length; i++){
                text = text.replace(spec[i], `<b>${spec[i].slice(5, -1)}</b>`)
            }
        } catch{}

        try{
            let spec = text.match(customoption);
            for(let i = 0; i<spec.length; i++){
                let args = (spec[i].slice(7, -1)).split(",")
                text = text.replace(spec[i], `<div class="row"><span><b>${args[0]}: </b>${args[1]}</span></div>`)
            }
        } catch{}
        text = text.replace(/;un;\r\n/g, "");
        text = text.replace(/\n/g, "<br>");
        return text;
    } catch{
        return false;
    }   
}

module.exports = {
    replacespec
}