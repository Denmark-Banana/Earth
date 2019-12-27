function downloadAPI (req, res) {
    var filePath = "C:/Users/user/git/earth/pdf/1/manual1-1.pdf"; 
    //properties파일을 만들어서 그 경로에 있는 폴더를 작성
    res.download(filePath);
    //next();    
}

function scanFolderAPI (req, res) {

    res.status(200).json(
        {
            "success" : true
        }
    )
    //next();    
}

module.exports = { downloadAPI, scanFolderAPI }