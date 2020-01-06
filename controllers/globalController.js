function home (req, res) { res.render('index', { title: 'Express' }) };

function testAPI (req, res) {
    res.status(200).json(
        {
            "message" : "test!"
        }
    )
}

function postTestAPI (req, res) {
    const user_message = req.body.message;
    res.status(200).json(
        {
            "message": user_message
        }
    );
}

module.exports = {
    home: home,
    testAPI: testAPI,
    postTestAPI: postTestAPI,
}
